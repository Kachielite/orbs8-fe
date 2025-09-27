import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { type IAuthRepository } from '@/features/authentication/domain/repository/auth.repository';
import { LoginWithGoogleSchemaType } from '@/features/authentication/presentation/validation/auth.validation';

export class LoginWithGoogleUseCaseParam {
  constructor(public readonly payload: LoginWithGoogleSchemaType) {}
}

@injectable()
export class LoginWithGoogleUseCase
  implements UseCase<string, LoginWithGoogleUseCaseParam>
{
  constructor(
    @inject('AuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async execute(
    params: LoginWithGoogleUseCaseParam
  ): Promise<Either<Failure, string>> {
    return this.authRepository.loginWithGoogle(params.payload);
  }
}
