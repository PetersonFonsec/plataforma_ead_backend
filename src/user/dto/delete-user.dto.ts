import { IsEmail, IsNumber } from "class-validator";

export class DeleteUserDTO {
    @IsEmail()
    email: string;

    @IsNumber()
    Id: string;
}