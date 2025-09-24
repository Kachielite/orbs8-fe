import { AuthSlice } from '@/features/authentication/presentation/state/store/types';

export const initialAuthState: Pick<AuthSlice, 'auth'> = {
  auth: null,
};
