import { Body, Controller, Post } from "@nestjs/common";

import { AuthRegisterDTO } from "./dto/authRegister.dto";
import { AuthForgetDTO } from "./dto/authForget.dto";
import { AuthLoginDTO } from "./dto/authLogin.dto";

@Controller("auth")
export class AuthController {

    @Post("login")
    async login(@Body() body: AuthLoginDTO) { }

    @Post("register")
    async register(@Body() body: AuthRegisterDTO) { }

    @Post("forget")
    async forget(@Body() body: AuthForgetDTO) { }

}