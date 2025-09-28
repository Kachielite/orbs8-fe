import { getUserUseCases } from '@/core/init-dependencies/user.dependency';
import { NoParams } from '@/core/use-case';
import { Failure } from '@/core/errors/failure.error';
import { UserEntity } from '@/features/user/domain/entity/user.entity';
import { fold } from 'fp-ts/Either';

export const getUserEffect = async (): Promise<UserEntity> => {
  const response = await getUserUseCases().getUserUseCase.execute(
    new NoParams()
  );

  return fold<Failure, UserEntity, UserEntity>(
    failure => {
      throw failure;
    },
    user => {
      return user;
    }
  )(response);
};
