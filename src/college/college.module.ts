import { Module } from '@nestjs/common';

import { CollegeController } from './college.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CollegeService } from './college.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    exports: [CollegeService],
    controllers: [CollegeController],
    providers: [CollegeService],
})
export class CollegeModule { }
