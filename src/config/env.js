const requiredEnv = ['VITE_APP_NAME', 'VITE_APP_ENV', 'VITE_API_BASE_URL'];

const missingEnv = requiredEnv.filter((key) => !import.meta.env[key]);

if (missingEnv.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}

export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  appEnv: import.meta.env.VITE_APP_ENV,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  enableMocks: import.meta.env.VITE_ENABLE_MOCKS === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
