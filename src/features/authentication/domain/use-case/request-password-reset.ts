import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {type IAuthRepository} from '@/features/authentication/domain/repository/IAuthRepository';
import {RequestPasswordResetSchemaType} from '@/features/authentication/presentation/validation/auth.validation';

export class RequestPasswordResetUseCaseParam {
  constructor(public readonly payload: RequestPasswordResetSchemaType) {}
}

@injectable()
export class RequestPasswordResetUseCase
  implements UseCase<string, RequestPasswordResetUseCaseParam>
{
  constructor(
    @inject('AuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async execute(
    params: RequestPasswordResetUseCaseParam
  ): Promise<Either<Failure, string>> {
    return this.authRepository.requestPasswordReset(params.payload);
  }
}
