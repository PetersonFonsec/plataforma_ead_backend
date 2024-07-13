import { IsString, IsNumber, IsArray, MaxLength, IsBoolean, MinLength, IsOptional, Min, min, minLength } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  name: string;

  @IsNumber()
  courseId: number;

  @IsArray()
  quizOptions: CreateQuizOptionsDto[];
}

export class CreateQuizOptionsDto {
  @IsString()
  title: string;

  @IsBoolean()
  correctOptions: boolean;

  @IsOptional()
  quizId: number;
}
