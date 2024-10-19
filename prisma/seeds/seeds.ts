import { PrismaClient } from '@prisma/client';

import { createCollege } from './college.seeds';
import { createCorse } from './course.seeds';
import { createUsers } from './users.seeds';
import { createQuiz } from './quiz.seeds';
import { createLesson } from './lesson.seeds';
import { createPost } from './post.seeds';

const prisma = new PrismaClient()

async function main() {
  const { director } = await createUsers();
  const [collage] = await createCollege();
  const [course] = await createCorse(collage.id);

  createQuiz(course.id);
  createLesson(director.id, course.id);
  createPost(director.id, course.id, course.id);
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})

