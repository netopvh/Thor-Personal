# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Envio de e-mails (formulário de contato)

O formulário de contato em `src/sections/Contact.tsx` envia uma requisição `POST` para `POST /api/contact`. O envio pode ser feito por **SMTP** ou **API Mailgun**, configurado via `EMAIL_PROVIDER`.

### Variáveis de ambiente

Copie `.env.example` para `.env` e configure:

- `EMAIL_PROVIDER` — `smtp` ou `mailgun`
- `EMAIL_FROM_NAME`, `EMAIL_FROM_EMAIL`, `EMAIL_CONTACT_RECIPIENT` — compartilhadas

Para **SMTP**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` (opcional)

Para **Mailgun**: `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_EU` (opcional, para região EU)

### Como executar

Em desenvolvimento (SPA + API com HMR):

```bash
pnpm dev
```

Em produção (após build):

```bash
pnpm build
NODE_ENV=production pnpm server
```

### Deploy na Vercel

O projeto está configurado para Vercel. Após o deploy, configure as variáveis de ambiente no dashboard (Settings > Environment Variables): `EMAIL_PROVIDER`, `EMAIL_FROM_NAME`, `EMAIL_FROM_EMAIL`, `EMAIL_CONTACT_RECIPIENT` e as variáveis do provedor escolhido (SMTP ou Mailgun).

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
