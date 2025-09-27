import {
  GetOauthTokenSchemaType,
  ManualSyncRequestSchemaType,
} from '@/features/email/presentation/validation/email-sync';
import { EmailSyncStatusModel } from '@/features/email/data/model/email-sync-status.model';
import { Failure } from '@/core/errors/failure.error';
import { Either } from 'fp-ts/lib/Either';

export interface IEmailSyncRepository {
  getOAuthUrl(): Promise<Either<Failure, string>>;
  getToken(request: GetOauthTokenSchemaType): Promise<Either<Failure, string>>;
  getSyncStatus(): Promise<Either<Failure, EmailSyncStatusModel>>;
  syncEmail(
    request: ManualSyncRequestSchemaType
  ): Promise<Either<Failure, string>>;
}
