import {persist} from 'zustand/middleware';
import {create} from 'zustand/react';

import {createAccountsSlice} from '@/features/accounts/presentation/state/store/slice';
import {AccountsSlice} from '@/features/accounts/presentation/state/store/types';
import {createAuthSlice} from '@/features/authentication/presentation/state/store/slice';
import {AuthSlice} from '@/features/authentication/presentation/state/store/types';
import {createBankSlice} from '@/features/bank/presentation/state/store/slice';
import {BankSlice} from '@/features/bank/presentation/state/store/types';
import {createCategorySlice} from '@/features/category/presentation/state/store/slice';
import {CategorySlice} from '@/features/category/presentation/state/store/types';
import {createDashboardSlice} from '@/features/dashboard/presentation/state/store/slice';
import {DashboardSlice} from '@/features/dashboard/presentation/state/store/types';
import {createEmailSlice} from '@/features/email/presentation/state/store/slice';
import {EmailSlice} from '@/features/email/presentation/state/store/type';
import {createNotificationSlice} from "@/features/notification/presentation/state/store/slice";
import {NotificationSlice} from "@/features/notification/presentation/state/store/types";
import {createTransactionSlice} from '@/features/transactions/presentation/state/store/slice';
import {TransactionSlice} from '@/features/transactions/presentation/state/store/types';
import {createUserSlice} from '@/features/user/presentation/state/store/slice';
import {UserSlice} from '@/features/user/presentation/state/store/types';

type AppState = AuthSlice &
  UserSlice &
  EmailSlice &
  AccountsSlice &
  TransactionSlice &
  CategorySlice &
  BankSlice &
    DashboardSlice & NotificationSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUserSlice(...a),
      ...createEmailSlice(...a),
      ...createAccountsSlice(...a),
      ...createTransactionSlice(...a),
      ...createCategorySlice(...a),
      ...createBankSlice(...a),
      ...createDashboardSlice(...a),
        ...(createNotificationSlice(...a)),
    }),
    {
      name: 'auth-data', // unique name
      partialize: state => ({
        auth: state.auth,
      }), // only persist the auth field
    }
  )
);
