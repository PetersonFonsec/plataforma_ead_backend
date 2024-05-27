import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import Mediator from '../shared/events/mediator';

@Module({
  imports: [PrismaModule,
    forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, Mediator],
  exports: [UserService]
})
export class UserModule { }
