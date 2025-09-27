import { Failure } from '@/core/errors/failure.error';
import { AuthModel } from '@/features/authentication/data/model/auth.model';
import {
  LoginSchemaType,
  LoginWithGoogleSchemaType,
  RefreshTokenSchemaType,
  RegisterSchemaType,
  RequestPasswordResetSchemaType,
  ResetPasswordSchemaType,
  VerifyPasswordResetTokenSchemaType,
} from '@/features/authentication/presentation/validation/auth.validation';

import type { Either } from 'fp-ts/Either';

export interface IAuthRepository {
  login(payload: LoginSchemaType): Promise<Either<Failure, AuthModel>>;
  register(payload: RegisterSchemaType): Promise<Either<Failure, string>>;
  refreshToken(
    payload: RefreshTokenSchemaType
  ): Promise<Either<Failure, AuthModel>>;
  loginWithGoogle(
    payload: LoginWithGoogleSchemaType
  ): Promise<Either<Failure, string>>;
  requestPasswordReset(
    payload: RequestPasswordResetSchemaType
  ): Promise<Either<Failure, string>>;
  resetPassword(
    payload: ResetPasswordSchemaType
  ): Promise<Either<Failure, string>>;
  verifyPasswordResetToken(
    payload: VerifyPasswordResetTokenSchemaType
  ): Promise<Either<Failure, string>>;
}
