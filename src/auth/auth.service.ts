import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { PrismaService } from "src/prisma/prisma.service"
import { AuthLoginDTO } from "./dto/authLogin.dto"
import { AuthForgetDTO } from "./dto/authForget.dto";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/authRegister.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async createToken(user) {
        const access_token = this.jwtService.sign(user, {
            expiresIn: process.env.EXPIRES_IN,
            subject: user.id.toString()
        });

        return { access_token }
    }

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async login({ password, email }: AuthLoginDTO) {
        const user = await this.userService.validPassword(password, email);
        const { access_token } = await this.createToken(user);
        return { email, name: user.name, access_token, id: user.id, };
    }

    async register({ email, password, name }: AuthRegisterDTO) {
        const user = await this.userService.createUser({ email, password, name });
        const { access_token } = await this.createToken(user);
        return { email, name, access_token, id: user.id, };
    }

    async forgetPassword({ email }: AuthForgetDTO): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException(`Email não encontrado`);

        const token = this.createToken(user);
        //TODO colocar lógica para mandar email com um token valido

        return true
    }
}