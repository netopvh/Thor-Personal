import 'dotenv/config';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { sendContactEmail } from '../src/services/email';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ContactPayload = Parameters<typeof sendContactEmail>[0];

const app = express();

app.use(express.json({ limit: '1mb' }));

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(payload: any): ContactPayload {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload');
  }

  const { nome, email, telefone, mensagem } = payload as Partial<ContactPayload>;

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
    console.log('[api/contact] Recebendo requisição');
    const payload = validatePayload(req.body);
    console.log('[api/contact] Payload validado:', { nome: payload.nome, email: payload.email });
    await sendContactEmail(payload);
    console.log('[api/contact] E-mail enviado com sucesso');
    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    const isValidationError = message.startsWith('Invalid ');
    if (!isValidationError) {
      console.error('[api/contact] Erro:', message);
      if (err instanceof Error && err.stack) {
        console.error('[api/contact] Stack:', err.stack);
      }
      if (err && typeof err === 'object' && 'code' in err) {
        console.error('[api/contact] Código do erro:', (err as { code?: string }).code);
      }
    }
    return res.status(isValidationError ? 400 : 500).json({ ok: false, error: message });
  }
});

async function start() {
  const port = Number(process.env.PORT || 5173);
  const isProd = process.env.NODE_ENV === 'production';

  const distDir = path.resolve(__dirname, '../dist');
  const indexHtml = path.join(distDir, 'index.html');

  // Dev: usa Vite middlewares para servir SPA com HMR
  if (!isProd) {
    const viteServer = await createViteServer({
      root: path.resolve(__dirname, '../'),
      server: {
        middlewareMode: true,
        watch: { usePolling: true },
      },
      appType: 'spa',
    });

    app.use(viteServer.middlewares);
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`[server] Dev listening on :${port}`);
    });

    return;
  }

  // Prod: serve dist buildado
  app.use(express.static(distDir));

  app.get('*', (_req, res) => {
    res.sendFile(indexHtml, (err) => {
      if (err) res.status(500).end();
    });
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] Prod listening on :${port}`);
  });
}

start();

