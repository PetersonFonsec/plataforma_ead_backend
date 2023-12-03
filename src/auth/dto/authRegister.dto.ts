import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Roles } from "src/shared/enums/role.enum";
import { rulesPassword } from "src/user/dto/create-user.dto";

export class AuthRegisterDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    documentNumber: string;

    @IsOptional()
    role: Roles;

    @IsStrongPassword(rulesPassword)
    password: string;
}