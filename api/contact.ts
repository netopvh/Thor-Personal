import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactEmail } from '../src/services/email';
import type { SendContactEmailPayload } from '../src/services/email';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(payload: unknown): SendContactEmailPayload {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload');
  }

  const { nome, email, telefone, mensagem } = payload as Record<string, unknown>;

  if (typeof nome !== 'string' || nome.trim().length < 2) throw new Error('Invalid nome');
  if (typeof email !== 'string' || !validateEmail(email)) throw new Error('Invalid email');
  if (typeof telefone !== 'string' || telefone.trim().length < 8) throw new Error('Invalid telefone');
  if (typeof mensagem !== 'string' || mensagem.trim().length < 3) throw new Error('Invalid mensagem');

  return {
    nome: nome.trim(),
    email: email.trim(),
    telefone: telefone.trim(),
    mensagem: mensagem.trim(),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const payload = validatePayload(body);
    await sendContactEmail(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    const isValidationError = message.startsWith('Invalid ');
    return res.status(isValidationError ? 400 : 500).json({ ok: false, error: message });
  }
}
