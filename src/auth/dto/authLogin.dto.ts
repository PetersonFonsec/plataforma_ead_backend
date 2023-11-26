import { IsEmail, IsStrongPassword } from "class-validator";
import { rulesPassword } from "src/user/dto/create-user.dto";

export class AuthLoginDTO {
    @IsEmail()
    email: string;

    @IsStrongPassword(rulesPassword)
    password: string;
}