import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationService } from '../shared/services/pagination/pagination.service';
import { PaginationQuery } from '../shared/services/pagination/pagination.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from './entities/post.entities';

@Injectable()
export class PostConsultService extends PaginationService<Post> {

  constructor(public prisma: PrismaService) {
    super(prisma);
    this.modelName = this.prisma.post;
  }

  async list(q?: any): Promise<any> {
    const queryDefault: PaginationQuery = { page: 1, limit: 10, sortBy: 'id', order: 'desc', search: '' };
    return await this.listPaginated(Object.assign(queryDefault, q));
  }

  async getOne(id: number): Promise<any> {
    const post = await this.prisma.post.findUnique({ where: { id, published: true } });
    if (!post) throw new NotFoundException(`Post não encontrado`);
    return post;
  }
}
