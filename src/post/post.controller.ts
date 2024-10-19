import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../shared/guards/roles.guards';
import { CreatePostDto } from "./dto/post.dto";
import { User } from '../shared/decorators/user.decorator';
import { UserTokenI } from '../shared/interfaces/user-token';
import { RolesWithPermission } from '../shared/decorators/role.decorator';
import { Roles } from '../shared/enums/role.enum';
@Controller('post')
@UseGuards(AuthGuard, RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) { }

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
    return this.postService.getOne(Number(id));
  }

  @Get()
  list() {
    return this.postService.list();
  }
}
