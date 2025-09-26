import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {type IAuthRepository} from "@/features/authentication/domain/repository/auth.repository";
import {VerifyPasswordResetTokenSchemaType} from '@/features/authentication/presentation/validation/auth.validation';

export class VerifyPasswordTokenUseCaseParam {
  constructor(public payload: VerifyPasswordResetTokenSchemaType) {}
}

@injectable()
export class VerifyPasswordTokenUseCase
  implements UseCase<string, VerifyPasswordTokenUseCaseParam>
{
  constructor(
    @inject('AuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async execute(
    params: VerifyPasswordTokenUseCaseParam
  ): Promise<Either<Failure, string>> {
    return this.authRepository.verifyPasswordResetToken(params.payload);
  }
}
