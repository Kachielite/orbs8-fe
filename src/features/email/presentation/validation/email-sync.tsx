import { z } from 'zod';

export const getOauthToken = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
});

export type GetOauthTokenSchemaType = z.infer<typeof getOauthToken>;
