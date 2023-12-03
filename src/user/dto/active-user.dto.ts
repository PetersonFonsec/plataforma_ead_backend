import { IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class ActiveUserDTO {
    @IsNumber()
    id: number;
}