import {NoParams, UseCase} from "@/core/use-case";
import {inject, injectable} from "tsyringe";
import type {IEmailSyncRepository} from "@/features/email/domain/repository/email-sync.repository";
import {Failure} from "@/core/errors/failure.error";
import {Either} from "fp-ts/lib/Either";

@injectable()
export class GetOauthUrlUseCase implements UseCase<string, NoParams> {
    constructor(
        @inject('IEmailSyncRepository') private readonly emailSyncRepository: IEmailSyncRepository,
    ) {}

    async execute(_params: NoParams): Promise<Either<Failure, string>> {
        return await this.emailSyncRepository.getOAuthUrl();
    }

}