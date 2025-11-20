import {Either} from 'fp-ts/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {NoParams, UseCase} from '@/core/use-case';
import type {IEmailSyncRepository} from '@/features/email/domain/repository/email-sync.repository';

@injectable()
export class RevokeAccessAndDeleteDataUseCase
    implements UseCase<string, NoParams> {
    constructor(
        @inject('IEmailSyncRepository')
        private readonly emailSyncRepository: IEmailSyncRepository
    ) {
    }

    async execute(_params: NoParams): Promise<Either<Failure, string>> {
        return await this.emailSyncRepository.revokeAccessAndDeleteData();
    }
}
