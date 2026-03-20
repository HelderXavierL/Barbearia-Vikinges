// =============================================
// Barbearia Vikings — Prisma Seed
// =============================================

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ===== Create Admin =====
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vikinges.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@vikinges.com',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      phone: '(11) 99999-0000',
      active: true,
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // ===== Create Barbers =====
  const barberPassword = await bcrypt.hash('barber123', 12);

  const barber1 = await prisma.user.upsert({
    where: { email: 'ragnar@vikinges.com' },
    update: {},
    create: {
      name: 'Ragnar Lothbrok',
      email: 'ragnar@vikinges.com',
      passwordHash: barberPassword,
      role: UserRole.BARBER,
      phone: '(11) 99999-0001',
      active: true,
    },
  });

  const barber2 = await prisma.user.upsert({
    where: { email: 'bjorn@vikinges.com' },
    update: {},
    create: {
      name: 'Bjorn Ironside',
      email: 'bjorn@vikinges.com',
      passwordHash: barberPassword,
      role: UserRole.BARBER,
      phone: '(11) 99999-0002',
      active: true,
    },
  });

  const barber3 = await prisma.user.upsert({
    where: { email: 'ivar@vikinges.com' },
    update: {},
    create: {
      name: 'Ivar, o Desossado',
      email: 'ivar@vikinges.com',
      passwordHash: barberPassword,
      role: UserRole.BARBER,
      phone: '(11) 99999-0003',
      active: true,
    },
  });

  console.log(`✅ Barbers created: ${barber1.name}, ${barber2.name}, ${barber3.name}`);

  // ===== Create Services =====
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'svc-corte' },
      update: {},
      create: {
        id: 'svc-corte',
        name: 'Corte de Cabelo',
        description: 'Corte masculino profissional com acabamento perfeito',
        price: 45.0,
        durationMinutes: 35,
        sortOrder: 1,
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-barba' },
      update: {},
      create: {
        id: 'svc-barba',
        name: 'Barba',
        description: 'Aparar e modelar barba com navalha e toalha quente',
        price: 35.0,
        durationMinutes: 35,
        sortOrder: 2,
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-corte-barba' },
      update: { durationMinutes: 60 },
      create: {
        id: 'svc-corte-barba',
        name: 'Corte + Barba',
        description: 'Combo completo de corte de cabelo e barba',
        price: 70.0,
        durationMinutes: 60,
        sortOrder: 3,
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-sobrancelha' },
      update: {},
      create: {
        id: 'svc-sobrancelha',
        name: 'Design de Sobrancelha',
        description: 'Alinhamento e design personalizado da sobrancelha',
        price: 20.0,
        durationMinutes: 35,
        sortOrder: 4,
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-pigmentacao' },
      update: {},
      create: {
        id: 'svc-pigmentacao',
        name: 'Pigmentação Capilar',
        description: 'Pigmentação para cobertura de falhas e calvície',
        price: 120.0,
        durationMinutes: 35,
        sortOrder: 5,
      },
    }),
  ]);
  console.log(`✅ Services created: ${services.length} services`);

  // ===== Associate Barbers with Services =====
  const barbers = [barber1, barber2, barber3];
  for (const barber of barbers) {
    for (const service of services) {
      await prisma.barberService.upsert({
        where: {
          userId_serviceId: {
            userId: barber.id,
            serviceId: service.id,
          },
        },
        update: {},
        create: {
          userId: barber.id,
          serviceId: service.id,
        },
      });
    }
  }
  console.log('✅ Barber-Service associations created');

  // ===== Create Availability (Mon-Sat, 9:00-18:00) =====
  for (const barber of barbers) {
    for (let day = 1; day <= 6; day++) {
      // 1=Monday to 6=Saturday
      await prisma.availability.upsert({
        where: {
          userId_dayOfWeek: {
            userId: barber.id,
            dayOfWeek: day,
          },
        },
        update: {},
        create: {
          userId: barber.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '18:00',
          active: true,
        },
      });
    }
  }
  console.log('✅ Availability schedules created (Mon-Sat, 09:00-18:00)');

  // ===== Create Sample Clients =====
  const client1 = await prisma.client.upsert({
    where: { phone: '(11) 98888-0001' },
    update: {},
    create: {
      name: 'João Silva',
      phone: '(11) 98888-0001',
      email: 'joao@email.com',
      totalBookings: 5,
      isRecurring: true,
    },
  });

  const client2 = await prisma.client.upsert({
    where: { phone: '(11) 98888-0002' },
    update: {},
    create: {
      name: 'Pedro Santos',
      phone: '(11) 98888-0002',
      email: 'pedro@email.com',
      totalBookings: 1,
      isRecurring: false,
    },
  });
  console.log(`✅ Clients created: ${client1.name}, ${client2.name}`);

  // ===== Create Sample Products =====
  await Promise.all([
    prisma.product.upsert({
      where: { id: 'prod-pomada' },
      update: {},
      create: {
        id: 'prod-pomada',
        name: 'Pomada Modeladora Viking',
        description: 'Pomada efeito matte com fixação forte',
        price: 45.0,
        stockQuantity: 20,
        stockMin: 5,
      },
    }),
    prisma.product.upsert({
      where: { id: 'prod-oleo' },
      update: {},
      create: {
        id: 'prod-oleo',
        name: 'Óleo para Barba',
        description: 'Óleo hidratante com aroma amadeirado',
        price: 55.0,
        stockQuantity: 15,
        stockMin: 3,
      },
    }),
    prisma.product.upsert({
      where: { id: 'prod-shampoo' },
      update: {},
      create: {
        id: 'prod-shampoo',
        name: 'Shampoo 3 em 1',
        description: 'Cabelo, barba e corpo em um só produto',
        price: 35.0,
        stockQuantity: 30,
        stockMin: 10,
      },
    }),
  ]);
  console.log('✅ Products created');

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
