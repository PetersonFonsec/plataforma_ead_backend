import { PrismaClient } from '@prisma/client';
import { lesson_with_link, lesson_with_content } from '../../test/__mock__/lesson';

const prisma = new PrismaClient();

export async function createLesson(authorId, courseId) {
  const lessonData1 = lesson_with_link(authorId, courseId);
  const lessonData2 = lesson_with_content(authorId, courseId);

  const lesson_link = await prisma.lesson.create({
    data: lessonData1
  });

  const lesson_content = await prisma.lesson.create({
    data: lessonData2
  });

  console.log('====== Lições Criadas ======');
  console.log({ lesson_link, lesson_content });
  return { lesson_link, lesson_content };
};
