import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import { createAuthSlice } from '@/features/authentication/presentation/state/store/slice';
import { AuthSlice } from '@/features/authentication/presentation/state/store/types';
import { UserSlice } from '@/features/user/presentation/state/store/types';
import { createUserSlice } from '@/features/user/presentation/state/store/slice';

type AppState = AuthSlice & UserSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUserSlice(...a),
    }),
    {
      name: 'auth-data', // unique name
      partialize: state => ({
        auth: state.auth,
      }), // only persist the auth field
    }
  )
);
