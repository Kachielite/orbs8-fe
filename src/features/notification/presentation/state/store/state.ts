import {Pagination} from '@/core/interfaces/pagination.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';

export const initialNotificationState = {
    notification: null as NotificationEntity | null,
    notifications: null as Pagination<NotificationEntity> | null,
};
