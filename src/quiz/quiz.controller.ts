import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guards';
import { RolesWithPermission } from 'src/shared/decorators/role.decorator';
import { Roles } from 'src/shared/enums/role.enum';

@Controller('quiz')
@UseGuards(AuthGuard, RolesGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  @RolesWithPermission([Roles.DIRECTOR, Roles.TEACHER])
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
