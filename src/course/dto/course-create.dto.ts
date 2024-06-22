import { IsNotEmpty, IsOptional } from "class-validator"

export class courseCreateDTO {
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsNotEmpty()
  thumb: string

  @IsNotEmpty()
  collegeId: number
}
