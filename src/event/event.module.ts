
import { forwardRef, Module } from '@nestjs/common';

import { EventController } from './event.controller';
import { AuthModule } from '../auth/auth.module';
import { EventService } from './event.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule { }
