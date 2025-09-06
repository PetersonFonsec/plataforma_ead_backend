import { Module } from '@nestjs/common';

import { PaginationService } from '../shared/services/pagination/pagination.service';
import Mediator from '../shared/events/mediator';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [Mediator, PaginationService],
  exports: [Mediator, PaginationService],
})
export class SharedModule { }
