import {Failure} from '@/core/errors/failure.error';
import {inject, injectable} from 'tsyringe';
import {UseCase} from '@/core/use-case';
import {type IEmailSyncRepository} from '@/features/email/domain/repository/email-sync.repository';
import {Either} from 'fp-ts/lib/Either';
import {ManualSyncRequestSchemaType} from "@/features/email/presentation/validation/email-sync";

export class SyncEmailUseCaseParam {
    constructor(public readonly request: ManualSyncRequestSchemaType) {}
}

@injectable()
export class SyncEmailUseCase implements UseCase<string, SyncEmailUseCaseParam> {
  constructor(
    @inject('IEmailSyncRepository')
    private readonly emailSyncRepository: IEmailSyncRepository
  ) {}

  async execute(params: SyncEmailUseCaseParam): Promise<Either<Failure, string>> {
    return await this.emailSyncRepository.syncEmail(params.request);
  }
}
