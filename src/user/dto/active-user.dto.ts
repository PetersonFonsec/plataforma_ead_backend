import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class ActiveUserDTO {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    documentNumber: string;

    @IsOptional()
    @IsNumber()
    id: number;

}