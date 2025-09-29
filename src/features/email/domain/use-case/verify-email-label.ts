import { Either } from 'fp-ts/lib/Either';
import { inject, injectable } from 'tsyringe';

import { Failure } from '@/core/errors/failure.error';
import { UseCase } from '@/core/use-case';
import type { IEmailSyncRepository } from '@/features/email/domain/repository/email-sync.repository';

export class VerifyEmailLabelUseCaseParam {
  constructor(public readonly labelName: string) {}
}

@injectable()
export class VerifyEmailLabelUseCase
  implements UseCase<string, VerifyEmailLabelUseCaseParam>
{
  constructor(
    @inject('IEmailSyncRepository')
    private readonly emailSyncRepository: IEmailSyncRepository
  ) {}

  async execute(
    params: VerifyEmailLabelUseCaseParam
  ): Promise<Either<Failure, string>> {
    return await this.emailSyncRepository.verifyAccessToEmailLabel(
      params.labelName
    );
  }
}
