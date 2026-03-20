import nodemailer from 'nodemailer';
import type { EmailProvider, SendContactEmailPayload } from './types';

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

  console.log('[smtp] Configuração:', {
    host,
    port,
    secure,
    user,
    passLength: pass?.length ?? 0,
  });

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

    try {
      console.log('[smtp] Criando transporter...');
      const transporter = createTransporter();
      const mailOptions = {
        from: `${fromName} <${fromEmail}>`,
        to: recipient,
        subject,
        text,
      };
      console.log('[smtp] Enviando e-mail:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      });
      await transporter.sendMail(mailOptions);
      console.log('[smtp] E-mail enviado com sucesso');
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : 'Erro desconhecido ao enviar e-mail';
      const errObj = err as { code?: string; command?: string; response?: string };
      console.error('[smtp] Erro ao enviar:', {
        message: rawMessage,
        code: errObj.code,
        command: errObj.command,
        response: errObj.response,
      });

      const lower = rawMessage.toLowerCase();
      if (
        lower.includes('invalid login') ||
        lower.includes('authentication failed') ||
        errObj.response?.toLowerCase().includes('535')
      ) {
        throw new Error(
          'Credenciais SMTP inválidas. Para Mailgun SMTP use a senha SMTP (não a API key). Verifique em Mailgun: Sending > Domain settings > SMTP credentials.'
        );
      }
      if (lower.includes('econnrefused') || lower.includes('connection refused') || errObj.code === 'ECONNREFUSED') {
        throw new Error('Não foi possível conectar ao servidor SMTP. Verifique SMTP_HOST e SMTP_PORT.');
      }
      if (lower.includes('self signed certificate') || errObj.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
        throw new Error('Erro de certificado SSL. Tente SMTP_SECURE=false para porta 587.');
      }
      throw new Error(rawMessage);
    }
  },
};
