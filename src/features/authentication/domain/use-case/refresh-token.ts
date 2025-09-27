import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { AuthModel } from '@/features/authentication/data/model/auth.model';
import { type IAuthRepository } from '@/features/authentication/domain/repository/auth.repository';
import { RefreshTokenSchemaType } from '@/features/authentication/presentation/validation/auth.validation';

export class RefreshTokenUseCaseParam {
  constructor(public readonly payload: RefreshTokenSchemaType) {}
}

@injectable()
export class RefreshTokenUseCase
  implements UseCase<AuthModel, RefreshTokenUseCaseParam>
{
  constructor(
    @inject('AuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async execute(
    params: RefreshTokenUseCaseParam
  ): Promise<Either<Failure, AuthModel>> {
    return this.authRepository.refreshToken(params.payload);
  }
}
