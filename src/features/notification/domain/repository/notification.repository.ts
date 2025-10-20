import {Either} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {Pagination} from '@/core/interfaces/pagination.interface';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';

export interface INotificationRepository {
    getNotification(id: number): Promise<Either<Failure, NotificationEntity>>;

    getNotifications(
        query: INotificationQuery
    ): Promise<Either<Failure, Pagination<NotificationEntity>>>;

    markAsRead(id: number): Promise<Either<Failure, string>>;
}
