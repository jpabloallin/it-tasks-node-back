// src/middlewares/validations.js
const { body, validationResult } = require('express-validator');

// Validaciones para crear/actualizar una solicitud
const validateRequest = [
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isString().withMessage('La descripción debe ser un texto'),
  body('technicianId')
    .notEmpty().withMessage('El ID del técnico es obligatorio')
    .isInt().withMessage('El ID del técnico debe ser un número entero'),
  body('serviceTypeId')
    .notEmpty().withMessage('El ID del tipo de servicio es obligatorio')
    .isInt().withMessage('El ID del tipo de servicio debe ser un número entero'),
  
  // Middleware para atrapar los errores de express-validator
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Error de validación en los datos', 
        details: errors.array() 
      });
    }
    next();
  }
];

module.exports = { validateRequest };