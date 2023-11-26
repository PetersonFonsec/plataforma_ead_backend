import { IsEmail, IsStrongPassword } from "class-validator";
import { rulesPassword } from "src/user/dto/create-user.dto";

export class AuthForgetDTO {
    @IsEmail()
    email: string;
}