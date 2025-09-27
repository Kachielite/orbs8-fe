import { IEmailSyncRepository } from '@/features/email/domain/repository/email-sync.repository';
import { inject, injectable } from 'tsyringe';
import { type IEmailSyncDataSource } from '@/features/email/data/datasource/email-sync.datasource';
import { Failure } from '@/core/errors/failure.error';
import { Either, right } from 'fp-ts/lib/Either';
import { GetOauthTokenSchemaType } from '../../presentation/validation/email-sync';
import { EmailSyncStatusModel } from '../model/email-sync-status.model';
import extractErrorRepository from '@/core/helpers/extract-error-respository';

@injectable()
export class EmailSyncRepository implements IEmailSyncRepository {
  constructor(
    @inject('IEmailDatasource')
    private readonly emailDatasource: IEmailSyncDataSource
  ) {}

  async getOAuthUrl(): Promise<Either<Failure, string>> {
    try {
      const response = await this.emailDatasource.getOAuthUrl();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncRepository:getOAuthUrl');
    }
  }

  async getToken(
    request: GetOauthTokenSchemaType
  ): Promise<Either<Failure, string>> {
    try {
      const response = await this.emailDatasource.getToken(request);
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncRepository:getToken');
    }
  }

  async getSyncStatus(): Promise<Either<Failure, EmailSyncStatusModel>> {
    try {
      const response = await this.emailDatasource.getSyncStatus();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncRepository:getSyncStatus');
    }
  }

  async syncEmail(): Promise<Either<Failure, string>> {
    try {
      const response = await this.emailDatasource.syncEmail();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncRepository:syncEmail');
    }
  }
}
