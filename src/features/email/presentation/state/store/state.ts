import { EmailSlice } from '@/features/email/presentation/state/store/type';

export const initialEmailState: Pick<EmailSlice, 'syncStatus' | 'step'> = {
  syncStatus: null,
  step: 0,
};
