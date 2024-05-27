import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { EmailService } from './email.service';
import Mediator from '../shared/events/mediator';

describe('EmailService', () => {
  let service: EmailService;
  let mailMock;

  beforeEach(async () => {
    mailMock = {
      sendMail: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Mediator,
        EmailService,
        { provide: MailerService, useValue: mailMock },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
