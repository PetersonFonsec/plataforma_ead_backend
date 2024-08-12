import { forwardRef, Module } from '@nestjs/common';

import { LessonController } from './lesson.controller';
import { AuthModule } from 'src/auth/auth.module';
import { LessonService } from './lesson.service';
import { CdnModule } from 'src/cdn/cdn.module';

@Module({
  imports: [
    forwardRef(() => LessonModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CdnModule),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule { }
