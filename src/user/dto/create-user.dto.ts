import { IsString, IsStrongPassword, IsEmail, IsOptional } from 'class-validator';
import { Roles } from '../../shared/enums/role.enum';

export const rulesPassword = {
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1
}

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    documentNumber: string;

    @IsStrongPassword(rulesPassword)
    password: string;

    @IsOptional()
    role: Roles = Roles.STUDENT;
}