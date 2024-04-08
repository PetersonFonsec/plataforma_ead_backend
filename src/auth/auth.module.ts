import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
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
