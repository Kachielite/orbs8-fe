import {container} from 'tsyringe';

import {
    INotificationDataSource,
    NotificationDataSource,
} from '@/features/notification/data/datasource/notification.datasource';
import {NotificationNetwork} from '@/features/notification/data/datasource/notification.network';
import {NotificationRepository} from '@/features/notification/data/repository/notification.repository';
import {INotificationRepository} from '@/features/notification/domain/repository/notification.repository';
import {GetNotification} from '@/features/notification/domain/use-case/get-notification';
import {GetNotifications} from '@/features/notification/domain/use-case/get-notifications';
import {MarkAllAsRead} from '@/features/notification/domain/use-case/mark-all-as-read';
import {MarkAsRead} from '@/features/notification/domain/use-case/mark-as-read';

export function configureNotificationContainer() {
    // Register network/data layer dependency
    container.registerSingleton<NotificationNetwork>(NotificationNetwork);
    container.register<INotificationDataSource>('INotificationDataSource', {
        useClass: NotificationDataSource,
    });

    // Register domain layer dependency
    container.register<INotificationRepository>('INotificationRepository', {
        useClass: NotificationRepository,
    });
    container.registerSingleton<GetNotification>(GetNotification);
    container.registerSingleton<GetNotifications>(GetNotifications);
    container.registerSingleton<MarkAsRead>(MarkAsRead);
    container.registerSingleton<MarkAllAsRead>(MarkAllAsRead);
}

export function getNotificationUseCases() {
    return {
        getNotification: container.resolve(GetNotification),
        getNotifications: container.resolve(GetNotifications),
        markAsRead: container.resolve(MarkAsRead),
        markAllAsRead: container.resolve(MarkAllAsRead),
    };
}
