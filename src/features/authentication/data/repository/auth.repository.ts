import { Either, right } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { IAuthRepository } from '@/features/authentication/domain/repository/auth.repository';

import {
  LoginSchemaType,
  LoginWithGoogleSchemaType,
  RefreshTokenSchemaType,
  RegisterSchemaType,
  RequestPasswordResetSchemaType,
  ResetPasswordSchemaType,
  VerifyPasswordResetTokenSchemaType,
} from '../../presentation/validation/auth.validation';
import { AuthModel } from '../model/auth.model';
import { AuthDataSource } from '@/features/authentication/data/datasource/auth.datasource';

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject('AuthDataSource') private readonly authDataSource: AuthDataSource
  ) {}

  async login(payload: LoginSchemaType): Promise<Either<Failure, AuthModel>> {
    try {
      const response = await this.authDataSource.login(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepository:Login');
    }
  }

  async register(
    payload: RegisterSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.authDataSource.register(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepository:Register');
    }
  }

  async refreshToken(
    payload: RefreshTokenSchemaType
  ): Promise<Either<Failure, AuthModel>> {
    try {
      const response = await this.authDataSource.refreshToken(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepository:RefreshToken');
    }
  }

  async loginWithGoogle(
    payload: LoginWithGoogleSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.authDataSource.loginWithGoogle(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepository:LoginWithGoogle');
    }
  }

  async requestPasswordReset(
    payload: RequestPasswordResetSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.authDataSource.requestPasswordReset(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'AuthRepository:RequestPasswordReset'
      );
    }
  }

  async resetPassword(
    payload: ResetPasswordSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.authDataSource.resetPassword(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepository:ResetPassword');
    }
  }

  async verifyPasswordResetToken(
    payload: VerifyPasswordResetTokenSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response =
        await this.authDataSource.verifyPasswordResetToken(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'AuthRepository:VerifyPasswordResetToken'
      );
    }
  }
}
