import {persist} from 'zustand/middleware';
import {create} from 'zustand/react';

import {createAccountsSlice} from '@/features/accounts/presentation/state/store/slice';
import {AccountsSlice} from '@/features/accounts/presentation/state/store/types';
import {createAuthSlice} from '@/features/authentication/presentation/state/store/slice';
import {AuthSlice} from '@/features/authentication/presentation/state/store/types';
import {createEmailSlice} from '@/features/email/presentation/state/store/slice';
import {EmailSlice} from '@/features/email/presentation/state/store/type';
import {createTransactionSlice} from "@/features/transactions/presentation/state/store/slice";
import {TransactionSlice} from "@/features/transactions/presentation/state/store/types";
import {createUserSlice} from '@/features/user/presentation/state/store/slice';
import {UserSlice} from '@/features/user/presentation/state/store/types';

type AppState = AuthSlice & UserSlice & EmailSlice & AccountsSlice & TransactionSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUserSlice(...a),
      ...createEmailSlice(...a),
      ...createAccountsSlice(...a),
        ...(createTransactionSlice(...a))
    }),
    {
      name: 'auth-data', // unique name
      partialize: state => ({
        auth: state.auth,
      }), // only persist the auth field
    }
  )
);
