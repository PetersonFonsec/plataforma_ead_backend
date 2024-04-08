import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { PrismaService } from "../prisma/prisma.service"
import { AuthLoginDTO } from "./dto/authLogin.dto"
import { AuthForgetDTO } from "./dto/authForget.dto";
import { UserService } from "../user/user.service";
import { AuthRegisterDTO } from "./dto/authRegister.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
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
        return { email, name: user.name, access_token, id: user.id, };
    }

    async register(payload: AuthRegisterDTO) {
        const user = await this.userService.createUser(payload, true);
        const { access_token } = await this.createToken(user);
        return { email: user.email, name: user.name, access_token, id: user.id, };
    }

    async forgetPassword({ email }: AuthForgetDTO): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException(`Email não encontrado`);

        const token = this.createToken(user);
        //TODO colocar lógica para mandar email com um token valido

        return true
    }
}