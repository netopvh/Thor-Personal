import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { sendContactEmail } from './email/index.js';

type ContactPayload = {
  nome?: unknown;
  email?: unknown;
  telefone?: unknown;
  mensagem?: unknown;
};

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(payload: unknown): {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
} {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload');
  }

  const { nome, email, telefone, mensagem } = payload as ContactPayload;

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

app.post('/api/contact', async (req, res) => {
  try {
    const payload = validatePayload(req.body);
    await sendContactEmail(payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    const isValidationError = message.startsWith('Invalid ');
    return res.status(isValidationError ? 400 : 500).json({ ok: false, error: message });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`[email-api] Listening on ${host}:${port}`);
});
