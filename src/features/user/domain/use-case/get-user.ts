import { NoParams, UseCase } from '@/core/use-case';
import { UserEntity } from '@/features/user/domain/entity/user.entity';
import { inject, injectable } from 'tsyringe';
import { type IUserRepository } from '@/features/user/domain/repository/user.repository';
import { Failure } from '@/core/errors/failure.error';
import { Either } from 'fp-ts/lib/Either';

@injectable()
export class GetUserUseCase implements UseCase<UserEntity, NoParams> {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute(_params: NoParams): Promise<Either<Failure, UserEntity>> {
    return this.userRepository.getUser();
  }
}
