import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/utils/storage';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guards';
import { RolesWithPermission } from 'src/shared/decorators/role.decorator';
import { Roles } from 'src/shared/enums/role.enum';
import { UserTokenI } from 'src/shared/interfaces/user-token';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('lesson')
@UseGuards(AuthGuard, RolesGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  @UseInterceptors(FileInterceptor('fileVideo', storage('lesson')))
  create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() fileVideo, @User() user: UserTokenI) {
    createLessonDto.fileVideo = fileVideo;
    return this.lessonService.create(createLessonDto, user.id);
  }

  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @Patch(':id')
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @User() user: UserTokenI) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  remove(@Param('id') id: string, @User() user: UserTokenI) {
    return this.lessonService.remove(+id);
  }
}
