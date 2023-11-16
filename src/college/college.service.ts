import { Injectable } from '@nestjs/common';

@Injectable()
export class CollegeService {
    getHello(): string {
        return 'Hello World!';
    }
}
