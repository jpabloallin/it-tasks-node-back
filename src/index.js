const express = require('express');
const cors = require('cors');
require('dotenv').config();
const requestRoutes = require('./routes/request.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Desactivar ETags para evitar respuestas 304 vacías en la API
app.set('etag', false);

// Middlewares globales
app.use(cors());
app.use(express.json());

// Deshabilitar caché del navegador en todas las respuestas REST
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Registro de rutas
app.use('/api/requests', requestRoutes);

// Manejo de rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});