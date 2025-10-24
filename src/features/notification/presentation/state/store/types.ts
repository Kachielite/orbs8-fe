import {Pagination} from '@/core/interfaces/pagination.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';

export type NotificationSlice = {
    // state
    notification: NotificationEntity | null;
    notifications: Pagination<NotificationEntity> | null;
    // actions
    setNotification: (notification: NotificationEntity) => void;
    setNotifications: (notifications: Pagination<NotificationEntity>) => void;
};
