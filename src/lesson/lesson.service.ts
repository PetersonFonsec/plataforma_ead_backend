import { Injectable } from '@nestjs/common';

import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Cdn } from '../cdn/cdn';

@Injectable()
export class LessonService {

  constructor(
    private prisma: PrismaService,
    private readonly cdnService: Cdn,
  ) { }

  async create(createLessonDto: CreateLessonDto, authorId: number): Promise<any> {
    if (createLessonDto.fileVideo) {
      const urlContent = await this.cdnService.upload(createLessonDto.fileVideo).toPromise();
      createLessonDto.urlContent = urlContent.result.id;
    }

    const course = await this.prisma.lesson.create({
      data: {
        title: createLessonDto.title,
        description: createLessonDto.description,
        urlContent: createLessonDto.urlContent,
        content: createLessonDto.content,
        author: {
          connect: { id: Number(authorId) }
        },
        course: {
          connect: { id: Number(createLessonDto.courseId) }
        }
      },
    });

    return course
  }

  findAll() {
    return `This action returns all lesson`;
  }

  findOneById(id: number) {
    return this.prisma.lesson.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
