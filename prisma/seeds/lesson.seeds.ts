import { PrismaClient } from '@prisma/client';
import { lesson_with_link } from '../../test/__mock__/lesson';

const prisma = new PrismaClient();

export async function createLesson(authorId, courseId) {
  const lessonData = lesson_with_link(authorId, courseId);

  const lesson = await prisma.lesson.create({
    data: lessonData
  });

  console.log('====== Lições Criadas ======');
  console.log({ lesson });
  return [lesson];
};
