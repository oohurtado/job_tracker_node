import type { Transporter } from 'nodemailer';
import { env } from '../../_config/env';

import {
    EmailService,
    SendEmailOptions
} from './email-service';

export class MailtrapService implements EmailService {

    constructor(
        private readonly transporter: Transporter
    ) {}

    async send(options: SendEmailOptions): Promise<void> {

        await this.transporter.sendMail({
            from: env.MAIL_FROM,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text
        });

    }
}