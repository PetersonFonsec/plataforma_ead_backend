import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  @IsString()
  urlContent: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsOptional()
  fileVideo: any;
}
