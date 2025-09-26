import {Either, right} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import {type IAuthDataSource} from '@/features/authentication/data/datasource/IAuthDataSource';
import {IAuthRepository} from '@/features/authentication/domain/repository/IAuthRepository';

import {
    LoginSchemaType,
    LoginWithGoogleSchemaType,
    RefreshTokenSchemaType,
    RegisterSchemaType,
    RequestPasswordResetSchemaType,
    ResetPasswordSchemaType,
    VerifyPasswordResetTokenSchemaType,
} from '../../presentation/validation/auth.validation';
import {AuthModel} from '../model/auth.model';

@injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    @inject('AuthDataSource') private readonly authDataSource: IAuthDataSource
  ) {}

  async login(payload: LoginSchemaType): Promise<Either<Failure, AuthModel>> {
    try {
      const response = await this.authDataSource.login(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepositoryImpl:Login');
    }
  }

  async register(
    payload: RegisterSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.authDataSource.register(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepositoryImpl:Register');
    }
  }

  async refreshToken(
    payload: RefreshTokenSchemaType
  ): Promise<Either<Failure, AuthModel>> {
    try {
      const response = await this.authDataSource.refreshToken(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepositoryImpl:RefreshToken');
    }
  }

  async loginWithGoogle(
    payload: LoginWithGoogleSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.authDataSource.loginWithGoogle(payload);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'AuthRepositoryImpl:LoginWithGoogle');
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
        'AuthRepositoryImpl:RequestPasswordReset'
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
      throw extractErrorRepository(error, 'AuthRepositoryImpl:ResetPassword');
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
        'AuthRepositoryImpl:VerifyPasswordResetToken'
      );
    }
  }
}
