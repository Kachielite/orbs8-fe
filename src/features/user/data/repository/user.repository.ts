import {Either, right} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import {type IUserDatasource} from '@/features/user/data/datasource/user.datasource';
import {IUserRepository} from '@/features/user/domain/repository/user.repository';

import {UserEntity} from '../../domain/entity/user.entity';
import {UpdatePasswordSchemaType, UpdateUserSchemaType,} from '../../presentation/validation/user.validation';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject('UserDataSource') private readonly userDataSource: IUserDatasource
  ) {}

  async getUser(): Promise<Either<Failure, UserEntity>> {
    try {
      const response = await this.userDataSource.getUser();
      return right(response);
    } catch (error) {
      throw extractErrorRepository(error, 'UserRepository:getUsers');
    }
  }

    async updateUser(
        request: UpdateUserSchemaType
    ): Promise<Either<Failure, string>> {
        try {
            const response = await this.userDataSource.updateUser(request);
            return right(response);
        } catch (error) {
            throw extractErrorRepository(error, 'UserRepository:updateUser');
        }
    }

    async updatePassword(
        request: UpdatePasswordSchemaType
    ): Promise<Either<Failure, string>> {
        try {
            const response = await this.userDataSource.updatePassword(request);
            return right(response);
        } catch (error) {
            throw extractErrorRepository(error, 'UserRepository:updatePassword');
        }
    }
}
