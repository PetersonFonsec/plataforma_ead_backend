import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { RolesWithPermission } from '../shared/decorators/role.decorator';
import { UserTokenI } from '../shared/interfaces/user-token';
import { RolesGuard } from '../shared/guards/roles.guards';
import { User } from '../shared/decorators/user.decorator';
import { collegeCreateDTO } from './dto/college-create.dto';
import { CollegeService } from './college.service';
import { Roles } from '../shared/enums/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RegisterStudiantDTO } from './dto/register-student.dto';

@Controller("college")
@UseGuards(AuthGuard, RolesGuard)
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR])
  create(@Body() college: collegeCreateDTO, @User() user: UserTokenI): Promise<any> {
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
