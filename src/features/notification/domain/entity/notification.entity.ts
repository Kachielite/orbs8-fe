import {NotificationType} from "@/features/notification/domain/entity/enum/notification-type.enum";

export class NotificationEntity {
    public id: number;
    public title: string;
    public description: string;
    public type: NotificationType;
    public isRead: boolean;
    public date: string;

    constructor(params: {
        id: number;
        title: string;
        description: string;
        type: NotificationType;
        isRead: boolean;
        date: string;
    }) {
        this.id = params.id;
        this.title = params.title;
        this.description = params.description;
        this.type = params.type;
        this.isRead = params.isRead;
        this.date = params.date;
    }
}