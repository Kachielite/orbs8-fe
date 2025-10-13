import { z } from 'zod';

export const getOauthToken = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
});

export type GetOauthTokenSchemaType = z.infer<typeof getOauthToken>;

export const manualSyncRequest = z.object({
  labelName: z.string().min(1, { message: 'Label name is required' }),
});

export type ManualSyncRequestSchemaType = z.infer<typeof manualSyncRequest>;

export const verifyEmailLabelSchema = z.object({
  labelName: z.string().min(1, { message: 'Label name is required' }),
});

export type VerifyEmailLabelSchemaType = z.infer<typeof verifyEmailLabelSchema>;

export const syncEmailSchema = z.object({
  title: z.string(),
  description: z.string(),
  progress: z.number().optional().nullable(),
});

export type SyncEmailSchemaType = z.infer<typeof syncEmailSchema>;
