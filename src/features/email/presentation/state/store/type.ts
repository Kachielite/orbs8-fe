import { EmailSyncStatusEntity } from '@/features/email/domain/entity/email-sync-status.entity';

export type EmailSlice = {
  // state
  syncStatus: EmailSyncStatusEntity | null;
  // actions
  setSyncStatus: (syncStatus: EmailSyncStatusEntity | null) => void;
};
