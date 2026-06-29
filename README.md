# HR Dashboard

React + Vite + Tailwind CSS dashboard.

## Environment Configuration

Environment variables are loaded through Vite. Only variables prefixed with `VITE_` are exposed to browser code.

- `.env` contains safe local defaults.
- `.env.development` contains development-mode overrides.
- `.env.production` contains production-mode overrides.
- `.env.example` documents the required variables.
- `.env.local` and `.env.*.local` are ignored and should be used for machine-specific or secret values.

Required variables:

```bash
VITE_APP_NAME="HR Dashboard"
VITE_APP_ENV=local
VITE_API_BASE_URL=/api
VITE_DEV_HOST=0.0.0.0
VITE_DEV_PORT=3000
```

Development and preview both use `VITE_DEV_PORT`. `strictPort` is enabled, so the server fails clearly if the configured port is already used.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```
