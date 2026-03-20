import nodemailer from 'nodemailer';
import type { EmailProvider, SendContactEmailPayload } from './types.js';

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function createTransporter() {
  const host = getRequiredEnv('SMTP_HOST');
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1';
  const user = getRequiredEnv('SMTP_USER');
  const pass = getRequiredEnv('SMTP_PASS');

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export const smtpProvider: EmailProvider = {
  async sendContactEmail(payload: SendContactEmailPayload) {
    const fromName = getRequiredEnv('EMAIL_FROM_NAME');
    const fromEmail = getRequiredEnv('EMAIL_FROM_EMAIL');
    const recipient = getRequiredEnv('EMAIL_CONTACT_RECIPIENT');

    const subject = `Novo contato - ${payload.nome}`;
    const text = [
      `Nome: ${payload.nome}`,
      `Email: ${payload.email}`,
      `Telefone: ${payload.telefone}`,
      '',
      'Mensagem:',
      payload.mensagem,
    ].join('\n');

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: recipient,
      subject,
      text,
    });
  },
};
