# LKMX – Prueba Técnica Software Engineer

Este proyecto es una aplicación construida con **Next.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **Docker**, **Tailwind CSS** y **shadcn/ui**.  por Adrian Pineda.
El objetivo es demostrar una implementación funcional con **lógica de negocio básica**, **API**, **base de datos** y **UI**.

---

## 🚀 Tecnologías

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker / Docker Compose
- Tailwind CSS
- shadcn/ui

---

## 📦 Funcionalidad

### API
- `GET /api/health` – Health check
- `GET /api/user` – Listar usuarios
- `POST /api/user` – Crear usuario
- `PUT /api/user` – Editar usuario
- `POST /api/user/check-in` – Entrada de usuario
- `POST /api/user/check-out` – Salida de usuario
- `GET /api/analytics` – Analíticas

### Lógica de negocio
- Los usuarios pertenecen a un área: **OPERATIONS**, **SALES**, **HR**
- El check-in / check-out define si un usuario está “dentro”
- El endpoint de analytics devuelve:
  - Total de usuarios
  - Usuarios dentro
  - Usuarios por área

### UI
- Dashboard con:
  - Cards de analíticas
  - Usuarios agrupados por área
  - Cards de usuario con iniciales
- Modal para crear y editar usuarios
- Acciones de check-in / check-out desde la UI

---

## 🐳 Ejecutar el proyecto

### 1️⃣ Levantar contenedores

```bash
docker compose up --build
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

### 2️⃣ Ejecutar migraciones (una sola vez)

```bash
npx prisma migrate deploy
```

---

## 📊 Dashboard

```
http://localhost:3000/dashboard
```

Desde aquí se pueden:
- Ver analíticas
- Crear y editar usuarios
- Hacer check-in y check-out
- Ver usuarios por área

---

## ☁️ Deploy

La aplicación puede desplegarse en **Google Cloud Run** usando la imagen Docker.  
La base de datos puede alojarse en **Cloud SQL** u otro proveedor PostgreSQL.

---

## ✅ Notas

- Prisma y dependencias se generan dentro del contenedor.
- Tailwind CSS v3 se usa por estabilidad.
- La arquitectura prioriza claridad y mantenibilidad.

---

## 🏁 Conclusión

El proyecto muestra una aplicación funcional con API, base de datos, lógica de negocio simple y una UI básica, manteniendo una estructura clara y fácil de escalar.
