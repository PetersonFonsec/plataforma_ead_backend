import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RolesWithPermission } from '../shared/decorators/role.decorator';
import { UserTokenI } from '../shared/interfaces/user-token';
import { RolesGuard } from '../shared/guards/roles.guards';
import { User } from '../shared/decorators/user.decorator';
import { storage } from '../shared/utils/storage';
import { Roles } from '../shared/enums/role.enum';

import { RegisterStudiantDTO } from './dto/register-student.dto';
import { collegeCreateDTO } from './dto/college-create.dto';
import { CollegeService } from './college.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller("college")
@UseGuards(AuthGuard, RolesGuard)
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR])
  @UseInterceptors(FileInterceptor('thumb', storage('college')))
  create(@Body() college: collegeCreateDTO, @User() user: UserTokenI, @UploadedFile() thumb): Promise<any> {
    college.thumb = thumb;
    console.log(thumb)
    return this.collegeService.create(college, user);
  }

  @Post("/user")
  @RolesWithPermission([Roles.DIRECTOR, Roles.ADMIN])
  registerUser(@Body() college: RegisterStudiantDTO): Promise<any> {
    return this.collegeService.registerUser(college);
  }

  @Get()
  @RolesWithPermission([Roles.DIRECTOR])
  get(@User() user: UserTokenI): Promise<any> {
    return this.collegeService.getByUser(user.id);
  }

  @Get("/:id")
  @RolesWithPermission([Roles.DIRECTOR])
  getById(@User() user: UserTokenI, @Param('id') id: string): Promise<any> {
    return this.collegeService.getById(parseInt(id), user.id);
  }
}
