import {AuthSlice} from '@/features/authentication/presentation/state/store/types';

export const initialAuthState: Pick<AuthSlice, 'auth' | 'resetPasswordToken'> = {
  auth: null,
    resetPasswordToken: null,
};
