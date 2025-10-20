import {inject, injectable} from 'tsyringe';

import {BASE_URL} from '@/core/constants/env.constants';
import extractErrorNetwork from '@/core/helpers/extract-error-network';
import CustomAxios from '@/core/network/custom-axios';
import {INotificationQuery} from '@/features/notification/domain/entity/interface/notification.interface';

injectable();

export class NotificationNetwork {
    private readonly path = `${BASE_URL}/notification`;

    constructor(@inject('AxiosClient') private readonly axios: CustomAxios) {
    }

    public async getNotification(id: number) {
        try {
            const response = await this.axios.getInstance().get(`${this.path}/${id}`);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'NotificationNetwork:getNotification');
        }
    }

    public async getNotifications(query: INotificationQuery) {
        try {
            let url = `${this.path}?page=${query.page}&limit=${query.limit}`;

            if (query.isRead) {
                url += `&isRead=${query.isRead}`;
            }
            const response = await this.axios.getInstance().get(url, {
                params: query,
            });
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'NotificationNetwork:getNotifications');
        }
    }

    public async markAsRead(id: number) {
        try {
            const response = await this.axios.getInstance().put(`${this.path}/${id}`);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'NotificationNetwork:markAsRead');
        }
    }

    public async markAllAsRead() {
        try {
            const response = await this.axios.getInstance().put(`${this.path}/mark-all-as-read`);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'NotificationNetwork:markAllAsRead');
        }
    }
}
