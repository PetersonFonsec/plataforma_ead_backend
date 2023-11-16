import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { CollegeModule } from './college/college.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    PrismaModule,
    CalendarModule,
    CollegeModule,
    CourseModule,
    PostModule,
    TaskModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
