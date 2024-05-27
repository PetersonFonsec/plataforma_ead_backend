import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import Mediator from "../shared/events/mediator";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, Mediator],
  imports: [
    forwardRef(() => UserModule),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
  ],
  exports: [AuthService]
})
export class AuthModule { }
