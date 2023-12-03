import { IsEmail, IsNumber, IsOptional } from "class-validator";

export class ConsultUserDTO {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsNumber()
    documentNumber?: string;
}

export class ConsultUserResponse {
    name: string;
    email: string;
    id: number;
    role: any;
}