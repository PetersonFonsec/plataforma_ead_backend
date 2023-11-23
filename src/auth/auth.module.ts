import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
    controllers: [AuthController],
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET
    })],
})
export class AuthModule {

}