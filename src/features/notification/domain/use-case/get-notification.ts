import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';
import {type INotificationRepository} from '@/features/notification/domain/repository/notification.repository';

export class GetNotificationParam {
    constructor(public readonly id: number) {
    }
}

@injectable()
export class GetNotification
    implements UseCase<NotificationEntity, GetNotificationParam> {
    constructor(
        @inject('INotificationRepository')
        private readonly notificationRepository: INotificationRepository
    ) {
    }

    async execute(
        params: GetNotificationParam
    ): Promise<Either<Failure, NotificationEntity>> {
        return await this.notificationRepository.getNotification(params.id);
    }
}
