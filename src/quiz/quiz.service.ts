import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import Mediator from '../shared/events/mediator';
import { Events } from '../shared/events/events';

@Injectable()
export class QuizService {
  constructor(
    private prisma: PrismaService,
    private readonly mediator: Mediator
  ) { }

  async create(quiz: CreateQuizDto) {
    if (quiz.quizOptions.length < 4 || quiz.quizOptions.length > 5) {
      throw new BadRequestException('Todo Quiz deve ter no minimo de 4 opções e no maximo 5');
    }

    const createdQuiz = await this.prisma.quiz.create({
      data: {
        name: quiz.name,
        courseId: quiz.courseId,
      }
    });

    const quizOptions: Promise<any>[] = [];
    for (const data of quiz.quizOptions) {
      data.quizId = createdQuiz.id;
      quizOptions.push(this.prisma.quizOptions.create({ data }))
    }

    try {
      const options = await Promise.all(quizOptions);
      const response = {
        ...createdQuiz,
        quizOptions: options
      }

      this.mediator.publish(Events.createdNewQuiz, response);

      return response;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
