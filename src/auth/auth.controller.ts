import { Body, Controller, Post } from "@nestjs/common";

import { AuthRegisterDTO } from "./dto/authRegister.dto";
import { AuthForgetDTO } from "./dto/authForget.dto";
import { AuthLoginDTO } from "./dto/authLogin.dto";
import { Roles } from "../shared/enums/role.enum";
import { AuthService } from "./auth.service";
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

  @Post("register/student")
  async registerStudent(@Body() body: AuthRegisterDTO) {
    body.role = Roles.STUDENT;
    return this.authService.register(body);
  }

  @Post("register/teacher")
  async registerTeacher(@Body() body: AuthRegisterDTO) {
    body.role = Roles.TEACHER;
    return this.authService.register(body);
  }

  @Post("forget")
  async forget(@Body() body: AuthForgetDTO) {
    return this.authService.forgetPassword(body);
  }
}
