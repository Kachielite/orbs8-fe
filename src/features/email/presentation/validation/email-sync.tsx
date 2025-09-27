import {z} from "zod";

export const getOauthToken = z.object({
    code: z.string().min(1, { message: 'Code is required' }),
})