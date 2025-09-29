import {container} from 'tsyringe';

import {IEmailSyncDataSource} from '@/features/email/data/datasource/email-sync.datasource';
import {EmailSyncNetwork} from '@/features/email/data/datasource/email-sync.network';
import {EmailSyncRepository} from '@/features/email/data/repository/email-sync.repository';
import {IEmailSyncRepository} from '@/features/email/domain/repository/email-sync.repository';
import {GetOauthUrlUseCase} from '@/features/email/domain/use-case/get-oauth-url';
import {GetSyncStatus} from '@/features/email/domain/use-case/get-sync-status';
import {GetTokenUseCase} from '@/features/email/domain/use-case/get-token';
import {SyncEmailUseCase} from '@/features/email/domain/use-case/sync-email';
import {VerifyEmailLabelUseCase} from "@/features/email/domain/use-case/verify-email-label";

export function configureEmailSyncContainer() {
  // Register network/data layer dependency
  container.registerSingleton<EmailSyncNetwork>(EmailSyncNetwork);
  container.register<IEmailSyncDataSource>('IEmailDatasource', {
    useClass: EmailSyncNetwork,
  });

  // Register domain layer dependency
  container.register<IEmailSyncRepository>('IEmailSyncRepository', {
    useClass: EmailSyncRepository,
  });
  container.registerSingleton<GetOauthUrlUseCase>(GetOauthUrlUseCase);
  container.registerSingleton<GetSyncStatus>(GetSyncStatus);
  container.registerSingleton<GetTokenUseCase>(GetTokenUseCase);
  container.registerSingleton<SyncEmailUseCase>(SyncEmailUseCase);
  container.registerSingleton<VerifyEmailLabelUseCase>(VerifyEmailLabelUseCase);
}

export function getEmailSyncUseCases() {
  return {
    getOauthUrlUseCase: container.resolve(GetOauthUrlUseCase),
    getSyncStatusUseCase: container.resolve(GetSyncStatus),
    getTokenUseCase: container.resolve(GetTokenUseCase),
    syncEmailUseCase: container.resolve(SyncEmailUseCase),
    verifyEmailLabelUseCase: container.resolve(VerifyEmailLabelUseCase),
  };
}
