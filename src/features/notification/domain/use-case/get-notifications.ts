import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {Pagination} from '@/core/interfaces/pagination.interface';
import {UseCase} from '@/core/use-case';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';
import {type INotificationRepository} from '@/features/notification/domain/repository/notification.repository';

export class GetNotificationsParam {
    constructor(public readonly query: INotificationQuery) {
    }
}

@injectable()
export class GetNotifications
    implements UseCase<Pagination<NotificationEntity>, GetNotificationsParam> {
    constructor(
        @inject('INotificationRepository')
        private readonly notificationRepository: INotificationRepository
    ) {
    }

    async execute(
        params: GetNotificationsParam
    ): Promise<Either<Failure, Pagination<NotificationEntity>>> {
        return await this.notificationRepository.getNotifications(params.query);
    }
}
