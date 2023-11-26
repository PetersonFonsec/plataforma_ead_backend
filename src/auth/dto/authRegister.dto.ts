import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { rulesPassword } from "src/user/dto/create-user.dto";

export class AuthRegisterDTO {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsStrongPassword(rulesPassword)
    password: string;
    @IsStrongPassword(rulesPassword)
    confirm_password: string;
}