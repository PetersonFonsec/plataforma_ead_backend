import { IsNotEmpty, IsOptional } from "class-validator"

export class collegeUpdateDTO {
    @IsNotEmpty()
    name: string

    @IsOptional()
    thumb?: String

    @IsOptional()
    primaryColor?: String

    @IsOptional()
    secundaryColor?: String
} 