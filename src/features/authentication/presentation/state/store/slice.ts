import { StateCreator } from 'zustand/vanilla';

import { createAuthActions } from '@/features/authentication/presentation/state/store/actions';
import { initialAuthState } from '@/features/authentication/presentation/state/store/state';
import { AuthSlice } from '@/features/authentication/presentation/state/store/types';

export const createAuthSlice: StateCreator<AuthSlice> = (set, get, store) => ({
  ...initialAuthState,
  ...(createAuthActions(set, get, store) as AuthSlice),
});
