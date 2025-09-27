import { SyncStatusEnum } from '@/features/email/domain/entity/enum/sync-status.enum';

export class EmailSyncStatusEntity {
  public syncStatus: SyncStatusEnum;
  public lastSyncAt: string;
  public emailsScanned: number;

  constructor(
    syncStatus: SyncStatusEnum,
    lastSyncAt: string,
    emailsScanned: number
  ) {
    this.syncStatus = syncStatus;
    this.lastSyncAt = lastSyncAt;
    this.emailsScanned = emailsScanned;
  }
}
