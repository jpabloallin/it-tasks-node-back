// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear Técnicos
  await prisma.technician.createMany({
    data: [
      { fullName: 'Pablo Cañas' },
      { fullName: 'David López' },
      { fullName: 'Jose Cano' }
    ]
  });

  // Crear Tipos de Servicio
  await prisma.serviceType.createMany({
    data: [
      { name: 'Mantenimiento Preventivo', description: 'Limpieza física y optimización del sistema operativo' },
      { name: 'Instalación de Software', description: 'Instalación y licenciamiento de herramientas corporativas' },
      { name: 'Soporte de Redes', description: 'Diagnóstico de conectividad, cables y routers' },
      { name: 'Reparación de Hardware', description: 'Cambio de componentes físicos y fuentes de poder' }
    ]
  });
  console.log('✅ Base de datos poblada con técnicos IT y servicios.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });