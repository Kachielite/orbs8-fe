import {container} from 'tsyringe';

import {AuthDataSource, AuthDataSourceImpl,} from '@/features/authentication/data/datasource/auth.datasource';
import {AuthNetwork} from '@/features/authentication/data/datasource/auth.network';
import {AuthRepositoryImpl} from '@/features/authentication/data/repository/auth.repository';
import {AuthRepository} from '@/features/authentication/domain/repository/auth.repository';
import {LoginUseCase} from '@/features/authentication/domain/use-case/login';
import {LoginWithGoogleUseCase} from '@/features/authentication/domain/use-case/login-with-google';
import {RefreshTokenUseCase} from '@/features/authentication/domain/use-case/refresh-token';
import {RegisterUseCase} from '@/features/authentication/domain/use-case/register';
import {RequestPasswordResetUseCase} from '@/features/authentication/domain/use-case/request-password-reset';
import {ResetPasswordUseCase} from '@/features/authentication/domain/use-case/reset-password';
import {VerifyPasswordTokenUseCase} from "@/features/authentication/domain/use-case/verify-password-token";

export function configureAuthContainer() {
  // Register network/data layer dependency
  container.registerSingleton<AuthNetwork>(AuthNetwork);
  container.register<AuthDataSource>('AuthDataSource', {
    useClass: AuthDataSourceImpl,
  });

  // Register domain layer dependency
  container.register<AuthRepository>('AuthRepository', {
    useClass: AuthRepositoryImpl,
  });
  container.registerSingleton<LoginUseCase>(LoginUseCase);
  container.registerSingleton<LoginWithGoogleUseCase>(LoginWithGoogleUseCase);
  container.registerSingleton<RefreshTokenUseCase>(RefreshTokenUseCase);
  container.registerSingleton<RegisterUseCase>(RegisterUseCase);
  container.registerSingleton<RequestPasswordResetUseCase>(
    RequestPasswordResetUseCase
  );
  container.registerSingleton<ResetPasswordUseCase>(ResetPasswordUseCase);
  container.registerSingleton<VerifyPasswordTokenUseCase>(VerifyPasswordTokenUseCase)
}

export function getAuthUseCases() {
  return {
    loginUseCase: container.resolve(LoginUseCase),
    loginWithGoogleUseCase: container.resolve(LoginWithGoogleUseCase),
    refreshTokenUseCase: container.resolve(RefreshTokenUseCase),
    registerUseCase: container.resolve(RegisterUseCase),
    requestPasswordResetUseCase: container.resolve(RequestPasswordResetUseCase),
    resetPasswordUseCase: container.resolve(ResetPasswordUseCase),
      verifyPasswordTokenUseCase: container.resolve(VerifyPasswordTokenUseCase)
  };
}
