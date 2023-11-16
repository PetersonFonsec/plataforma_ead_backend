import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller()
export class CourseController {
    constructor(private readonly userService: CourseService) { }

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }
}
