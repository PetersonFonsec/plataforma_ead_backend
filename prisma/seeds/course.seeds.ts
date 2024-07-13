import { PrismaClient } from '@prisma/client';
import { course } from '../../test/__mock__/course';

const prisma = new PrismaClient()

export async function createCorse(collegeId: number) {
  const curso = await prisma.course.create({
    data: {
      ...course,
      college: {
        connect: {
          id: collegeId
        }
      }
    }
  });

  console.log('====== Cursos Criados ======');
  console.log({ curso });
  return [curso];
};
