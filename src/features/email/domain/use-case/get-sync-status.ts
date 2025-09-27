import {inject, injectable} from "tsyringe";
import {NoParams, UseCase} from "@/core/use-case";
import type {IEmailSyncRepository} from "@/features/email/domain/repository/email-sync.repository";
import {Either} from "fp-ts/Either";
import {Failure} from "@/core/errors/failure.error";
import {EmailSyncStatusModel} from "@/features/email/data/model/email-sync-status.model";

@injectable()
export class GetSyncStatus implements UseCase<EmailSyncStatusModel, NoParams> {
    constructor(
        @inject('IEmailSyncRepository') private readonly emailSyncRepository: IEmailSyncRepository,
    ) {}

    async execute(_params: NoParams): Promise<Either<Failure, EmailSyncStatusModel>> {
        return await this.emailSyncRepository.getSyncStatus();
    }
    
}