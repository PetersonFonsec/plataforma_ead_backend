import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import Mediator from '../shared/events/mediator';
import { AuthModule } from '../auth/auth.module';
import { CdnModule } from '../cdn/cdn.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CdnModule),

  ],
  controllers: [UserController],
  providers: [UserService, Mediator],
  exports: [UserService]
})
export class UserModule { }
