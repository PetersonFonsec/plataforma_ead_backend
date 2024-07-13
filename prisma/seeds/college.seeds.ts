import { PrismaClient } from '@prisma/client';

import { college_makenze, college_senac } from "../../test/__mock__/college";
import { user_director } from '../../test/__mock__/users';

const prisma = new PrismaClient()

export async function createCollege() {
  const makenze = await prisma.college.create({
    data: {
      name: college_makenze.name,
      user: {
        connect: {
          email: user_director.email
        }
      }
    }
  });

  const makenze_style = await prisma.collegeStyle.create({
    data: {
      thumb: college_makenze.thumb,
      primaryColor: college_makenze.primaryColor,
      secundaryColor: college_makenze.secundaryColor,
      college: {
        connect: { id: makenze.id }
      },
    }
  });

  const senac = await prisma.college.create({
    data: {
      name: college_senac.name,
      user: {
        connect: {
          email: user_director.email
        }
      }
    }
  });

  const senac_style = await prisma.collegeStyle.create({
    data: {
      thumb: college_senac.thumb,
      primaryColor: college_senac.primaryColor,
      secundaryColor: college_senac.secundaryColor,
      college: {
        connect: { id: senac.id }
      },
    }
  });

  console.log('====== Colegios Criados ======');
  console.log({ makenze, makenze_style, senac, senac_style });

  return [senac, makenze];
}
