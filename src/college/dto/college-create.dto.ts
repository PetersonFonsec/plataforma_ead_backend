import { IsNotEmpty, IsOptional } from "class-validator"

export class collegeCreateDTO {
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsNotEmpty()
    thumb: string

    @IsOptional()
    @IsNotEmpty()
    primaryColor: string

    @IsOptional()
    @IsNotEmpty()
    secundaryColor: string
} 