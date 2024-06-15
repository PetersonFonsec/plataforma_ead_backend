import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { CollegeModule } from './college/college.module';
import { CalendarModule } from './calendar/calendar.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { email_config } from './email/mail.config';
import { CdnModule } from './cdn/cdn.module';
import Mediator from './shared/events/mediator';

@Module({
  imports: [
    PrismaModule,
    CalendarModule,
    CollegeModule,
    CourseModule,
    PostModule,
    TaskModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => CdnModule),
    ConfigModule.forRoot(),
    MailerModule.forRoot(email_config),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Mediator
  ],
})
export class AppModule { }
