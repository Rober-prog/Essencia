// Código JS para UI, gestión de servicios, modal, galería y reservas.
// NOTAS DE INTEGRACIÓN: funciones para Google Calendar están preparadas como hooks
// (fetchCalendarEvents / createCalendarEvent). Reemplazar con llamadas servidoras
// que usen credenciales seguras (no desde frontend). Ver README.md

const SERVICES = [
  // POPULARES
  {id:'diseño-cejas-hilo',title:'Diseño de cejas con hilo',price:'9,00 €',duration:'15 min',category:'estetica',
   shortDesc:'Técnica ancestral para cejas perfectas',
   description:'Técnica ancestral de depilación con hilo que permite un diseño preciso y definido de las cejas. Ideal para pieles sensibles, no irrita y permite eliminar el vello más fino. Resultado natural y duradero.'},
  {id:'lavado-diseño-peinado',title:'Lavado Dermocapilar + Diseño de corte + Peinado',price:'55,00 €',duration:'1 h 30 min',category:'peluqueria',
   shortDesc:'Experiencia completa de cuidado capilar',
   description:'Servicio completo que incluye lavado con productos dermocapilares de alta calidad, diseño de corte personalizado según tu estilo y rostro, y peinado profesional. Incluye masaje craneal relajante.'},
  {id:'corte-caballero',title:'Corte caballero',price:'22,00 €',duration:'45 min',category:'barberia',
   shortDesc:'Corte clásico o moderno para hombre',
   description:'Corte de cabello para caballero adaptado a tus preferencias. Incluye lavado, corte con técnicas actuales, perfilado y peinado. Asesoramiento personalizado según la forma de tu rostro.'},
  {id:'color-oil-peinado',title:'Color óleo + peinado',price:'75,00 €',duration:'2 h',category:'peluqueria',
   shortDesc:'Coloración premium con aceites nutritivos',
   description:'Coloración con tecnología de aceites que nutre mientras colorea. Proporciona brillo intenso, cobertura perfecta de canas y un color vibrante y duradero. Incluye peinado profesional.'},
  // PELUQUERÍA (resto)
  {id:'coloracion-barros',title:'Coloración con Barros',price:'80,00 €',duration:'1 h 30 min',category:'peluqueria',
   shortDesc:'Color natural con arcillas terapéuticas',
   description:'Coloración natural utilizando barros terapéuticos que tiñen el cabello mientras lo nutren profundamente. Sin amoniaco, respeta la fibra capilar y aporta brillo y vitalidad.'},
  {id:'color-oleo',title:'Color Óleo',price:'55,00 €',duration:'1 h 30 min',category:'peluqueria',
   shortDesc:'Tinte con base de aceites naturales',
   description:'Coloración con base de aceites naturales que proporciona un color intenso y luminoso. Cobertura total de canas con un acabado suave y sedoso.'},
  {id:'difuminador-solar-barros',title:'Difuminador solar + Barros',price:'98,00 €',duration:'2 h 30 min',category:'peluqueria',
   shortDesc:'Efecto balayage natural con tratamiento',
   description:'Técnica de iluminación que simula el efecto del sol sobre el cabello, combinada con un tratamiento de barros nutritivos. Resultado natural y luminoso con cabello hidratado.'},
  {id:'alisado-organico-soft',title:'Alisado Orgánico (soft)',price:'150,00 €+',duration:'3 h',category:'peluqueria',
   shortDesc:'Alisado suave sin químicos agresivos',
   description:'Versión suave del alisado orgánico, ideal para reducir el volumen y el encrespamiento manteniendo algo de movimiento natural. Fórmula libre de formaldehído.'},
  {id:'coloracion-barros-corte-peinado',title:'Coloración con Barros + Corte + Secado',price:'135,00 €',duration:'2 h 30 min',category:'peluqueria',
   shortDesc:'Pack completo: color natural, corte y secado',
   description:'Servicio completo que incluye coloración con barros terapéuticos, diseño de corte personalizado y secado profesional. Ideal para una transformación total.'},
  {id:'lavado-dermocapilar-peinado',title:'Lavado dermocapilar + peinado',price:'25,00 €',duration:'40 min',category:'peluqueria',
   shortDesc:'Limpieza profunda con peinado elegante',
   description:'Lavado con productos dermocapilares que limpian en profundidad respetando el cuero cabelludo. Incluye masaje relajante y peinado según tus preferencias.'},
  {id:'coloracion-barros-corte',title:'Coloración con barros + diseño de corte',price:'110,00 €',duration:'2 h',category:'peluqueria',
   shortDesc:'Color natural más diseño personalizado',
   description:'Combinación perfecta de coloración con barros terapéuticos y diseño de corte a medida. Tu cabello quedará nutrido, con color vibrante y un corte que realce tus facciones.'},
  {id:'diagnostico-presupuesto',title:'Diagnóstico y presupuesto',price:'Gratis',duration:'15 min',category:'peluqueria',
   shortDesc:'Consulta personalizada sin compromiso',
   description:'Análisis completo del estado de tu cabello y cuero cabelludo. Te asesoramos sobre los tratamientos más adecuados y elaboramos un presupuesto personalizado sin ningún compromiso.'},
  {id:'corte-nina',title:'Corte de niña',price:'37,00 €',duration:'45 min',category:'peluqueria',
   shortDesc:'Corte adaptado para las más pequeñas',
   description:'Corte de cabello especialmente diseñado para niñas. Ambiente agradable y profesionales con experiencia en el trato infantil. Incluye lavado y peinado.'},
  {id:'coloracion-barros-secado',title:'Coloración con Barros + Secado',price:'105,00 €',duration:'2 h',category:'peluqueria',
   shortDesc:'Color nutritivo con acabado profesional',
   description:'Coloración con barros terapéuticos seguida de secado profesional. El cabello queda con color vibrante, nutrido y con un acabado impecable.'},
  {id:'mechas-iluminaciones',title:'Mechas e iluminaciones',price:'120,00 €+',duration:'3 h 30 min',category:'peluqueria',
   shortDesc:'Reflejos y dimensión para tu cabello',
   description:'Técnicas de mechas e iluminaciones personalizadas para añadir luz y dimensión a tu cabello. Desde mechas sutiles hasta looks más atrevidos. Precio variable según longitud y cantidad.'},
  {id:'difuminador-solar',title:'Difuminador solar',price:'95,00 €',duration:'2 h',category:'peluqueria',
   shortDesc:'Efecto natural de reflejos solares',
   description:'Técnica de coloración que imita el efecto natural del sol sobre el cabello. Crea reflejos sutiles y luminosos que aportan profundidad y naturalidad.'},
  {id:'curly-edition',title:'Curly edition',price:'65,00 €',duration:'1 h 30 min',category:'peluqueria',
   shortDesc:'Especialistas en cabello rizado',
   description:'Servicio especializado para cabello rizado. Incluye lavado con productos específicos, corte adaptado a tus rizos y técnicas de definición para potenciar tu textura natural.'},
  {id:'alisado-organico',title:'Alisado orgánico',price:'230,00 €+',duration:'3 h',category:'peluqueria',
   shortDesc:'Liso perfecto con tratamiento nutritivo',
   description:'Tratamiento aminoproteico que consigue un liso natural con movimiento. Rellena la fibra capilar y la protege de las agresiones externas. Duración de 3 a 6 meses.'},
  {id:'lavado-diseno-corte',title:'Lavado Dermocapilar + Diseño de Corte',price:'37,00 €',duration:'1 h',category:'peluqueria',
   shortDesc:'Lavado premium con corte personalizado',
   description:'Lavado con productos dermocapilares de alta calidad seguido de un diseño de corte adaptado a tu estilo y facciones. Sin peinado final.'},
  {id:'peinado-especial',title:'Peinado Especial',price:'45,00 €+',duration:'1 h 30 min',category:'peluqueria',
   shortDesc:'Peinados para ocasiones especiales',
   description:'Peinados elaborados para eventos, bodas, ceremonias o cualquier ocasión especial. Recogidos, semirecogidos, ondas glamurosas... Consulta nuestro portfolio.'},
  // ESTÉTICA
  {id:'depilacion-facial-hilo',title:'Depilación facial completa con hilo',price:'17,00 €',duration:'25 min',category:'estetica',
   shortDesc:'Rostro impecable con técnica suave',
   description:'Depilación completa del rostro utilizando la técnica del hilo. Incluye cejas, labio superior, mentón y mejillas. Apta para pieles sensibles.'},
  {id:'maquillaje',title:'Maquillaje',price:'35,00 €+',duration:'1 h',category:'estetica',
   shortDesc:'Maquillaje profesional para cualquier evento',
   description:'Maquillaje profesional para eventos, novias e invitadas. Utilizamos productos de alta gama y técnicas actuales para conseguir el look perfecto para cada ocasión.'},
  {id:'diseno-cejas-hilo',title:'Diseño de cejas con hilo',price:'9,00 €',duration:'15 min',category:'estetica',
   shortDesc:'Define tu mirada con precisión',
   description:'Diseño y depilación de cejas con la técnica del hilo. Conseguimos la forma perfecta adaptada a tu rostro con un acabado limpio y definido.'},
  {id:'color-cejas',title:'Color de cejas',price:'5,00 €',duration:'15 min',category:'estetica',
   shortDesc:'Intensifica tus cejas con tinte',
   description:'Tinte de cejas para intensificar su color y darles mayor presencia. Ideal para cejas claras o con poco vello. Duración aproximada de 3-4 semanas.'},
  // BARBERÍA
  {id:'barro-caballero',title:'Barro Caballero',price:'40,00 €',duration:'1 h 30 min',category:'barberia',
   shortDesc:'Tratamiento nutritivo masculino',
   description:'Tratamiento de barros terapéuticos especialmente formulado para el cabello masculino. Nutre, fortalece y aporta brillo. Ideal para combatir la caspa y el cuero cabelludo graso.'},
  {id:'corte-nino-11',title:'Corte de niño (hasta 11 años)',price:'15,00 €',duration:'30 min',category:'barberia',
   shortDesc:'Cortes divertidos para los peques',
   description:'Corte de cabello para niños hasta 11 años. Ambiente amigable y profesionales con paciencia. Todo tipo de estilos: clásico, moderno, con degradado...'},
  {id:'pack-total-caballero',title:'Pack total caballero',price:'35,00 €',duration:'1 h',category:'barberia',
   shortDesc:'Corte + barba: look completo',
   description:'Pack completo que incluye corte de cabello y arreglo de barba. El servicio ideal para mantener un look cuidado y actual. Incluye lavado y styling.'},
  {id:'corte-caballero-2',title:'Corte caballero',price:'22,00 €',duration:'45 min',category:'barberia',
   shortDesc:'Tu estilo, nuestra experiencia',
   description:'Corte de cabello para caballero con todas las técnicas: degradados, undercut, clásico, texturizado... Incluye lavado, corte y peinado.'},
  {id:'depilacion-cejas-hilo-barber',title:'Depilación cejas con hilo',price:'9,00 €',duration:'15 min',category:'barberia',
   shortDesc:'Cejas definidas para hombre',
   description:'Depilación y perfilado de cejas masculinas con técnica de hilo. Conseguimos un resultado natural y limpio sin que parezca excesivamente arreglado.'},
  {id:'perfilado-barba',title:'Perfilado de barba',price:'9,00 €',duration:'15 min',category:'barberia',
   shortDesc:'Contornos perfectos para tu barba',
   description:'Perfilado de los contornos de la barba para mantenerla definida entre visitas. Incluye cuello y mejillas con navaja o máquina según preferencia.'},
  // TRATAMIENTOS
  {id:'barro-complex',title:'Barro Complex',price:'80,00 €',duration:'1 h 30 min',category:'tratamientos',
   shortDesc:'Tratamiento intensivo con arcillas',
   description:'Tratamiento intensivo con barros terapéuticos y arcillas naturales. Desintoxica el cuero cabelludo, nutre la fibra capilar y aporta un brillo extraordinario. Ideal para cabello dañado.'},
  {id:'tratamiento-restaurador',title:'Tratamiento Restaurador',price:'25,00 €+',duration:'1 h',category:'tratamientos',
   shortDesc:'Recupera la salud de tu cabello',
   description:'Tratamiento reparador para cabello dañado por tintes, planchas o factores externos. Devuelve la elasticidad, el brillo y la suavidad a tu cabello.'}
];

// RENDERIZAR TARJETAS (seguro: solo si existen los contenedores)
function renderCards(){
  const popularEl = document.getElementById('cards-populares');
  if(!popularEl) return;

  const map = {
    populares: popularEl,
    peluqueria: document.getElementById('cards-peluqueria'),
    estetica: document.getElementById('cards-estetica'),
    barberia: document.getElementById('cards-barberia'),
    tratamientos: document.getElementById('cards-tratamientos')
  };

  // populares
  const popularesIds = ['diseño-cejas-hilo','lavado-diseño-peinado','corte-caballero'];
  const populares = SERVICES.filter(s=>popularesIds.includes(s.id));
  populares.forEach(s=>map.populares.insertAdjacentHTML('beforeend', cardHTML(s)));

  // resto por categoría
  if(map.peluqueria) SERVICES.filter(s=>s.category==='peluqueria').forEach(s=>map.peluqueria.insertAdjacentHTML('beforeend', cardHTML(s)));
  if(map.estetica) SERVICES.filter(s=>s.category==='estetica').forEach(s=>map.estetica.insertAdjacentHTML('beforeend', cardHTML(s)));
  if(map.barberia) SERVICES.filter(s=>s.category==='barberia').forEach(s=>map.barberia.insertAdjacentHTML('beforeend', cardHTML(s)));
  if(map.tratamientos) SERVICES.filter(s=>s.category==='tratamientos').forEach(s=>map.tratamientos.insertAdjacentHTML('beforeend', cardHTML(s)));

  if(typeof lucide !== 'undefined') lucide.createIcons();

  document.querySelectorAll('.card-clickable').forEach(card=>{
    card.addEventListener('click', e=>{
      openServiceModal(card.dataset.id);
    });
  });
}

function cardHTML(s){
  const shortDesc = s.shortDesc || 'Servicio profesional';
  return `<article class="card card-clickable" data-id="${s.id}">
    <div class="card-header">
      <h4>${s.title}</h4>
      <p class="card-desc">${shortDesc}</p>
    </div>
    <div class="card-footer">
      <div class="meta">
        <span class="meta-item"><i data-lucide="tag" class="icon-xs"></i> ${s.price}</span>
        <span class="meta-item"><i data-lucide="clock" class="icon-xs"></i> ${s.duration}</span>
      </div>
      <div class="card-hint">
        <i data-lucide="mouse-pointer-click" class="icon-xs"></i> Click para más info
      </div>
    </div>
  </article>`;
}

// MODAL DE SERVICIO
const modal = document.getElementById('service-modal');
const modalContent = document.getElementById('modal-content');
if(modal) {
  document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',closeModal));
}

function openServiceModal(id){
  if(!modal || !modalContent) return;
  const s = SERVICES.find(x=>x.id===id);
  if(!s) return;
  
  const categoryLabels = {
    peluqueria: 'Peluquería',
    estetica: 'Estética',
    barberia: 'Barbería',
    tratamientos: 'Tratamientos'
  };
  
  modalContent.innerHTML = `
    <div class="modal-service">
      <span class="modal-category">${categoryLabels[s.category] || s.category}</span>
      <h3>${s.title}</h3>
      
      <div class="modal-meta">
        <div class="modal-meta-item">
          <i data-lucide="tag"></i>
          <div>
            <span class="modal-meta-label">Precio</span>
            <span class="modal-meta-value">${s.price}</span>
          </div>
        </div>
        <div class="modal-meta-item">
          <i data-lucide="clock"></i>
          <div>
            <span class="modal-meta-label">Duración</span>
            <span class="modal-meta-value">${s.duration}</span>
          </div>
        </div>
      </div>
      
      <div class="modal-description">
        <p>${s.description || 'Servicio profesional ofrecido por Essència con productos de primera calidad y atención personalizada.'}</p>
      </div>
      
      <div class="modal-actions">
        <button class="btn btn-primary btn-lg" id="modal-reservar" data-id="${s.id}">
          <i data-lucide="calendar-plus" class="icon-sm"></i>
          Reservar este servicio
        </button>
      </div>
    </div>
  `;
  
  // Regenerar iconos dentro del modal
  if(typeof lucide !== 'undefined') lucide.createIcons();
  
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  
  document.getElementById('modal-reservar').addEventListener('click', e => {
    preselectServiceAndScroll(e.currentTarget.dataset.id);
    closeModal();
  });
}

function closeModal(){
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
  if(modalContent) modalContent.innerHTML='';
  document.body.style.overflow = '';
}

// GALERÍA LIGHTBOX (si existe galerÍa)
const galleryGrid = document.getElementById('gallery-grid');
if(galleryGrid){
  galleryGrid.addEventListener('click',e=>{
    const img = e.target.closest('img'); if(!img) return; openLightbox(img.src,img.alt);
  });
}
function openLightbox(src,alt){
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src; document.getElementById('lightbox-img').alt = alt;
  lb.setAttribute('aria-hidden','false');
  document.querySelector('.lightbox-close').onclick = ()=>{ lb.setAttribute('aria-hidden','true'); };
}

// RESERVAS: inicialización solo si el formulario está presente
const reservaForm = document.getElementById('reserva-form');
const servicioSelect = document.getElementById('servicio-select');
const horaSelect = document.getElementById('hora');

function populateServiceSelect(){
  if(!servicioSelect) return;
  SERVICE_MAP = {};
  SERVICES.forEach(s=>{ SERVICE_MAP[s.id]=s; const opt = document.createElement('option'); opt.value=s.id; opt.textContent = `${s.title} — ${s.price}`; servicioSelect.appendChild(opt); });
}

function generateTimeOptions(){
  if(!horaSelect) return;
  // ejemplo: 09:00 - 19:00 cada 30 minutos
  const start = 9*60, end = 19*60; const step = 30;
  for(let t=start;t<=end;t+=step){
    const hh = String(Math.floor(t/60)).padStart(2,'0'); const mm = String(t%60).padStart(2,'0');
    const o = document.createElement('option'); o.value = `${hh}:${mm}`; o.textContent = `${hh}:${mm}`; horaSelect.appendChild(o);
  }
}

function preselectServiceAndScroll(id){
  // Si estamos en la página de reservas, selecciona y enfoca
  if(servicioSelect){ servicioSelect.value = id; const fechaEl = document.getElementById('fecha'); if(fechaEl) fechaEl.focus(); document.getElementById('reservar')?.scrollIntoView({behavior:'smooth'}); return; }
  // Si estamos en otra página, ir a reservar con query param
  location.href = `reservar.html?service=${encodeURIComponent(id)}`;
}

// PARSE DURATION ejemplo: '1 h 30 min' -> minutos
function parseDurationToMinutes(str){
  if(!str) return 60;
  const hMatch = str.match(/(\d+)\s*h/);
  const mMatch = str.match(/(\d+)\s*min/);
  let mins = 0; if(hMatch) mins += parseInt(hMatch[1])*60; if(mMatch) mins += parseInt(mMatch[1]);
  if(mins===0){ // casos como '2 h'
    const onlyH = str.match(/(\d+)\s*h/); if(onlyH) mins = parseInt(onlyH[1])*60;
  }
  if(mins===0){ // fallback
    if(str.includes('h')) mins=60; else mins=30;
  }
  return mins;
}

// Gestión simple de reservas en localStorage + control solapamientos
const STORAGE_KEY='essencia_reservas_v1';
function loadReservations(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }catch(e){return [];} }
function saveReservations(list){ localStorage.setItem(STORAGE_KEY,JSON.stringify(list)); }

function isOverlapping(startA,endA,startB,endB){ return (startA < endB && startB < endA); }

function checkAvailability(dateStr, startTime, durationMinutes){
  // dateStr: 'YYYY-MM-DD', startTime: 'HH:MM'
  const [hh,mm] = startTime.split(':').map(Number);
  const start = new Date(dateStr); start.setHours(hh,mm,0,0);
  const end = new Date(start.getTime() + durationMinutes*60000);
  const existing = loadReservations();
  for(const r of existing){
    if(r.date !== dateStr) continue;
    const [sh,sm] = r.time.split(':').map(Number);
    const rs = new Date(r.date); rs.setHours(sh,sm,0,0);
    const re = new Date(rs.getTime() + r.durationMinutes*60000);
    if(isOverlapping(start,re,rs,end)) return false;
  }
  return true;
}

if(reservaForm) {
  reservaForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const form = e.target;
    const data = {
      nombre: form.nombre.value.trim(), apellidos: form.apellidos.value.trim(), telefono: form.telefono.value.trim(),
      email: form.email.value.trim(), servicio: form['servicio-select'].value, date: form.fecha.value, time: form.hora.value,
      comentarios: form.comentarios.value.trim()
    };
    if(!data.nombre||!data.apellidos||!data.telefono||!data.email||!data.servicio||!data.date||!data.time){
      showReservaMessage('Por favor completa los campos obligatorios.','error'); return;
    }
    const serv = SERVICES.find(s=>s.id===data.servicio);
    const durationMinutes = parseDurationToMinutes(serv.duration);

    // Antes de confirmar: consultar calendario externo (hook)
    // fetchCalendarEvents debería devolver eventos existentes entre intervalos.
    // Aquí llamamos a checkAvailability local (simulación). En producción, reemplazar por comprobación real contra Google Calendar.
    const ok = checkAvailability(data.date,data.time,durationMinutes);
    if(!ok){ showReservaMessage('Lo siento, el horario seleccionado no está disponible. Por favor elige otro.', 'error'); return; }

    // Crear reserva local (y a continuación crear evento en Google Calendar mediante API servidor)
    const newRes = {id:Date.now().toString(),name:data.nombre,lastname:data.apellidos,phone:data.telefono,email:data.email,service:serv.title,date:data.date,time:data.time,durationMinutes,comments:data.comentarios};
    const all = loadReservations(); all.push(newRes); saveReservations(all);

    // Intentar crear la reserva en el backend (si existe). Si falla, ya está guardada localmente.
    try{
      const startISO = new Date(`${data.date}T${data.time}`).toISOString();
      const endISO = new Date(new Date(`${data.date}T${data.time}`).getTime() + durationMinutes*60000).toISOString();
      const resp = await fetch('/api/calendar/create',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({summary: `${serv.title} - ${data.nombre}`, description: data.comentarios, start: startISO, end: endISO, meta: {name:data.nombre, email:data.email, phone:data.telefono, service:serv.title, date:data.date, time:data.time}})
      });
      if(resp.ok){
        showReservaMessage('Tu reserva en Essència se ha realizado correctamente. Recibirás la confirmación por correo electrónico.','success');
        form.reset();
        return;
      }
    }catch(e){ /* backend no disponible, seguimos con fallback local */ }

    showReservaMessage('Tu reserva se ha guardado localmente. Conecta el backend para sincronizar con Google Calendar.','success');
    form.reset();
  });
}

function showReservaMessage(msg,type){
  const el = document.getElementById('reserva-mensaje'); 
  if(el) { el.textContent = msg; el.style.color = type==='error' ? 'crimson' : 'green'; }
}

// SUBSCRIPCIÓN
const suscripcionForm = document.getElementById('suscripcion-form');
if(suscripcionForm) {
  suscripcionForm.addEventListener('submit',e=>{
    e.preventDefault(); 
    const email = document.getElementById('sus-email').value.trim(); 
    if(!email || !/\S+@\S+\.\S+/.test(email)){ 
      document.getElementById('sus-mensaje').textContent='Email no válido'; 
      return; 
    }
    // Enviar a /api/suscripciones (ficticio). Reemplazar URL por endpoint real.
    fetch('/api/suscripciones',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email, name:document.getElementById('sus-nombre').value||''})})
      .then(r=>{ if(!r.ok) throw new Error('no'); document.getElementById('sus-mensaje').textContent='Suscripción realizada.'; })
      .catch(()=>{ document.getElementById('sus-mensaje').textContent='Suscripción simulada (endpoint no configurado).'; });
  });
}

// PLACEHOLDERS para integración con Google Calendar
/*
  CONFIGURACIÓN (leer README.md):
  - No incluya credenciales en frontend.
  - Crear un backend que implemente endpoints seguros, por ejemplo:
    GET /api/calendar/events?start=ISO&end=ISO  -> lista eventos
    POST /api/calendar/create  -> cuerpo con {summary,description,start,end}
  - Variables de entorno (ejemplo): GCAL_CLIENT_ID, GCAL_CLIENT_SECRET, GCAL_CALENDAR_ID
  - El frontend debe llamar a esos endpoints para comprobar solapamientos y crear eventos.
*/

// EJEMPLOS DE HOOKS (implementarlos en servidor):
async function fetchCalendarEvents(startISO,endISO){
  // En producción, llamar a backend que use Google APIs con credenciales.
  // return fetch(`/api/calendar/events?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`).then(r=>r.json());
  return []; // simulación
}

async function createCalendarEvent(event){
  // En producción, POST al backend.
  // return fetch('/api/calendar/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event)}).then(r=>r.json());
  return {ok:true}; // simulación
}

// CARRUSEL DE TRABAJOS
function initCarousel(){
  const imgs = document.querySelectorAll('.carousel-img');
  const googleBusinessUrl = 'https://www.google.com/search?q=essencia&rlz=1C1UEAD_esES1061ES1061&oq=essencia&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIRCAEQABgKGAsYgwEYsQMYgAQyDggCEAAYChgLGLEDGIAEMgkIAxAAGAoYgAQyBwgEEAAYgAQyDQgFEC4YrwEYxwEYgAQyDQgGEC4YrwEYxwEYgAQyDggHEAAYChgLGLEDGIAEMgcICBAAGIAEMgcICRAAGI8C0gEJMjQ2M2owajE1qAIIsAIB8QW4-6D6mCcivfEFuPug-pgnIr0&sourceid=chrome&ie=UTF-8#vhid=/g/11wr19yjxd&vssid=lcl';
  
  if(imgs.length === 0) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Agregar evento click a todas las imágenes
  imgs.forEach(img => {
    img.addEventListener('click', () => {
      window.open(googleBusinessUrl, '_blank');
    });
  });
  
  function showSlide(idx){
    currentIndex = (idx + imgs.length) % imgs.length;
    imgs.forEach((img, i)=>{
      img.classList.toggle('active', i === currentIndex);
    });
  }
  
  function startAutoplay(){
    autoplayInterval = setInterval(()=>{
      currentIndex = (currentIndex + 1) % imgs.length;
      showSlide(currentIndex);
    }, 4000);
  }
  
  showSlide(0);
  startAutoplay();
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded',()=>{
  renderCards();
  populateServiceSelect();
  generateTimeOptions();
  initCarousel();
  
  // MENÚ HAMBURGUESA
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', ()=>{
      mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '44px';
      mainNav.style.left = '0';
      mainNav.style.right = '0';
      mainNav.style.flexDirection = 'column';
      mainNav.style.gap = '16px';
      mainNav.style.padding = '16px';
      mainNav.style.backgroundColor = 'var(--bg-dark)';
      mainNav.style.borderBottom = '1px solid var(--glass-border)';
      mainNav.style.zIndex = '100';
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', ()=>{
        mainNav.style.display = 'none';
      });
    });
  }
  
  // Evento click en el mapa para abrir Google Maps
  const mapContainer = document.getElementById('contacto-map-container');
  if(mapContainer){
    mapContainer.addEventListener('click', ()=>{
      window.open('https://maps.google.com/?q=Carrer+La+Miranda+1+Esparreguera+Spain', '_blank');
    });
  }

  // botones de scroll/links (si existen)
  const btnTop = document.getElementById('btn-reservar-top'); if(btnTop) btnTop.addEventListener('click',()=>preselectServiceAndScroll(SERVICES[0].id));
  const btnHero = document.getElementById('btn-reservar-hero'); if(btnHero) btnHero.addEventListener('click',()=>preselectServiceAndScroll(SERVICES[0].id));
  const btnVer = document.getElementById('btn-ver-servicios'); if(btnVer) btnVer.addEventListener('click',()=>{ location.href='services.html#servicios' });
  const footerReservar = document.getElementById('footer-reservar'); if(footerReservar) footerReservar.addEventListener('click',()=>{ location.href='reservar.html' });

  // Modal de Horario
  const btnHorario = document.getElementById('btn-ver-horario');
  const horarioModal = document.getElementById('horarioModal');
  const closeHorario = document.getElementById('closeHorario');
  
  if(btnHorario && horarioModal){
    btnHorario.addEventListener('click', ()=>{
      horarioModal.classList.add('active');
    });
  }
  
  if(closeHorario && horarioModal){
    closeHorario.addEventListener('click', ()=>{
      horarioModal.classList.remove('active');
    });
  }
  
  if(horarioModal){
    horarioModal.addEventListener('click', (e)=>{
      if(e.target === horarioModal) horarioModal.classList.remove('active');
    });
  }

  // Si llegamos a reservar.html con ?service=ID preseleccionar
  if(reservaForm){
    const params = new URLSearchParams(location.search); const s = params.get('service'); if(s && servicioSelect) servicioSelect.value = s;
  }
});

// FUNCIONES PARA POLÍTICAS Y COOKIES
function openPoliciesModal(e){
  if(e) e.preventDefault();
  const modal = document.getElementById('policies-modal');
  if(modal) modal.setAttribute('aria-hidden', 'false');
}

function closePoliciesModal(){
  const modal = document.getElementById('policies-modal');
  if(modal) modal.setAttribute('aria-hidden', 'true');
}

function showCookiesPopup(){
  const cookiesAccepted = localStorage.getItem('essencia_cookies_accepted');
  if(!cookiesAccepted){
    const popup = document.getElementById('cookies-popup');
    if(popup) popup.style.display = 'block';
  }
}

function acceptCookies(){
  localStorage.setItem('essencia_cookies_accepted', 'true');
  const popup = document.getElementById('cookies-popup');
  if(popup) popup.style.display = 'none';
}

function rejectCookies(){
  localStorage.setItem('essencia_cookies_accepted', 'rejected');
  const popup = document.getElementById('cookies-popup');
  if(popup) popup.style.display = 'none';
}

