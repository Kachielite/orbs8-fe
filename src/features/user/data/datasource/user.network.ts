import {inject, injectable} from 'tsyringe';

import extractErrorNetwork from '@/core/helpers/extract-error-network';
import CustomAxios from '@/core/network/custom-axios';
import {UpdatePasswordSchemaType, UpdateUserSchemaType} from "@/features/user/presentation/validation/user.validation";

@injectable()
export class UserNetwork {
    private readonly authPath = '/auth';
  private readonly userPath = '/auth/me';

  constructor(@inject(CustomAxios) private readonly axios: CustomAxios) {}

  public async getUser() {
    try {
      const response = await this.axios.getInstance().get(this.userPath);
      return response.data;
    } catch (error) {
      throw extractErrorNetwork(error, 'UserNetwork:getUser');
    }
  }

    public async updateUser(request: UpdateUserSchemaType) {
        try {
            const response = await this.axios.getInstance().put(this.authPath, request);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'UserNetwork:updateUser');
        }
    }

    public async updatePassword(request: UpdatePasswordSchemaType) {
        try {
            const response = await this.axios.getInstance().put(this.authPath, request);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'UserNetwork:updatePassword');
        }
    }
}

