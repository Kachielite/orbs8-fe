import { EmailSlice } from '@/features/email/presentation/state/store/type';
import type { StateCreator } from 'zustand/vanilla';
import { EmailSyncStatusEntity } from '@/features/email/domain/entity/email-sync-status.entity';

export const createEmailActions: StateCreator<
  EmailSlice,
  [],
  [],
  Pick<EmailSlice, 'setSyncStatus'>
> = set => ({
  setSyncStatus: (syncStatus: EmailSyncStatusEntity | null) =>
    set({ syncStatus }),
});
