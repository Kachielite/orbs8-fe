import { AuthEntity } from '@/features/authentication/domain/entity/auth.entity';
import { AuthSlice } from '@/features/authentication/presentation/state/store/types';

import type { StateCreator } from 'zustand/vanilla';

export const createAuthActions: StateCreator<
  AuthSlice,
  [],
  [],
  Pick<AuthSlice, 'setAuth'>
> = set => ({
  auth: null,
  setAuth: (auth: AuthEntity | null) => set({ auth }),
});
