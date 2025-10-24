import {StateCreator} from 'zustand/vanilla';

import {createNotificationActions} from '@/features/notification/presentation/state/store/actions';
import {initialNotificationState} from '@/features/notification/presentation/state/store/state';
import {NotificationSlice} from '@/features/notification/presentation/state/store/types';

export const createNotificationSlice: StateCreator<NotificationSlice> = (
    set,
    get,
    store
) => {
    const actions = createNotificationActions(set, get, store);
    return {
        ...initialNotificationState,
        ...actions,
    };
};
