import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from "../auth/auth.service";

export const TOKEN_KEY = "token";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const { authorization } = req.headers;

        try {
            const token = authorization.split(" ")[1];

            const isValid = this.authService.checkToken(token);
            if (!isValid) return false;

            req[TOKEN_KEY] = this.authService.decodeToken(token);
            return true
        } catch (error) {
            return false
        }
    }

}