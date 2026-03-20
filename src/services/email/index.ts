import { getEmailProvider } from './types';
import type { SendContactEmailPayload } from './types';
import { smtpProvider } from './smtp';
import { mailgunProvider } from './mailgun';

function getProvider() {
  const provider = getEmailProvider();
  return provider === 'smtp' ? smtpProvider : mailgunProvider;
}

export type { SendContactEmailPayload } from './types';

export async function sendContactEmail(payload: SendContactEmailPayload) {
  const provider = getProvider();
  console.log('[email] Provedor ativo:', provider);
  return provider.sendContactEmail(payload);
}
