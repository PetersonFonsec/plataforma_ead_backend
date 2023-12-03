import { IsNotEmpty, IsOptional } from "class-validator"

export class collegeDeleteDTO {
    @IsNotEmpty()
    name: string

    @IsOptional()
    thumb?: String

    @IsOptional()
    primaryColor?: String

    @IsOptional()
    secundaryColor?: String
} 