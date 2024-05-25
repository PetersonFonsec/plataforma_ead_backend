import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Roles } from '../src/shared/enums/role.enum';

const prisma = new PrismaClient()

async function main() {
  const thaina = await prisma.user.upsert({
    where: { email: 'thaina@gmail.com' },
    update: {},
    create: {
      email: 'thaina@gmail.com',
      name: 'Thaina Alexandre Silva',
      documentNumber: '36482444006',
      password: bcrypt.hashSync('Senha123!', 8),
      active: false,
      role: Roles.STUDENT
    }
  });

  const peterson = await prisma.user.upsert({
    where: { email: 'peterson@gmail.com' },
    update: {},
    create: {
      email: 'peterson@gmail.com',
      name: 'Peterson Fonseca Simião',
      documentNumber: '36479747062',
      password: bcrypt.hashSync('Senha123!', 8),
      active: false,
      role: Roles.STUDENT
    }
  });

  console.log('====== Usuarios Criados');
  console.log({ thaina, peterson });
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  }).finally(async () => {
    await prisma.$disconnect()
  })

