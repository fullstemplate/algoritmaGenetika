import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema.tsx',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DB_AUTH_URL!,
    authToken: process.env.DB_AUTH_TOKEN!,
  },
});