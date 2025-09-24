import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { AuthModel } from '@/features/authentication/data/model/auth.model';
import type { AuthRepository } from '@/features/authentication/domain/repository/auth.repository';
import { LoginSchemaType } from '@/features/authentication/presentation/validation/auth.validation';

export class LoginUseCaseParam {
  constructor(public readonly payload: LoginSchemaType) {}
}

@injectable()
export class LoginUseCase implements UseCase<AuthModel, LoginUseCaseParam> {
  constructor(
    @inject('AuthRepository') private readonly authRepository: AuthRepository
  ) {}

  async execute(
    params: LoginUseCaseParam
  ): Promise<Either<Failure, AuthModel>> {
    return this.authRepository.login(params.payload);
  }
}
