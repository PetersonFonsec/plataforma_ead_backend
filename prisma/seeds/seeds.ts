import { PrismaClient } from '@prisma/client';

import { createCollege } from './college.seeds';
import { createCorse } from './course.seeds';
import { createUsers } from './users.seeds';
import { createQuiz } from './quiz.seeds';

const prisma = new PrismaClient()

async function main() {
  await createUsers()
  const [collage] = await createCollege()
  const [course] = await createCorse(collage.id)
  createQuiz(course.id)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  }).finally(async () => {
    await prisma.$disconnect()
  })

