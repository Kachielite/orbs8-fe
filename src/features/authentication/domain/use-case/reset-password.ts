import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {type IAuthRepository} from '@/features/authentication/domain/repository/IAuthRepository';
import {ResetPasswordSchemaType} from '@/features/authentication/presentation/validation/auth.validation';

import type {Either} from 'fp-ts/Either';

export class ResetPasswordUseCaseParam {
  constructor(public readonly payload: ResetPasswordSchemaType) {}
}

@injectable()
export class ResetPasswordUseCase
  implements UseCase<string, ResetPasswordUseCaseParam>
{
  constructor(
    @inject('AuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async execute(
    params: ResetPasswordUseCaseParam
  ): Promise<Either<Failure, string>> {
    return this.authRepository.resetPassword(params.payload);
  }
}
