import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CdnModule } from '../cdn/cdn.module';
import Mediator from 'src/shared/events/mediator';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => CdnModule),
  ],
  controllers: [QuizController],
  providers: [QuizService, Mediator],
})
export class QuizModule { }
