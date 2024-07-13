import { Injectable, NotFoundException } from '@nestjs/common';

import { courseCreateDTO } from './dto/course-create.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Cdn } from '../cdn/cdn';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private readonly cdnService: Cdn,
  ) { }

  async create(payload: courseCreateDTO): Promise<courseCreateDTO> {
    if (payload.thumb) {
      const thumb = await this.cdnService.upload(payload.thumb).toPromise();
      payload.thumb = thumb.result.id;
    }

    const course = await this.prisma.course.create({
      data: {
        name: payload.name,
        thumb: payload.thumb,
        college: {
          connect: { id: Number(payload.collegeId) }
        }
      },
    });

    course.thumb = await this.cdnService.getImage(course.thumb).toPromise()

    return course
  }

  async get(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: parseInt(courseId) } })
    if (!course) return new NotFoundException(`Course with id ${courseId} is not found`);
    course.thumb = await this.cdnService.getImage(course.thumb).toPromise();
    return course;
  }

  async getContent(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: parseInt(courseId) } })
    if (!course) return new NotFoundException(`Course with id ${courseId} is not found`);

    const [quizes, tasks, lessons] = await Promise.all(
      [
        this.prisma.quiz.findMany({ where: { courseId: parseInt(courseId) } }),
        this.prisma.task.findMany({ where: { courseId: parseInt(courseId) } }),
        this.prisma.lesson.findMany({ where: { courseId: parseInt(courseId) } }),
      ]
    );

    return { quizes, tasks, lessons }
  }
}
