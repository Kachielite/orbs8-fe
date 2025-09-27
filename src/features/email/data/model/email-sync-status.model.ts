import {EmailSyncStatusEntity} from "@/features/email/domain/entity/email-sync-status.entity";
import {SyncStatusEnum} from "@/features/email/domain/entity/enum/sync-status.enum";

export class EmailSyncStatusModel extends EmailSyncStatusEntity {
    constructor(
        public syncStatus: SyncStatusEnum,
        public lastSyncAt: string,
        public emailsScanned: number
    ) {
        super(syncStatus, lastSyncAt, emailsScanned);
    }

    static from(emailConnectionStatus: EmailSyncStatusEntity): EmailSyncStatusModel {
        return new EmailSyncStatusModel(emailConnectionStatus.syncStatus, emailConnectionStatus.lastSyncAt, emailConnectionStatus.emailsScanned);
    }
}