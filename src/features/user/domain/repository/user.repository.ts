import {Either} from 'fp-ts/lib/Either';

import {Failure} from '@/core/errors/failure.error';
import {UserEntity} from '@/features/user/domain/entity/user.entity';
import {UpdatePasswordSchemaType, UpdateUserSchemaType,} from '@/features/user/presentation/validation/user.validation';

export interface IUserRepository {
  getUser(): Promise<Either<Failure, UserEntity>>;

    updateUser(request: UpdateUserSchemaType): Promise<Either<Failure, string>>;

    updatePassword(
        request: UpdatePasswordSchemaType
    ): Promise<Either<Failure, string>>;
}
