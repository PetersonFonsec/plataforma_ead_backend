import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RolesWithPermission } from '../shared/decorators/role.decorator';
import { courseCreateDTO } from './dto/course-create.dto';
import { RolesGuard } from '../shared/guards/roles.guards';
import { Roles } from '../shared/enums/role.enum';
import { storage } from '../shared/utils/storage';
import { CourseService } from './course.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller("course")
@UseGuards(AuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR])
  @UseInterceptors(FileInterceptor('thumb', storage('course')))
  create(@Body() course: courseCreateDTO, @UploadedFile() thumb): Promise<any> {
    course.thumb = thumb;
    return this.courseService.create(course);
  }

  @Get("/:id")
  get(@Param('id') id: string) {
    return this.courseService.get(id);
  }
}
