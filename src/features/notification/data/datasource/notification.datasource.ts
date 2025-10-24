import {inject, injectable} from 'tsyringe';

import extractErrorDatasource from '@/core/helpers/extract-error-datasource';
import {Pagination} from '@/core/interfaces/pagination.interface';
import {NotificationNetwork} from '@/features/notification/data/datasource/notification.network';
import {NotificationModel} from '@/features/notification/data/model/notification.model';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';

export interface INotificationDataSource {
    getNotification(id: number): Promise<NotificationModel>;

    getNotifications(
        query: INotificationQuery
    ): Promise<Pagination<NotificationModel>>;

    markAsRead(id: number): Promise<string>;

    markAllAsRead(): Promise<string>;

    deleteNotification(id: number): Promise<string>;

    deleteAllNotifications(): Promise<string>;
}

@injectable()
export class NotificationDataSource implements INotificationDataSource {
    private readonly notificationNetwork: NotificationNetwork;

    constructor(
        @inject(NotificationNetwork) notificationNetwork: NotificationNetwork
    ) {
        this.notificationNetwork = notificationNetwork;
    }

    async getNotification(id: number): Promise<NotificationModel> {
        try {
            const response = await this.notificationNetwork.getNotification(id);
            return NotificationModel.fromJSON(response);
        } catch (error) {
            return extractErrorDatasource(
                error,
                'NotificationDataSource:getNotification'
            );
        }
    }

    async getNotifications(
        query: INotificationQuery
    ): Promise<Pagination<NotificationModel>> {
        try {
            const response = await this.notificationNetwork.getNotifications(query);
            return {
                data: response.data.map((notification: NotificationModel) =>
                    NotificationModel.fromJSON(notification)
                ),
                total: response.total,
                page: response.page,
                limit: response.limit,
                hasNextPage: response.hasNextPage,
                hasPreviousPage: response.hasPreviousPage,
            };
        } catch (error) {
            return extractErrorDatasource(
                error,
                'NotificationDataSource:getNotifications'
            );
        }
    }

    async markAsRead(id: number): Promise<string> {
        try {
            return await this.notificationNetwork.markAsRead(id);
        } catch (error) {
            return extractErrorDatasource(error, 'NotificationDataSource:markAsRead');
        }
    }

    async markAllAsRead(): Promise<string> {
        try {
            return await this.notificationNetwork.markAllAsRead();
        } catch (error) {
            return extractErrorDatasource(
                error,
                'NotificationDataSource:markAllAsRead'
            );
        }
    }

    async deleteNotification(id: number): Promise<string> {
        try {
            return await this.notificationNetwork.deleteNotification(id);
        } catch (error) {
            return extractErrorDatasource(
                error,
                'NotificationDataSource:deleteNotification'
            );
        }
    }

    async deleteAllNotifications(): Promise<string> {
        try {
            return await this.notificationNetwork.deleteAllNotifications();
        } catch (error) {
            return extractErrorDatasource(
                error,
                'NotificationDataSource:deleteAllNotifications'
            );
        }
    }
}
