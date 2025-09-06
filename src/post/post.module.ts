import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';
import { PostService } from './post.service';
import { PostConsultService } from './post-consult.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => SharedModule),
  ],
  controllers: [PostController],
  providers: [PostService, PostConsultService],
})
export class PostModule { }
