import { Module } from '@nestjs/common';

import { CollegeController } from './college.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CollegeService } from './college.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  exports: [CollegeService],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule { }
