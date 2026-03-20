import formData from 'form-data';
import Mailgun from 'mailgun.js';
import type { EmailProvider, SendContactEmailPayload } from './types.js';

function getRequiredEnv(name: string, fallbackName?: string) {
  const value = process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined);
  if (!value) {
    const hint = fallbackName ? ` ou ${fallbackName}` : '';
    throw new Error(`Missing required environment variable: ${name}${hint}`);
  }
  return value;
}

function getMailgunBaseUrl() {
  const useEu = process.env.MAILGUN_EU === 'true' || process.env.MAILGUN_EU === '1';
  return useEu ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net';
}

export const mailgunProvider: EmailProvider = {
  async sendContactEmail(payload: SendContactEmailPayload) {
    const fromName = getRequiredEnv('EMAIL_FROM_NAME', 'MAILGUN_FROM_NAME');
    const fromEmail = getRequiredEnv('EMAIL_FROM_EMAIL', 'MAILGUN_FROM_EMAIL');
    const recipient = getRequiredEnv('EMAIL_CONTACT_RECIPIENT', 'MAILGUN_CONTACT_RECIPIENT');

    const subject = `Novo contato - ${payload.nome}`;
    const text = [
      `Nome: ${payload.nome}`,
      `Email: ${payload.email}`,
      `Telefone: ${payload.telefone}`,
      '',
      'Mensagem:',
      payload.mensagem,
    ].join('\n');

    const client = new Mailgun(formData).client({
      username: 'api',
      key: getRequiredEnv('MAILGUN_API_KEY'),
      url: getMailgunBaseUrl(),
    });

    const domain = getRequiredEnv('MAILGUN_DOMAIN');
    await client.messages.create(domain, {
      from: `${fromName} <${fromEmail}>`,
      to: recipient,
      subject,
      text,
    });
  },
};
