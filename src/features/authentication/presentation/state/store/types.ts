import { AuthEntity } from '@/features/authentication/domain/entity/auth.entity';

export type AuthSlice = {
  //state
  auth: AuthEntity | null;
  resetPasswordToken: string | null;
  //actions
  setAuth: (auth: AuthEntity | null) => void;
  setResetPasswordToken: (token: string | null) => void;
};
