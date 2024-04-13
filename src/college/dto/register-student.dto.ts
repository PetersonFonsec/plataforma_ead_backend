import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../../shared/enums/role.enum";

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
