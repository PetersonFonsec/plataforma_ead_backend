import { IsString, IsStrongPassword, IsEmail } from 'class-validator';

const rulesPassword = {
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

    @IsStrongPassword(rulesPassword)
    password: string;

    @IsStrongPassword(rulesPassword)
    confirmPassword: string;
}