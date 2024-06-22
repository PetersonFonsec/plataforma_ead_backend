import { Module, forwardRef } from '@nestjs/common';

import { CollegeModule } from '../college/college.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { AuthModule } from '../auth/auth.module';
import { CdnModule } from '../cdn/cdn.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => CollegeModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CdnModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule { }
