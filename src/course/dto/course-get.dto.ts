import { IsNotEmpty } from "class-validator"

export class courseGetDTO {
  @IsNotEmpty()
  courseId: string
}
