# Dashboard privado · Guía de configuración

El panel vive en `/admin` (login en `/admin/login`). Los datos se guardan en **Supabase** (plan gratuito). Sigue estos pasos una sola vez.

## 1. Crear el proyecto en Supabase
1. Entra a https://supabase.com → **Sign in** (puedes usar GitHub o tu correo).
2. **New project** → ponle nombre (ej. `freewill-studio`), elige una contraseña de base de datos y la región más cercana (ej. `East US`).
3. Espera ~2 min a que se cree.

## 2. Crear las tablas
1. En tu proyecto Supabase → menú izquierdo **SQL Editor** → **New query**.
2. Abre el archivo `supabase-schema.sql` (está en esta carpeta), copia **todo** su contenido y pégalo.
3. Dale **Run**. Debe decir "Success". Esto crea las tablas y la seguridad.

## 3. Conectar las credenciales
1. En Supabase → **Project Settings** (engranaje) → **API**.
2. Copia el **Project URL** y la llave **anon public**.
3. En esta carpeta, crea un archivo llamado `.env` (copia de `.env.example`) y rellena:
   ```
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-public-key
   ```

## 4. Crear tu usuario (login)
1. En Supabase → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Pon tu correo y una contraseña.
3. **Importante:** activa **Auto Confirm User** (para no tener que confirmar por email).

## 5. Probar en local
```bash
npm install
npm run dev
```
Abre http://localhost:5174/admin/login e inicia sesión con el usuario que creaste.

## 6. Publicar en producción (Vercel)
Las credenciales también deben estar en Vercel:
1. Vercel → tu proyecto → **Settings** → **Environment Variables**.
2. Agrega las dos variables (mismos valores del `.env`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Vuelve a desplegar:
   ```bash
   npm run build && npx vercel --prod
   ```
4. Tu panel quedará en `https://freewillstudiotech.com/admin`.

---

### Notas
- El sitio público sigue funcionando igual; el panel es una sección aparte y privada.
- La **Analítica** empieza a llenarse en cuanto haya visitas reales a la web (cada visita se registra sola).
- Si el login dice "Falta configurar Supabase", es que faltan las variables `.env` (paso 3) o las de Vercel (paso 6).
- Solo tú (usuarios creados en Supabase) pueden entrar; no hay registro público.
