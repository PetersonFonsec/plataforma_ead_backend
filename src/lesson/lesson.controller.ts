import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/utils/storage';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post()
  @UseInterceptors(FileInterceptor('fileVideo', storage('lesson')))
  create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() fileVideo) {
    createLessonDto.fileVideo = fileVideo;
    return this.lessonService.create(createLessonDto);
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
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
