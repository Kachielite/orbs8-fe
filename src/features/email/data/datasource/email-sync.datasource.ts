import { inject, injectable } from 'tsyringe';
import {
  GetOauthTokenSchemaType,
  ManualSyncRequestSchemaType,
} from '@/features/email/presentation/validation/email-sync';
import { EmailSyncNetwork } from '@/features/email/data/datasource/email-sync.network';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { EmailSyncStatusModel } from '@/features/email/data/model/email-sync-status.model';

export interface IEmailSyncDataSource {
  getOAuthUrl(): Promise<string>;
  getToken(request: GetOauthTokenSchemaType): Promise<string>;
  getSyncStatus(): Promise<EmailSyncStatusModel>;
  syncEmail(request: ManualSyncRequestSchemaType): Promise<string>;
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
      throw extractErrorRepository(error, 'EmailSyncDataSource:getOAuthUrl');
    }
  }

  async getToken(request: GetOauthTokenSchemaType): Promise<string> {
    try {
      return await this.emailSyncNetwork.getToken(request);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncDataSource:getToken');
    }
  }

  async getSyncStatus(): Promise<EmailSyncStatusModel> {
    try {
      const response = await this.emailSyncNetwork.getSyncStatus();
      return EmailSyncStatusModel.fromJSON(response);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncDataSource:getSyncStatus');
    }
  }

  async syncEmail(request: ManualSyncRequestSchemaType): Promise<string> {
    try {
      return await this.emailSyncNetwork.syncEmail(request);
    } catch (error) {
      throw extractErrorRepository(error, 'EmailSyncDataSource:syncEmail');
    }
  }

  async verifyAccessToEmailLabel(labelName: string): Promise<string> {
    try {
      return await this.emailSyncNetwork.verifyAccessToEmailLabel(labelName);
    } catch (error) {
      throw extractErrorRepository(
        error,
        'EmailSyncDataSource:verifyAccessToEmailLabel'
      );
    }
  }
}
