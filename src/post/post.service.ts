import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';
import Mediator from '../shared/events/mediator';
import { Events } from '../shared/events/events';

@Injectable()
export class PostService {

  constructor(
    public prisma: PrismaService,
    private mediator: Mediator,
  ) { }

  async create(payload: CreatePostDto, authorId: number): Promise<any> {
    const post = await this.prisma.post.create({
      data: {
        content: payload.content,
        college: {
          connect: { id: Number(payload.collegeId) }
        },
        author: {
          connect: { id: Number(authorId) }
        },
        course: {
          connect: { id: Number(payload.courseId) }
        },
      },
    });

    await this.mediator.publish(Events.createdNewPost, post);

    return post
  }

  async publish(id: number) {
    return await this.prisma.post.update({ where: { id }, data: { published: true } });
  }
}
