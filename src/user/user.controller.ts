import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdatePasswordDTO } from './dto/update-password.dto';
import { User } from '../shared/decorators/user.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { storage } from '../shared/utils/storage';
import { Roles } from '../shared/enums/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UserTokenI } from 'src/shared/interfaces/user-token';
@Controller("users")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("director")
  createDirector(@Body() user: CreateUserDTO): Promise<any> {
    user.role = Roles.DIRECTOR;
    return this.userService.createUser(user);
  }

  @Post("student")
  createStudent(@Body() user: CreateUserDTO): Promise<any> {
    user.role = Roles.STUDENT;
    return this.userService.createUser(user);
  }

  @Post("teacher")
  createTeacher(@Body() user: CreateUserDTO): Promise<any> {
    user.role = Roles.TEACHER;
    return this.userService.createUser(user);
  }

  @Get('/:id')
  get(@Param('id') id: string): Promise<any> {
    return this.userService.find({ id });
  }

  @Get()
  getAll(): Promise<any[]> {
    return this.userService.getAllUser();
  }

  @Patch()
  @UseInterceptors(FileInterceptor('photo', storage('user')))
  update(@UploadedFile() photo, @User() loggedUser: UserTokenI, @Body() user: UpdateUserDTO): Promise<any> {
    user.photo = photo;
    return this.userService.updateUser(loggedUser.id, user);
  }

  @Patch('/updatePassword/')
  updatePassword(@Body() user: UpdatePasswordDTO): Promise<any> {
    return this.userService.updatePassword(user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUser(parseInt(id));
  }
}
