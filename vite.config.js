import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const host = env.VITE_DEV_HOST || '0.0.0.0';
  const port = toNumber(env.VITE_DEV_PORT, 3000);

  return {
    plugins: [react()],
    server: {
      host,
      port,
      strictPort: true,
    },
    preview: {
      host,
      port,
      strictPort: true,
    },
  };
});
