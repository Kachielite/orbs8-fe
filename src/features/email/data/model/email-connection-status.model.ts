import {EmailConnectionStatusEntity} from "@/features/email/domain/entity/email-connection-status.entity";
import {SyncStatusEnum} from "@/features/email/domain/entity/enum/sync-status.enum";

export class EmailConnectionStatusModel extends EmailConnectionStatusEntity {
    constructor(
        public syncStatus: SyncStatusEnum,
        public lastSyncAt: string,
        public emailsScanned: number
    ) {
        super(syncStatus, lastSyncAt, emailsScanned);
    }

    static from(emailConnectionStatus: EmailConnectionStatusEntity): EmailConnectionStatusModel {
        return new EmailConnectionStatusModel(emailConnectionStatus.syncStatus, emailConnectionStatus.lastSyncAt, emailConnectionStatus.emailsScanned);
    }
}