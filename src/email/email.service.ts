import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


import { Events } from '../shared/events/events';
import Mediator from '../shared/events/mediator';

@Injectable()
export class EmailService {

  constructor(
    private mailer: MailerService,
    private mediator: Mediator,
  ) { }

  onEvents() {
    this.mediator.on(Events.createdNewUser, async (user) => {
      await this.wellcome(user)
    });

    this.mediator.on(Events.forgetPassword, async (user) => {
      await this.recoveryPassword(user)
    });

    this.mediator.on(Events.registerUser, async (user) => {
      await this.registerUser(user)
    });
  }

  async recoveryPassword({ token, name, email }: any) {
    await this.mailer.sendMail({
      subject: `${name} Esqueceu sua senha? crie outra !!`,
      template: 'recovery-password',
      context: { token, name },
      to: email,
    });
  }

  async wellcome({ name, email }: any) {
    await this.mailer.sendMail({
      subject: `${name} Seja bem vindo !!`,
      template: 'wellcome',
      context: { name },
      to: email,
    });
  }

  async registerUser({ name, email }: any) {
    await this.mailer.sendMail({
      subject: `${name} Seja bem vindo !!`,
      template: 'register-user',
      context: { name },
      to: email,
    });
  }
}
