import { forwardRef, Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { HttpModule } from '@nestjs/axios';
import { CdnModule } from 'src/cdn/cdn.module';

@Module({
  imports: [HttpModule,
    forwardRef(() => CdnModule)
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule { }
