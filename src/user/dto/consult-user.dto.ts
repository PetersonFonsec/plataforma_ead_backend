import { IsEmail, IsNumber } from "class-validator";

export class ConsultUserDTO {
    @IsEmail()
    email: string;

    @IsNumber()
    Id: string;
}

export class ConsultUserResponse {
    name: string;
    email: string;
    id: number;
    role: any;
}