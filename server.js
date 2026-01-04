require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const {google} = require('googleapis');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const RES_FILE = path.join(DATA_DIR, 'reservations.json');
const SUB_FILE = path.join(DATA_DIR, 'subscribers.json');
const CONTACT_EMAIL = 'roberbla349@gmail.com'; // Email de contacto para Google Calendar y respuestas

async function ensureDataFiles(){
  try{ await fs.mkdir(DATA_DIR,{recursive:true});
    await fs.stat(RES_FILE).catch(()=>fs.writeFile(RES_FILE,'[]'));
    await fs.stat(SUB_FILE).catch(()=>fs.writeFile(SUB_FILE,'[]'));
  }catch(e){ console.error('Error creando archivos data:',e); }
}

// Servir archivos estáticos (la web creada) desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// UTIL: leer/guardar json
async function readJSON(file){ try{ const txt = await fs.readFile(file,'utf8'); return JSON.parse(txt||'[]'); }catch(e){ return []; } }
async function writeJSON(file,data){ await fs.writeFile(file, JSON.stringify(data,null,2),'utf8'); }

// GOOGLE CALENDAR HELPER (service account)
async function getCalendarClient(){
  const keyFile = process.env.GCAL_SERVICE_ACCOUNT_FILE;
  const calendarId = process.env.GCAL_CALENDAR_ID;
  if(!keyFile || !calendarId) return null;
  try{
    const content = require(keyFile);
    const jwt = new google.auth.JWT(content.client_email, null, content.private_key, ['https://www.googleapis.com/auth/calendar']);
    await jwt.authorize();
    const calendar = google.calendar({version:'v3', auth: jwt});
    return {calendar, calendarId};
  }catch(e){ console.warn('No se pudo inicializar Google Calendar:', e.message); return null; }
}

// GET events (consulta calendario real si está configurado, si no devuelve reservas locales)
app.get('/api/calendar/events', async (req,res)=>{
  const {start, end} = req.query;
  const client = await getCalendarClient();
  if(client){
    try{
      const resp = await client.calendar.events.list({calendarId: client.calendarId, timeMin:start, timeMax:end, singleEvents:true, orderBy:'startTime'});
      return res.json({items: resp.data.items});
    }catch(e){ return res.status(500).json({error:'Error consultando Google Calendar', detail:e.message}); }
  }
  // fallback: read local reservations
  const all = await readJSON(RES_FILE);
  // map to calendar-like items
  const items = all.map(r=>({id:r.id, summary:r.service + ' - ' + r.name, start:{dateTime: r.date + 'T' + r.time}, end:{dateTime: new Date(new Date(`${r.date}T${r.time}`).getTime() + r.durationMinutes*60000).toISOString()}, description: r.comments}));
  res.json({items});
});

// POST create event (tries Google Calendar, else stores locally)
app.post('/api/calendar/create', async (req,res)=>{
  const {summary, description, start, end, meta} = req.body; // start/end ISO strings
  console.log('📅 Reserva recibida:', {summary, meta});
  const client = await getCalendarClient();
  if(client){
    try{
      const event = {summary, description, start:{dateTime:start}, end:{dateTime:end}};
      const resp = await client.calendar.events.insert({calendarId: client.calendarId, requestBody: event});
      // optionally send email via nodemailer
      try{ await sendConfirmationEmail(meta); }catch(err){ console.warn('❌ Email no enviado:', err.message); }
      return res.json({ok:true, event:resp.data});
    }catch(e){ console.error('❌ Error Google Calendar:', e); return res.status(500).json({error:'Error creando evento en Google Calendar', detail:e.message}); }
  }
  // fallback: store in local JSON file
  try{
    await ensureDataFiles();
    const list = await readJSON(RES_FILE);
    const id = Date.now().toString();
    const saved = {id, summary, description, start, end, meta};
    list.push(saved); await writeJSON(RES_FILE,list);
    console.log('✅ Reserva guardada localmente. Enviando emails...');
    try{ await sendConfirmationEmail(meta); }catch(err){ console.warn('❌ Email no enviado:', err.message); }
    res.json({ok:true, stored:true, item:saved});
  }catch(e){ res.status(500).json({error:'No se pudo guardar la reserva', detail:e.message}); }
});

// SUBSCRIPCIONES
app.post('/api/suscripciones', async (req,res)=>{
  const {email, name} = req.body; if(!email) return res.status(400).json({error:'Email requerido'});
  await ensureDataFiles();
  const list = await readJSON(SUB_FILE);
  list.push({id:Date.now().toString(), email, name, date: new Date().toISOString()});
  await writeJSON(SUB_FILE,list);
  res.json({ok:true});
});

// Enviar email simple con nodemailer si está configurado
async function sendConfirmationEmail(meta){
  if(!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn('⚠️ SMTP no configurado (falta SMTP_HOST o SMTP_USER)');
    return null;
  }
  
  const to = meta && meta.email;
  if(!to) {
    console.warn('⚠️ No hay email de cliente en meta:', meta);
    return null;
  }
  
  try{
    const transporter = nodemailer.createTransport({ 
      host: process.env.SMTP_HOST, 
      port: Number(process.env.SMTP_PORT||587), 
      secure:false, 
      auth:{user:process.env.SMTP_USER, pass:process.env.SMTP_PASS} 
    });
    
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
    const subject = `Reserva confirmada: ${meta && meta.service}`;
    const text = `Hola ${meta && meta.name},\n\nTu reserva ha sido confirmada.\n\nServicio: ${meta && meta.service}\nFecha: ${meta && meta.date} ${meta && meta.time}\nTeléfono: ${meta && meta.phone}\n\nGracias,\nEssència`;
    
    console.log('📧 Enviando email de confirmación a:', to);
    await transporter.sendMail({from,to,subject,text});
    console.log('✅ Email de confirmación enviado a:', to);
    
    // Enviar copia al correo de contacto de Essència
    try{
      console.log('📧 Enviando copia a:', CONTACT_EMAIL);
      await transporter.sendMail({
        from,
        to:CONTACT_EMAIL,
        subject:`Nueva Reserva: ${meta && meta.name} - ${meta && meta.service}`,
        text:`Nueva reserva recibida:\n\nCliente: ${meta && meta.name}\nEmail: ${meta && meta.email}\nTeléfono: ${meta && meta.phone}\nServicio: ${meta && meta.service}\nFecha: ${meta && meta.date} ${meta && meta.time}\nComentarios: ${meta && meta.comments || 'N/A'}`
      });
      console.log('✅ Copia enviada al email de gestión:', CONTACT_EMAIL);
    }catch(err){ console.warn('❌ Error enviando copia al email de gestión:', err.message); }
    
    return true;
  }catch(err){
    console.error('❌ Error enviando email:', err.message);
    throw err;
  }
}

// fallback: send index.html for any other route (SPA-friendly)
app.get('*', (req,res)=>{ res.sendFile(path.join(__dirname,'index.html')); });

ensureDataFiles().then(()=>{
  app.listen(PORT, ()=>console.log(`Server listening on http://localhost:${PORT}`));
});
