import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  collegeId: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}
