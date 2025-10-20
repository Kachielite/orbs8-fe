import {NotificationType} from "@/features/notification/domain/entity/enum/notification-type.enum";
import {NotificationEntity} from "@/features/notification/domain/entity/notification.entity";

export class NotificationModel extends NotificationEntity {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public type: NotificationType,
        public isRead: boolean,
        public date: string,
    ) {
        super({id, title, description, type, isRead, date});
    }


    static fromJSON(data: NotificationEntity) {
        return new NotificationModel(
            data.id,
            data.title,
            data.description,
            data.type,
            data.isRead,
            data.date,
        );
    }
}