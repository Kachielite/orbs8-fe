import { getEmailSyncUseCases } from '@/core/init-dependencies/email-sync.dependency';
import { NoParams } from '@/core/use-case';
import { Failure } from '@/core/errors/failure.error';
import { fold } from 'fp-ts/Either';
import { EmailSyncStatusEntity } from '@/features/email/domain/entity/email-sync-status.entity';
import {
  GetOauthTokenSchemaType,
  ManualSyncRequestSchemaType,
} from '@/features/email/presentation/validation/email-sync';
import { GetTokenUseCaseParam } from '@/features/email/domain/use-case/get-token';
import { SyncEmailUseCaseParam } from '@/features/email/domain/use-case/sync-email';

export const getOAuthUrlEffect = async () => {
  const response = await getEmailSyncUseCases().getOauthUrlUseCase.execute(
    new NoParams()
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    url => {
      return url;
    }
  )(response);
};

export const getSyncStatusEffect = async () => {
  const response = await getEmailSyncUseCases().getSyncStatusUseCase.execute(
    new NoParams()
  );

  return fold<Failure, EmailSyncStatusEntity, EmailSyncStatusEntity>(
    failure => {
      throw failure;
    },
    emailSyncStatus => {
      return emailSyncStatus;
    }
  )(response);
};

export const syncEmailEffect = async (request: ManualSyncRequestSchemaType) => {
  const response = await getEmailSyncUseCases().syncEmailUseCase.execute(
    new SyncEmailUseCaseParam(request)
  );

  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    message => {
      return message;
    }
  )(response);
};

export const getTokenEffect = async (request: GetOauthTokenSchemaType) => {
  const response = await getEmailSyncUseCases().getTokenUseCase.execute(
    new GetTokenUseCaseParam(request)
  );
  return fold<Failure, string, string>(
    failure => {
      throw failure;
    },
    message => {
      return message;
    }
  )(response);
};
