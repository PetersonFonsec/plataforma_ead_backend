import { Controller, Get } from '@nestjs/common';
import { CollegeService } from './college.service';

@Controller()
export class CollegeController {
    constructor(private readonly collegeService: CollegeService) { }

    @Get()
    getHello(): string {
        return this.collegeService.getHello();
    }
}
