import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePasswordDTO extends PartialType(CreateUserDTO) {
    @IsNotEmpty()
    current_password: String
}