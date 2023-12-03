import { PartialType } from "@nestjs/mapped-types";

import { CreateUserDTO } from "../../user/dto/create-user.dto";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Roles } from "src/shared/enums/role.enum";

export class RegisterStudiantDTO {
    @IsNotEmpty()
    collegeId: number

    @IsEmail()
    email: string;

    @IsString()
    documentNumber: string;

    @IsEnum(Roles)
    role: Roles = Roles.STUDENT;
} 