import { fold } from 'fp-ts/Either';

import { Failure } from '@/core/errors/failure.error';
import { getEmailSyncUseCases } from '@/core/init-dependencies/email-sync.dependency';
import { NoParams } from '@/core/use-case';
import { EmailSyncStatusEntity } from '@/features/email/domain/entity/email-sync-status.entity';
import { GetTokenUseCaseParam } from '@/features/email/domain/use-case/get-token';
import { VerifyEmailLabelUseCaseParam } from '@/features/email/domain/use-case/verify-email-label';
import { GetOauthTokenSchemaType } from '@/features/email/presentation/validation/email-sync';

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

export const syncEmailEffect = async () => {
  const response = await getEmailSyncUseCases().syncEmailUseCase.execute(
    new NoParams()
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

export const verifyAccessToEmailLabelEffect = async (labelName: string) => {
  const response = await getEmailSyncUseCases().verifyEmailLabelUseCase.execute(
    new VerifyEmailLabelUseCaseParam(labelName)
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
