import { Module } from '@nestjs/common';

import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';

@Module({
    imports: [],
    controllers: [CollegeController],
    providers: [CollegeService],
})
export class CollegeModule { }
