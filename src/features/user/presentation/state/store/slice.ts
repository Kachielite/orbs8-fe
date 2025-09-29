import { UserSlice } from '@/features/user/presentation/state/store/types';
import { StateCreator } from 'zustand/vanilla';
import { initialUserState } from '@/features/user/presentation/state/store/state';
import { createUserActions } from '@/features/user/presentation/state/store/actions';

export const createUserSlice: StateCreator<UserSlice> = (set, get, store) => ({
  ...initialUserState,
  ...(createUserActions(set, get, store) as UserSlice),
});
