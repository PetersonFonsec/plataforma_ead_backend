import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthRegisterDTO } from "./dto/authRegister.dto";
import { AuthForgetDTO } from "./dto/authForget.dto";
import { UserService } from "../user/user.service";
import { AuthLoginDTO } from "./dto/authLogin.dto";
import Mediator from "../shared/events/mediator";
import { Events } from "../shared/events/events";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mediator: Mediator
  ) { }

  async createToken(user) {
    delete user.password;

    const access_token = this.jwtService.sign(user, {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString()
    });

    return { access_token }
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  decodeToken(token: string) {
    try {
      return this.jwtService.decode(token)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async login({ password, email }: AuthLoginDTO) {
    const user = await this.userService.validPassword(password, email);
    const { access_token } = await this.createToken(user);
    const all = await this.userService.me(user.id);
    return { user, ...all, access_token };
  }

  async register(payload: AuthRegisterDTO) {
    const user = await this.userService.createUser(payload, true);
    const { access_token } = await this.createToken(user);
    const all = await this.userService.me(user.id);
    return { user, ...all, access_token }
  }

  async forgetPassword({ email }: AuthForgetDTO): Promise<any> {
    const user = await this.userService.find({ email });
    const token = this.createToken(user);

    return this.mediator.publish(Events.forgetPassword, token);
  }
}
