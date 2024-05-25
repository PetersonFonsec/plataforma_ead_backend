import { PrismaClient } from '@prisma/client';


import { createUsers } from './users.seeds';
import { createCollege } from './college.seeds';

const prisma = new PrismaClient()

async function main() {
  await createUsers()
  await createCollege()
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  }).finally(async () => {
    await prisma.$disconnect()
  })

