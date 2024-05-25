import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Roles } from '../shared/enums/role.enum';
import { AuthGuard } from '../auth/auth.guard';

@Controller("users")
// @UseGuards(AuthGuard)
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

  @Patch('/:id')
  update(@Param('id') id: string, @Body() user: UpdateUserDTO): Promise<any> {
    return this.userService.updateUser(parseInt(id), user);
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
