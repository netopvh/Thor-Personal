export type SendContactEmailPayload = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export interface EmailProvider {
  sendContactEmail(payload: SendContactEmailPayload): Promise<void>;
}

export type EmailProviderType = 'smtp' | 'mailgun';

export function getEmailProvider(): EmailProviderType {
  const value = process.env.EMAIL_PROVIDER?.toLowerCase();
  if (value === 'smtp' || value === 'mailgun') {
    return value;
  }
  throw new Error(
    'EMAIL_PROVIDER deve ser "smtp" ou "mailgun". Exemplo: EMAIL_PROVIDER=mailgun'
  );
}
