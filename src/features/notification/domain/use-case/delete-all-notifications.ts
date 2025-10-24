import {Either} from "fp-ts/lib/Either";
import {inject, injectable} from "tsyringe";

import {Failure} from "@/core/errors/failure.error";
import {NoParams, UseCase} from "@/core/use-case";
import type {INotificationRepository} from "@/features/notification/domain/repository/notification.repository";

@injectable()
export class DeleteAllNotifications implements UseCase<string, NoParams> {
    constructor(
        @inject('INotificationRepository')
        private readonly notificationRepository: INotificationRepository
    ) {
    }

    async execute(_params: NoParams): Promise<Either<Failure, string>> {
        return await this.notificationRepository.deleteAllNotifications();
    }
}