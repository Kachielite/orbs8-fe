import {create} from 'zustand/react';
import {persist} from 'zustand/middleware';
import {createAuthSlice} from "@/features/authentication/presentation/state/store/slice";
import {AuthSlice} from "@/features/authentication/presentation/state/store/types";

type AppState = AuthSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'auth-data', // unique name
      partialize: state => ({
        auth: state.auth,
      }), // only persist the auth field
    }
  )
);