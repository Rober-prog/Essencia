# Guía Rápida: Subir a GitHub y Deploy

## 1️⃣ Crear Repositorio en GitHub

```bash
# Ve a github.com/new
# Crea un repositorio llamado: essencia-salon
# NO inicialices con README (ya tenemos uno)
```

## 2️⃣ Inicializar Git Localmente

```bash
cd C:\Users\Usuario\Desktop\Essencia

# Inicializar repo
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "chore: initial commit - Essencia salon website"

# Agregar remote
git remote add origin https://github.com/TU_USUARIO/essencia-salon.git

# Cambiar rama a main
git branch -M main

# Push
git push -u origin main
```

## 3️⃣ Deploy a Heroku (Gratuito)

```bash
# Instalar Heroku CLI desde: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Crear app
heroku create essencia-salon

# Configurar variables de entorno
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=roberbla349@gmail.com
heroku config:set SMTP_PASS=tu_app_password
heroku config:set FROM_EMAIL="Essencia <roberbla349@gmail.com>"

# Deploy
git push heroku main

# Ver logs
heroku logs --tail

# Abre en navegador
heroku open
```

**URL pública:** https://essencia-salon.herokuapp.com

## 4️⃣ Deploy a Vercel (Alternativa)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Responde las preguntas y listo!
```

## 5️⃣ Variables Sensibles

**⚠️ IMPORTANTE:** El archivo `.env` ya está en `.gitignore`

- No subas `.env` a GitHub
- En Heroku/Vercel configura las variables desde el dashboard
- Guarda tus credenciales en un lugar seguro

## 6️⃣ Checklist Antes de Deploy

- [ ] `.env` creado localmente con tus credenciales
- [ ] Proyecto testeado en localhost:3000
- [ ] Emails funcionando correctamente
- [ ] `.env` NO está en Git (verificar con `git status`)
- [ ] README.md actualizado con tu info
- [ ] package.json con descripción correcta

## 7️⃣ URL para Cliente

Una vez deployado, comparte esta URL con el cliente:
```
https://essencia-salon.herokuapp.com
```

El cliente puede:
- Ver servicios
- Hacer reservas
- Ver galería
- Contactar por Instagram/WhatsApp

---

**Nota:** Heroku puede tardar 30-60 segundos en el primer deploy. Si ves error "Application Error", revisa los logs con `heroku logs --tail`
