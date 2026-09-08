// src/controllers/RequestController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RequestController {
  
  // CREATE - POST /api/requests
  static async createRequest(req, res) {
    try {
      const { description, technicianId, serviceTypeId } = req.body;
      const newRequest = await prisma.request.create({
        data: {
          description,
          technicianId: parseInt(technicianId),
          serviceTypeId: parseInt(serviceTypeId),
          status: 'PENDIENTE'
        },
        include: { technician: true, serviceType: true }
      });
      res.status(201).json(newRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la solicitud' });
    }
  }

  // READ ALL - GET /api/requests
  static async getRequests(req, res) {
    try {
      const requests = await prisma.request.findMany({
        include: { technician: true, serviceType: true },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
  }

  // UPDATE - PUT /api/requests/:id
  static async updateRequest(req, res) {
    try {
      const { id } = req.params;
      const { description, status, technicianId, serviceTypeId } = req.body;
      
      const updatedRequest = await prisma.request.update({
        where: { id: parseInt(id) },
        data: {
          description,
          status,
          technicianId: parseInt(technicianId),
          serviceTypeId: parseInt(serviceTypeId)
        },
        include: { technician: true, serviceType: true }
      });
      res.status(200).json(updatedRequest);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Solicitud no encontrada o error al actualizar' });
    }
  }

  // DELETE - DELETE /api/requests/:id
  static async deleteRequest(req, res) {
    try {
      const { id } = req.params;
      await prisma.request.delete({
        where: { id: parseInt(id) }
      });
      // Código 204 indica éxito sin contenido que devolver
      res.status(204).send(); 
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Solicitud no encontrada o ya eliminada' });
    }
  }

  // GET EXTRAS (Para los select/dropdowns del frontend)
  static async getMasters(req, res) {
    try {
      const technicians = await prisma.technician.findMany();
      const serviceTypes = await prisma.serviceType.findMany();
      res.status(200).json({ technicians, serviceTypes });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener datos maestros' });
    }
  }
}

module.exports = RequestController;