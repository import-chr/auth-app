import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { envs } from 'src/config';
import { EmailInterface } from './interfaces';

@Injectable()
export class EmailsService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(envs.RESEND_API_KEY);
  }

  async sendEmail({ to, subject, html }: EmailInterface) {
    try {
      return await this.resend.emails.send({
        from: `Authys <${envs.RESEND_FROM_EMAIL}>`,
        to,
        subject,
        html,
      });
    } catch {
      throw new BadRequestException('There was an error.');
    }
  }

  async sendBatchEmail(emails: EmailInterface[]) {
    return await this.resend.batch.send(
      emails.map(({ to, subject, html }) => ({
        from: `Authys <${envs.RESEND_FROM_EMAIL}>`,
        to,
        subject,
        html,
      })),
    );
  }
}
