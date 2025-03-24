import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const serverEnv = {
  API_URL: z.string().url(),
};

const clientEnv = {
  NEXT_PUBLIC_API_URL: z.string().url(),
};

export const env = createEnv({
  server: serverEnv,
  client: clientEnv,
  runtimeEnv: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
