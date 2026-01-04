Essència — Sitio web estático

Descripción
-----------
# Essència - Sitio Web Salón de Belleza

Sitio web moderno, minimalista y totalmente responsive para el salón de belleza **Essència** de Rosa Aguilera. Diseño elegante con tema oscuro y acentos dorados.

## 🎨 Características

✅ **Diseño Responsivo** - Funciona perfectamente en móviles, tablets y desktop  
✅ **Tema Oscuro Moderno** - Paleta elegante con oro (#dbc9b7) como acento  
✅ **30+ Servicios** - Catálogo completo con precios, duraciones y descripciones  
✅ **Sistema de Reservas** - Formulario funcional con validación  
✅ **Envío de Emails** - Confirmaciones automáticas al cliente y gerencia  
✅ **Galería Interactiva** - Carrusel de trabajos con click en Google Business  
✅ **Mapa Integrado** - Ubicación con enlace a Google Maps  
✅ **Social Media** - Enlace directo a Instagram (@essencia_salonbio)  
✅ **Sin Dependencias Complejas** - HTML5, CSS3 puro, JavaScript vanilla  

## 📱 Páginas

- **index.html** - Inicio, about, servicios populares, galería, contacto
- **services.html** - Catálogo completo de servicios con modales
- **reservar.html** - Formulario de reserva con disponibilidad

## 🚀 Instalación y Uso

### Requisitos
- Node.js 14+ 
- npm

### Pasos

1. **Clonar el repositorio:**
```bash
git clone https://github.com/TU_USUARIO/essencia-salon.git
cd essencia-salon
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita `.env` y añade tus credenciales SMTP (ver abajo).

4. **Ejecutar el servidor:**
```bash
node server.js
```

El sitio estará disponible en `http://localhost:3000`

## 📧 Configuración de Emails

El sistema de reservas envía emails automáticos. Necesitas configurar SMTP.

### Opción 1: Gmail (recomendado)

1. Activa [2FA en Google](https://myaccount.google.com/security)
2. Genera [app password](https://myaccount.google.com/apppasswords) (Mail, Windows Computer)
3. En `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password_16_caracteres
FROM_EMAIL=Essencia <tu_email@gmail.com>
```

### Opción 2: Google Workspace / Otro SMTP

Configura tus credenciales SMTP en `.env` según tu proveedor.

## 📅 Google Calendar (Opcional)

Para sincronizar automáticamente las reservas con Google Calendar:

1. [Crea una cuenta de servicio en Google Cloud](https://cloud.google.com/iam/docs/service-accounts)
2. Descarga el JSON de credenciales
3. En `.env`:
```
GCAL_SERVICE_ACCOUNT_FILE=./tu-archivo-credenciales.json
GCAL_CALENDAR_ID=tu_calendar_id@group.calendar.google.com
```

## 🏗️ Estructura del Proyecto

```
essencia-salon/
├── index.html              # Página principal
├── services.html           # Catálogo de servicios
├── reservar.html           # Formulario de reserva
├── server.js               # Backend Express
├── .env.example            # Ejemplo de variables
├── .gitignore              # Archivos ignorados
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos (1721 líneas)
│   └── js/
│       └── scripts.js      # Lógica frontend (490 líneas)
├── data/                   # Reservas y suscripciones (generado en runtime)
├── logoese.png             # Logo
└── ESTRA*.jpeg, ESLOCAL*.jpeg  # Imágenes

```

## 🎯 Información del Negocio

- **Nombre:** Essència
- **Propietaria:** Rosa Aguilera
- **Dirección:** Carrer La Miranda, 1, 08292, Esparreguera
- **Teléfono:** 673 30 49 51
- **Email:** roberbla349@gmail.com
- **Instagram:** [@essencia_salonbio](https://www.instagram.com/essencia_salonbio/)
- **Horario:**
  - Lunes a Viernes: 10:00 - 19:00
  - Sábados: 10:00 - 15:00
  - Domingos: Cerrado

## 💾 Base de Datos Local

Sin configuración de Google Calendar, el servidor guarda las reservas en `data/reservations.json` (no incluido en Git).

Estructura:
```json
{
  "id": "1704369600000",
  "name": "Cliente",
  "email": "cliente@email.com",
  "service": "Nombre Servicio",
  "date": "2026-01-15",
  "time": "14:30",
  "durationMinutes": 60,
  "comments": "Notas adicionales"
}
```

## 🌐 Deploy

### Opción 1: Heroku (recomendado para Node)
```bash
heroku login
heroku create essencia-salon
git push heroku main
```

### Opción 2: Vercel (para static)
```bash
vercel
```

### Opción 3: Netlify
```bash
npm run build  # si aplica
netlify deploy
```

## 🛠️ Desarrollo

### Editar servicios
Abre `assets/js/scripts.js` y busca `const SERVICES = [...]` (línea ~1)

### Editar estilos
`assets/css/styles.css` - 1721 líneas de CSS puro, variables CSS incluidas

### Editar contenido
Edita directamente los archivos `.html`

## 📝 API del Backend

### GET `/api/calendar/events`
Lista eventos en rango de fechas
```
GET /api/calendar/events?start=2026-01-01T00:00:00Z&end=2026-01-31T23:59:59Z
Response: { items: [...] }
```

### POST `/api/calendar/create`
Crea una reserva y envía emails
```json
{
  "summary": "Servicio - Cliente",
  "description": "Comentarios",
  "start": "2026-01-15T14:30:00Z",
  "end": "2026-01-15T15:30:00Z",
  "meta": {
    "name": "Cliente",
    "email": "cliente@email.com",
    "phone": "+34600000000",
    "service": "Nombre Servicio",
    "date": "2026-01-15",
    "time": "14:30",
    "comments": "Notas"
  }
}
```

### POST `/api/suscripciones`
Suscribir a newsletter
```json
{
  "email": "suscriptor@email.com",
  "name": "Nombre"
}
```

## ✅ Checklist Pre-Producción

- [ ] Variables `.env` configuradas
- [ ] Imágenes optimizadas
- [ ] Enlaces de redes sociales verificados
- [ ] Datos de contacto actualizados
- [ ] SMTP funcionando
- [ ] Google Calendar integrado (opcional)
- [ ] Dominio apuntando al servidor
- [ ] SSL/HTTPS configurado

## 📞 Soporte

Para preguntas sobre el desarrollo o deployment, contacta con el equipo de desarrollo.

---

**© 2026 Essència by Rosa Aguilera. Todos los derechos reservados.**

Archivos principales
-------------------
- `index.html`
- `assets/css/styles.css`
- `assets/js/scripts.js`

Personalización rápida
----------------------
- Teléfono y email: editar los placeholders en `index.html` (buscar `tel:+34XXXXXXXXX` y `tucorreo@dominio.com`).
- Fotos: se han incluido imágenes ejemplo con nombres que parecen estar en tu carpeta (`ESLOCAL.jpeg`, `ESLOCAL1.jpeg`, etc.). Si las imágenes ya están en la carpeta raíz del servidor, se utilizarán automáticamente. Para usar tu carpeta `assets/img/` crea la carpeta y actualiza las rutas en `index.html`.

Reservas y Google Calendar (integración)
---------------------------------------
El proyecto incluye una simulación de reservas usando `localStorage`. Las funciones para trabajar con Google Calendar están preparadas como hooks en `assets/js/scripts.js`:

- `fetchCalendarEvents(startISO,endISO)` — En producción debe llamar a un endpoint backend que consulte Google Calendar.
- `createCalendarEvent(event)` — En producción debe llamar a un endpoint backend que cree el evento en Google Calendar.

Recomendación de backend
------------------------
Implementar un servidor que maneje las credenciales de Google de forma segura y exponga endpoints:

- `GET /api/calendar/events?start=ISO&end=ISO`
- `POST /api/calendar/create` (body con {summary,description,start,end})

Variables de entorno sugeridas (backend)
- `GCAL_CLIENT_ID`
- `GCAL_CLIENT_SECRET`
- `GCAL_SERVICE_ACCOUNT_KEY` (si usa cuenta de servicio)
- `GCAL_CALENDAR_ID`

Seguridad
--------
- Nunca incluir credenciales de Google en el frontend. El backend debe firmar/gestionar las llamadas.

Probar localmente
------------------
Desde la carpeta del proyecto ejecutar un servidor HTTP estático (por ejemplo con Python):

```powershell
cd 'C:\Users\Usuario\Desktop\Essencia'
py -m http.server 8000
# luego abrir http://localhost:8000
```

Ejecutar backend (recomendado para reservas reales y sincronización con Google Calendar)
-----------------------------------------------------------------
1. Instala dependencias (Node.js >= 16):

```powershell
cd 'C:\Users\Usuario\Desktop\Essencia'
npm install
```

2. Copia `.env.example` a `.env` y ajusta las variables:
- `GCAL_SERVICE_ACCOUNT_FILE`: ruta al JSON de la cuenta de servicio (opcional)
- `GCAL_CALENDAR_ID`: id del calendario (opcional)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL` (opcional, para enviar emails)

3. Inicia el servidor (servirá la web y los endpoints API):

```powershell
npm start
# Abre http://localhost:3000
```

Notas sobre integración con Google Calendar
-----------------------------------------
- El backend intenta usar una cuenta de servicio (service account). Crea una cuenta de servicio en Google Cloud, descarga el JSON y pon la ruta en `GCAL_SERVICE_ACCOUNT_FILE`.
- Comparte el calendario (si hace falta) con la cuenta de servicio para que pueda insertar eventos.
- Alternativamente, puede implementarse OAuth2 para usuarios si se desea autenticación por usuario.


Notas
-----
- No se han inventado teléfonos, emails ni horarios: aparecen como campos editables/placeholder para que la gerente los complete.
- En el formulario de suscripción el endpoint `/api/suscripciones` es un ejemplo; sustituir por su servicio de email marketing (Mailchimp, Sendinblue, etc.).
#   E s s e n c i a  
 