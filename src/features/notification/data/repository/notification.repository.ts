import {Either, right} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import {Pagination} from '@/core/interfaces/pagination.interface';
import {type INotificationDataSource} from '@/features/notification/data/datasource/notification.datasource';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';
import {INotificationRepository} from '@/features/notification/domain/repository/notification.repository';

@injectable()
export class NotificationRepository implements INotificationRepository {
    constructor(
        @inject('INotificationDataSource')
        private readonly notificationDataSource: INotificationDataSource
    ) {
    }

    async getNotification(
        id: number
    ): Promise<Either<Failure, NotificationEntity>> {
        try {
            const response = await this.notificationDataSource.getNotification(id);
            return right(response);
        } catch (error) {
            throw extractErrorRepository(
                error,
                'NotificationRepository:getNotification'
            );
        }
    }

    async getNotifications(
        query: INotificationQuery
    ): Promise<Either<Failure, Pagination<NotificationEntity>>> {
        try {
            const response =
                await this.notificationDataSource.getNotifications(query);
            return right(response);
        } catch (error) {
            throw extractErrorRepository(
                error,
                'NotificationRepository:getNotifications'
            );
        }
    }

    async markAsRead(id: number): Promise<Either<Failure, string>> {
        try {
            const response = await this.notificationDataSource.markAsRead(id);
            return right(response);
        } catch (error) {
            throw extractErrorRepository(error, 'NotificationRepository:markAsRead');
        }
    }
}
