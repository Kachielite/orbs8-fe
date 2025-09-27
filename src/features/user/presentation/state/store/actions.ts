import { StateCreator } from 'zustand/vanilla';
import { UserSlice } from '@/features/user/presentation/state/store/types';

export const createUserActions: StateCreator<
  UserSlice,
  [],
  [],
  Pick<UserSlice, 'setUser'>
> = set => ({
  setUser: user => set({ user }),
});
