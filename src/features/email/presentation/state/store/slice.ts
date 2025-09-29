import { StateCreator } from 'zustand/vanilla';
import { EmailSlice } from '@/features/email/presentation/state/store/type';
import { initialEmailState } from '@/features/email/presentation/state/store/state';
import { createEmailActions } from '@/features/email/presentation/state/store/actions';

export const createEmailSlice: StateCreator<EmailSlice> = (
  set,
  get,
  store
) => ({
  ...initialEmailState,
  ...(createEmailActions(set, get, store) as EmailSlice),
});
