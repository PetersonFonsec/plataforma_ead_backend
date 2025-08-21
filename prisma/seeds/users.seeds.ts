import { PrismaClient } from '@prisma/client';

import { user_director, user_student, user_teacher, user_director_secundary } from "../../test/__mock__/users";

const prisma = new PrismaClient()

export async function createUsers() {
  const director = await prisma.user.upsert({
    where: { email: user_director.email },
    update: {},
    create: user_director
  });

  const director_secundary = await prisma.user.upsert({
    where: { email: user_director_secundary.email },
    update: {},
    create: user_director_secundary
  });

  const student = await prisma.user.upsert({
    where: { email: user_student.email },
    update: {},
    create: user_student
  });

  const teacher = await prisma.user.upsert({
    where: { email: user_teacher.email },
    update: {},
    create: user_teacher
  });

  console.log('====== Usuarios Criados ======');
  console.log({ director, student, teacher, director_secundary });
  return { director, student, teacher, director_secundary };
}
