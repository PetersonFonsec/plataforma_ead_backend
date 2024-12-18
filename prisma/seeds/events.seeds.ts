import { EventTypes, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function createEvents(courseId: number) {
  const event_prova = await prisma.event.create({
    data: {
      date: new Date(),
      title: "Prova de X materia",
      description: "Prova da materia X que acontecera de forma presencial",
      type: EventTypes.PROOF,
      course: {
        connect: { id: Number(courseId) }
      }
    }
  });

  const event_reuniao = await prisma.event.create({
    data: {
      date: new Date(),
      title: "Confraternização",
      description: "Para comemorar mais um ano finalizado vamos estamos marcando essa contraternização no dia X",
      type: EventTypes.MEETING,
      course: {
        connect: { id: Number(courseId) }
      }
    }
  });

  const event_aula = await prisma.event.create({
    data: {
      date: new Date(),
      title: "Aula online",
      description: "Vamos entrar ao vivo no Dia X",
      type: EventTypes.LIVECLASS,
      course: {
        connect: { id: Number(courseId) }
      }
    }
  });

  console.log('====== Eventos Criados ======');
  console.log({ event_prova, event_reuniao, event_aula });
  return [event_prova, event_reuniao, event_aula];
};
