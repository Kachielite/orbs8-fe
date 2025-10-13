import {inject, injectable} from 'tsyringe';

import extractErrorDatasource from '@/core/helpers/extract-error-datasource';
import {EmailSyncNetwork} from '@/features/email/data/datasource/email-sync.network';
import {EmailSyncStatusModel} from '@/features/email/data/model/email-sync-status.model';
import {GetOauthTokenSchemaType,} from '@/features/email/presentation/validation/email-sync';

export interface IEmailSyncDataSource {
  getOAuthUrl(): Promise<string>;
  getToken(request: GetOauthTokenSchemaType): Promise<string>;
  getSyncStatus(): Promise<EmailSyncStatusModel>;
  syncEmail(): Promise<string>;
  verifyAccessToEmailLabel(labelName: string): Promise<string>;
}

@injectable()
export class EmailSyncDataSource implements IEmailSyncDataSource {
  constructor(
    @inject(EmailSyncNetwork)
    private readonly emailSyncNetwork: EmailSyncNetwork
  ) {}

  async getOAuthUrl(): Promise<string> {
    try {
      return await this.emailSyncNetwork.getOAuthUrl();
    } catch (error) {
      throw extractErrorDatasource(error, 'EmailSyncDataSource:getOAuthUrl');
    }
  }

  async getToken(request: GetOauthTokenSchemaType): Promise<string> {
    try {
      return await this.emailSyncNetwork.getToken(request);
    } catch (error) {
      throw extractErrorDatasource(error, 'EmailSyncDataSource:getToken');
    }
  }

  async getSyncStatus(): Promise<EmailSyncStatusModel> {
    try {
      const response = await this.emailSyncNetwork.getSyncStatus();
      return EmailSyncStatusModel.fromJSON(response);
    } catch (error) {
      throw extractErrorDatasource(error, 'EmailSyncDataSource:getSyncStatus');
    }
  }

  async syncEmail(): Promise<string> {
    try {
      return await this.emailSyncNetwork.syncEmail();
    } catch (error) {
      throw extractErrorDatasource(error, 'EmailSyncDataSource:syncEmail');
    }
  }

  async verifyAccessToEmailLabel(labelName: string): Promise<string> {
    try {
      return await this.emailSyncNetwork.verifyAccessToEmailLabel(labelName);
    } catch (error) {
      throw extractErrorDatasource(
        error,
        'EmailSyncDataSource:verifyAccessToEmailLabel'
      );
    }
  }
}
