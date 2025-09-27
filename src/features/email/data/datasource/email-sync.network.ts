import {inject, injectable} from 'tsyringe';
import CustomAxios from '@/core/network/custom-axios';
import extractErrorNetwork from '@/core/helpers/extract-error-network';
import {
    GetOauthTokenSchemaType,
    ManualSyncRequestSchemaType
} from '@/features/email/presentation/validation/email-sync';

@injectable()
export class EmailSyncNetwork {
  private readonly emailPath = '/email';

  constructor(@inject(CustomAxios) private readonly axios: CustomAxios) {}

  public async getOAuthUrl() {
    try {
      const url = `${this.emailPath}/get-auth`;
      const response = await this.axios.getInstance().get(url);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'UserNetwork:getOAuthUrl');
    }
  }

  public async getToken(request: GetOauthTokenSchemaType) {
    try {
      const url = `${this.emailPath}/get-token`;
      const response = await this.axios.getInstance().post(url, request);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'UserNetwork:getToken');
    }
  }

  public async getSyncStatus() {
    try {
      const url = `${this.emailPath}/sync-status`;
      const response = await this.axios.getInstance().get(url);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'UserNetwork:getSyncStatus');
    }
  }

  public async syncEmail(request: ManualSyncRequestSchemaType) {
    try {
      const url = `${this.emailPath}/manual-sync`;
      const response = await this.axios.getInstance().post(url, request);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'UserNetwork:syncEmail');
    }
  }
}
