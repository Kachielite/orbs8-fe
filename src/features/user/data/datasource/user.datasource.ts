import {inject, injectable} from 'tsyringe';

import extractErrorRepository from '@/core/helpers/extract-error-respository';
import {UserNetwork} from '@/features/user/data/datasource/user.network';
import {UserModel} from '@/features/user/data/model/user.model';
import {UpdatePasswordSchemaType, UpdateUserSchemaType} from "@/features/user/presentation/validation/user.validation";

export interface IUserDatasource {
  getUser(): Promise<UserModel>;

    updateUser(request: UpdateUserSchemaType): Promise<string>;

    updatePassword(request: UpdatePasswordSchemaType): Promise<string>;
}

@injectable()
export class UserDataSource implements IUserDatasource {
  constructor(@inject(UserNetwork) private readonly userNetwork: UserNetwork) {}

  public async getUser(): Promise<UserModel> {
    try {
      const response = await this.userNetwork.getUser();
      return UserModel.fromJSON(response);
    } catch (error) {
      throw extractErrorRepository(error, 'UserDataSource:getUser');
    }
  }

    public async updateUser(request: UpdateUserSchemaType): Promise<string> {
        try {
            return await this.userNetwork.updateUser(request);
        } catch (error) {
            throw extractErrorRepository(error, 'UserDataSource:updateUser');
        }
    }

    public async updatePassword(request: UpdatePasswordSchemaType): Promise<string> {
        try {
            return await this.userNetwork.updatePassword(request);
        } catch (error) {
            throw extractErrorRepository(error, 'UserDataSource:updatePassword');
        }
    }
}
