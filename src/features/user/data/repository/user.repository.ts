import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/features/user/domain/repository/user.repository';
import { Failure } from '@/core/errors/failure.error';
import { Either, right } from 'fp-ts/lib/Either';
import { UserEntity } from '../../domain/entity/user.entity';
import extractErrorRepository from '@/core/helpers/extract-error-respository';
import { type IUserDatasource } from '@/features/user/data/datasource/user.datasource';

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
}
