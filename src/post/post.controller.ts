import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { RolesWithPermission } from '../shared/decorators/role.decorator';
import { UserTokenI } from '../shared/interfaces/user-token';
import { PostConsultService } from './post-consult.service';
import { User } from '../shared/decorators/user.decorator';
import { RolesGuard } from '../shared/guards/roles.guards';
import { Roles } from '../shared/enums/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from "./dto/post.dto";
import { PostService } from './post.service';
import { PaginationQuery } from 'src/shared/services/pagination/pagination.interface';
@Controller('post')
@UseGuards(AuthGuard, RolesGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postConsultService: PostConsultService,
  ) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  create(@Body() payload: CreatePostDto, @User() user: UserTokenI) {
    return this.postService.create(payload, user.id);
  }

  @Post("/:id")
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  publish(@Param("id") id: string) {
    return this.postService.publish(Number(id));
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    return this.postConsultService.getOne(Number(id));
  }

  @Get()
  list(@Query() query: PaginationQuery) {
    return this.postConsultService.list(query);
  }
}
