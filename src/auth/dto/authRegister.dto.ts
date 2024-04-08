import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Roles } from "../../shared/enums/role.enum";
import { rulesPassword } from "../../user/dto/create-user.dto";

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