import { PrismaClient } from '@prisma/client';
import { quiz } from "../../test/__mock__/quiz";

const prisma = new PrismaClient()

export async function createQuiz(courseId: number) {
  const Quiz = await prisma.quiz.create({
    data: {
      title: quiz.title,
      courseId,
    }
  });

  for (const option of quiz.options) {
    await prisma.quizOptions.create({
      data: {
        title: option.title,
        correctOptions: option.correctOptions,
        Quiz: {
          connect: { id: Quiz.id }
        },
      }
    });
  }

  console.log('====== Criando Quiz ======');
  console.log({ Quiz });
}
