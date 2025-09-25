import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import { type AuthRepository } from '@/features/authentication/domain/repository/auth.repository';
import { RegisterSchemaType } from '@/features/authentication/presentation/validation/auth.validation';

export class RegisterUseCaseParam {
  constructor(public readonly payload: RegisterSchemaType) {}
}

@injectable()
export class RegisterUseCase implements UseCase<string, RegisterUseCaseParam> {
  constructor(
    @inject('AuthRepository') private readonly authRepository: AuthRepository
  ) {}

  async execute(
    params: RegisterUseCaseParam
  ): Promise<Either<Failure, string>> {
    return this.authRepository.register(params.payload);
  }
}
