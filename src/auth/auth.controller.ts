import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { User } from "../shared/decorators/user.decorator";
import { AuthRegisterDTO } from "./dto/authRegister.dto";
import { AuthForgetDTO } from "./dto/authForget.dto";
import { AuthLoginDTO } from "./dto/authLogin.dto";
import { AuthService } from "./auth.service";
import { Roles } from "../shared/enums/role.enum";
import { AuthGuard } from "./auth.guard";
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body)
    }

    @Post("register/director")
    async registerDirector(@Body() body: AuthRegisterDTO) {
        body.role = Roles.DIRECTOR;
        return this.authService.register(body);
    }

    @Post("forget")
    async forget(@Body() body: AuthForgetDTO) {
        return this.authService.forgetPassword(body);
    }

    @Post("token")
    @UseGuards(AuthGuard)
    async validToken(@User() user) {
        return user
    }

}