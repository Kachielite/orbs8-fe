import { EmailSyncStatusEntity } from '@/features/email/domain/entity/email-sync-status.entity';

export type EmailSlice = {
  // state
  syncStatus: EmailSyncStatusEntity | null;
  step: number;
  // actions
  setSyncStatus: (syncStatus: EmailSyncStatusEntity | null) => void;
  setStep: (step: number) => void;
};
