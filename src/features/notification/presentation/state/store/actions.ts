import {Pagination} from '@/core/interfaces/pagination.interface';
import {NotificationEntity} from '@/features/notification/domain/entity/notification.entity';
import {NotificationSlice} from '@/features/notification/presentation/state/store/types';

import type {StateCreator} from 'zustand/vanilla';

export const createNotificationActions: StateCreator<
    NotificationSlice,
    [],
    [],
    Pick<NotificationSlice, 'setNotification' | 'setNotifications'>
> = set => ({
    setNotification: (notification: NotificationEntity) => set({notification}),
    setNotifications: (notifications: Pagination<NotificationEntity>) => set({notifications}),
});
