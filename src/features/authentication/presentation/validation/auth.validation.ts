import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 6 characters' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email().min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm Password must be at least 8 characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormSchemaType = z.infer<typeof registerSchema>;
export type RegisterSchemaType = Omit<
  RegisterFormSchemaType,
  'confirmPassword'
>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: 'Refresh token is required' }),
});
export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;

export const loginWithGoogleSchema = z.object({
  idToken: z.string().min(1, { message: 'Token is required' }),
});
export type LoginWithGoogleSchemaType = z.infer<typeof loginWithGoogleSchema>;

export const requestPasswordResetSchema = z.object({
  email: z.email().min(1, { message: 'Email is required' }),
});
export type RequestPasswordResetSchemaType = z.infer<
  typeof requestPasswordResetSchema
>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password must be at least 6 characters' }),
    token: z.string().min(1, { message: 'Token is required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export type ResetPasswordFormSchemaType = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordSchemaType = Omit<
  ResetPasswordFormSchemaType,
  'confirmPassword'
>;

export const verifyPasswordResetTokenSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
  email: z.email().min(1, { message: 'Email is required' }),
});
export type VerifyPasswordResetTokenSchemaType = z.infer<
  typeof verifyPasswordResetTokenSchema
>;
