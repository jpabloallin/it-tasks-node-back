# IT Tasks Management CRUD - Sistema de Gestión de Solicitudes TI

Aplicación web Full-Stack para la administración, asignación y seguimiento de solicitudes de soporte técnico y mantenimiento de infraestructura TI.

## 🛠️ Stack Tecnológico

*   **Backend:** Node.js (v24+), Express.js, Prisma ORM (v6).
*   **Base de Datos:** SQLite (`dev.db`).
*   **Frontend:** Angular (v21+ / v22), TypeScript, Bootstrap 5, Bootstrap Icons.
*   **Arquitectura:** API REST desacoplada, Componentes Standalone, Formularios Reactivos y Control Flow declarativo (`@if`, `@for`).

---

## 📋 Requisitos Previos

*   Node.js (versión 20 o superior instalada).
*   NPM (gestor de paquetes de Node).

---

## 🚀 Guía de Instalación y Despliegue Local

Sigue estos pasos en terminales independientes para levantar la solución:

### a. Servidor Backend (`it-tasks-node-back`)

1. Ingresa a la carpeta del backend:
   ```bash
   cd it-tasks-node-back

2. Instala las dependencias:
    Bash
    npm install

3. Ejecuta las migraciones de base de datos e inicializa el archivo SQLite:
    ```bash
    npx prisma migrate dev --name init

4. Ejecuta el script de sembrado con los técnicos y servicios iniciales:
    ```bash
    node prisma/seed.js

5. Inicia el servidor API REST:
    ```bash
    node src/index.js

6. El backend quedará escuchando en http://localhost:3000.

### b. Servidor Frontend (`it-tasks-angular-front`)

1. Abre una nueva terminal e ingresa a la carpeta del frontend:
    ```bash
    cd it-tasks-angular-front

2. Instala las dependencias:
    ```bash
    npm install

3. Inicia el servidor de desarrollo de Angular:
    ```bash
    npx ng serve

4. Abre tu navegador web en:http://localhost:4200

## c. Documentación de Endpoints (API REST)

| Método | Endpoint | Descripción | Body (JSON) | Respuesta Exitosa |
| :---: | :--- | :--- | :--- | :--- |
| `GET` | `/api/requests/masters` | Obtiene los catálogos maestros de técnicos y tipos de servicio. | *None* | `200 OK`<br>`{"technicians": [...], "serviceTypes": [...]}` |
| `GET` | `/api/requests` | Obtiene el listado de solicitudes registradas con sus relaciones. | *None* | `200 OK`<br>`[{"id": 1, "description": "...", ...}]` |
| `POST` | `/api/requests` | Registra una nueva solicitud de soporte técnico. | `{"description": "...", "technicianId": 1, "serviceTypeId": 2, "status": "PENDIENTE"}` | `201 Created`<br>`{"id": 3, "description": "...", ...}` |
| `PUT` | `/api/requests/:id` | Actualiza la información o el estado de una solicitud existente. | `{"description": "...", "technicianId": 1, "serviceTypeId": 2, "status": "RESUELTO"}` | `200 OK`<br>`{"id": 2, "status": "RESUELTO", ...}` |
| `DELETE` | `/api/requests/:id` | Elimina permanentemente una solicitud por su ID. | *None* | `204 No Content` |
