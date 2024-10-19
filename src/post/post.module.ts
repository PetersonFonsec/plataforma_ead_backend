import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';
import Mediator from '../shared/events/mediator';
import { PostService } from './post.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PostController],
  providers: [PostService, Mediator],
})
export class PostModule { }
