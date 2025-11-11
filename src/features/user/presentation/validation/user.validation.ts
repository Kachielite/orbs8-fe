import {z} from 'zod';

export const updateUserSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    currencyCode: z.string().min(1, {message: 'Currency code is required'}),
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

export const updatePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, {message: 'Current password is required'}),
    newPassword: z.string().min(1, {message: 'New password is required'}),
});

export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
