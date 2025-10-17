import { BankEntity } from '@/features/bank/domain/entity/bank.entity';
import { BankSlice } from '@/features/bank/presentation/state/store/types';

import type { StateCreator } from 'zustand/vanilla';

export const createBankActions: StateCreator<
  BankSlice,
  [],
  [],
  Pick<BankSlice, 'setBanks' | 'setBank'>
> = set => ({
  setBanks: (banks: BankEntity[] | null) => set({ banks }),
  setBank: (bank: BankEntity | null) => set({ bank }),
});
