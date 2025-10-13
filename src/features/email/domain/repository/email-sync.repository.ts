import {Either} from 'fp-ts/lib/Either';

import {Failure} from '@/core/errors/failure.error';
import {EmailSyncStatusModel} from '@/features/email/data/model/email-sync-status.model';
import {GetOauthTokenSchemaType,} from '@/features/email/presentation/validation/email-sync';


export interface IEmailSyncRepository {
  getOAuthUrl(): Promise<Either<Failure, string>>;
  getToken(request: GetOauthTokenSchemaType): Promise<Either<Failure, string>>;
  getSyncStatus(): Promise<Either<Failure, EmailSyncStatusModel>>;
  syncEmail(
  ): Promise<Either<Failure, string>>;
  verifyAccessToEmailLabel(labelName: string): Promise<Either<Failure, string>>;
}
