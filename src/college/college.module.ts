import { Module, forwardRef } from '@nestjs/common';

import { CollegeController } from './college.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CollegeService } from './college.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CdnModule } from '../cdn/cdn.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => CdnModule),
  ],
  exports: [CollegeService],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule { }
