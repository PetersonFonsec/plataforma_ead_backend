import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(jwtService: JwtService) { }

    async createToken() { }

    async checkToken(token: string) { }
}