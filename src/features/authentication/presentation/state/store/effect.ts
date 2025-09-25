import { fold } from 'fp-ts/Either';

import { Failure } from '@/core/errors/failure.error';
import { getAuthUseCases } from '@/core/init-dependencies/auth.dependency';
import { AuthEntity } from '@/features/authentication/domain/entity/auth.entity';
import { LoginUseCaseParam } from '@/features/authentication/domain/use-case/login';
import { RegisterUseCaseParam } from '@/features/authentication/domain/use-case/register';
import { RequestPasswordResetUseCaseParam } from '@/features/authentication/domain/use-case/request-password-reset';
import { ResetPasswordUseCaseParam } from '@/features/authentication/domain/use-case/reset-password';
import { VerifyPasswordTokenUseCaseParam } from '@/features/authentication/domain/use-case/verify-password-token';
import {
  LoginSchemaType,
  RegisterSchemaType,
  RequestPasswordResetSchemaType,
  ResetPasswordSchemaType,
  VerifyPasswordResetTokenSchemaType,
} from '@/features/authentication/presentation/validation/auth.validation';

export const loginEffect = async (payload: LoginSchemaType) => {
  const response = await getAuthUseCases().loginUseCase.execute(
    new LoginUseCaseParam(payload)
  );

  return fold<Failure, AuthEntity, AuthEntity>(
    failure => {
      throw failure;
    },
    auth => auth
  )(response);
};

export const registerEffect = async (payload: RegisterSchemaType) => {
  const response = await getAuthUseCases().registerUseCase.execute(
    new RegisterUseCaseParam(payload)
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    res => res
  )(response);
};

export const requestPasswordResetEffect = async (
  payload: RequestPasswordResetSchemaType
) => {
  const response = await getAuthUseCases().requestPasswordResetUseCase.execute(
    new RequestPasswordResetUseCaseParam(payload)
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    res => res
  )(response);
};

export const resetPasswordEffect = async (payload: ResetPasswordSchemaType) => {
  const response = await getAuthUseCases().resetPasswordUseCase.execute(
    new ResetPasswordUseCaseParam(payload)
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    res => res
  )(response);
};

export const verifyPasswordResetTokenEffect = async (
  payload: VerifyPasswordResetTokenSchemaType
) => {
  const response = await getAuthUseCases().verifyPasswordTokenUseCase.execute(
    new VerifyPasswordTokenUseCaseParam(payload)
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    res => res
  )(response);
};
