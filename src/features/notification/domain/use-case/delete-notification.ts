import {Either} from 'fp-ts/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {type INotificationRepository} from '@/features/notification/domain/repository/notification.repository';

export class DeleteNotificationParam {
    constructor(public readonly id: number) {
    }
}

@injectable()
export class DeleteNotification
    implements UseCase<string, DeleteNotificationParam> {
    constructor(
        @inject('INotificationRepository')
        private readonly notificationRepository: INotificationRepository
    ) {
    }

    async execute(
        params: DeleteNotificationParam
    ): Promise<Either<Failure, string>> {
        return await this.notificationRepository.deleteNotification(params.id);
    }
}
