import {fold} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {getNotificationUseCases} from '@/core/init-dependencies/notification.dependency';
import {Pagination} from '@/core/interfaces/pagination.interface';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';
import {GetNotificationParam} from '@/features/notification/domain/use-case/get-notification';
import {GetNotificationsParam} from '@/features/notification/domain/use-case/get-notifications';
import {MarkAsReadParam} from '@/features/notification/domain/use-case/mark-as-read';

export const getNotificationEffect = async (id: number) => {
    const response = await getNotificationUseCases().getNotification.execute(
        new GetNotificationParam(id)
    );

    return fold<Failure, NotificationEntity, NotificationEntity>(
        failure => {
            throw failure;
        },
        notification => {
            return notification;
        }
    )(response);
};

export const getNotificationsEffect = async (query: INotificationQuery) => {
    const response = await getNotificationUseCases().getNotifications.execute(
        new GetNotificationsParam(query)
    );

    return fold<Failure, Pagination<NotificationEntity>, Pagination<NotificationEntity>>(
        failure => {
            throw failure;
        },
        notifications => {
            return notifications;
        }
    )(response);
};

export const markAsReadEffect = async (id: number) => {
    const response = await getNotificationUseCases().markAsRead.execute(
        new MarkAsReadParam(id)
    );

    return fold<Failure, string, string>(
        failure => {
            throw failure;
        },
        result => {
            return result;
        }
    )(response);
};
