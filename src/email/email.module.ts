import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailService } from './email.service';
import Mediator from '../shared/events/mediator';

@Module({
  imports: [


  ],
  providers: [EmailService, Mediator],
  exports: [EmailService]
})
export class EmailModule {
}
