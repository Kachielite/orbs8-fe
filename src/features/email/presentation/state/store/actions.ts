import { EmailSlice } from '@/features/email/presentation/state/store/type';
import type { StateCreator } from 'zustand/vanilla';
import { EmailSyncStatusEntity } from '@/features/email/domain/entity/email-sync-status.entity';

export const createEmailActions: StateCreator<
  EmailSlice,
  [],
  [],
  Pick<EmailSlice, 'setSyncStatus' | 'setStep'>
> = set => ({
  setSyncStatus: (syncStatus: EmailSyncStatusEntity | null) =>
    set({ syncStatus }),
  setStep: (step: number) => set({ step }),
});
