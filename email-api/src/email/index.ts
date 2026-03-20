import { getEmailProvider } from './types.js';
import type { SendContactEmailPayload } from './types.js';
import { smtpProvider } from './smtp.js';
import { mailgunProvider } from './mailgun.js';

function getProvider() {
  const provider = getEmailProvider();
  return provider === 'smtp' ? smtpProvider : mailgunProvider;
}

export async function sendContactEmail(payload: SendContactEmailPayload) {
  const provider = getProvider();
  return provider.sendContactEmail(payload);
}
