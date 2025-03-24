import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().optional().default('development'),
  PORT: z.coerce.number().optional().default(3000),
  MONGO_URI: z.string().optional(),
  SWAGGER_ROUTE: z.string().optional().default('/swagger/docs'),
  I18N_DEFAULT_LOCALE: z.string().optional().default('pt'),
  npm_package_name: z.string().optional(),
  npm_package_description: z.string().optional(),
  npm_package_version: z.string().optional(),
  DB_HOST: z.string().optional(),
  DB_PORT: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASS: z.string().optional(),
  DB_NAME: z.string().optional(),
  SLUG_URL: z.string().optional().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;
