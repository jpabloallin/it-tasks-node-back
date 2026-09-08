// src/routes/request.routes.js
const { Router } = require('express');
const RequestController = require('../controllers/RequestController');
const { validateRequest } = require('../middlewares/validations');

const router = Router();

// Rutas para datos maestros (dropdowns)
router.get('/masters', RequestController.getMasters);

// Rutas CRUD ("Exposición y consumo de servicios web REST")
router.get('/', RequestController.getRequests);
router.post('/', validateRequest, RequestController.createRequest);
router.put('/:id', validateRequest, RequestController.updateRequest);
router.delete('/:id', RequestController.deleteRequest);

module.exports = router;