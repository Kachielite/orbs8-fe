import { UseCase } from '@/core/use-case';
import { inject, injectable } from 'tsyringe';
import { type IEmailSyncRepository } from '@/features/email/domain/repository/email-sync.repository';
import { Failure } from '@/core/errors/failure.error';
import { Either } from 'fp-ts/lib/Either';
import { GetOauthTokenSchemaType } from '@/features/email/presentation/validation/email-sync';

export class GetTokenUseCaseParam {
  constructor(public readonly request: GetOauthTokenSchemaType) {}
}

@injectable()
export class GetTokenUseCase implements UseCase<string, GetTokenUseCaseParam> {
  constructor(
    @inject('IEmailSyncRepository')
    private readonly emailSyncRepository: IEmailSyncRepository
  ) {}

  async execute(
    params: GetTokenUseCaseParam
  ): Promise<Either<Failure, string>> {
    return await this.emailSyncRepository.getToken({
      code: params.request.code,
    });
  }
}
