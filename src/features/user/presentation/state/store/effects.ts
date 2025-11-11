import {fold} from 'fp-ts/Either';

import {Failure} from '@/core/errors/failure.error';
import {getUserUseCases} from '@/core/init-dependencies/user.dependency';
import {NoParams} from '@/core/use-case';
import {UserEntity} from '@/features/user/domain/entity/user.entity';
import {UpdatePasswordParam} from "@/features/user/domain/use-case/update-password";
import {UpdateUserParam} from "@/features/user/domain/use-case/update-user";
import {UpdatePasswordSchemaType, UpdateUserSchemaType} from "@/features/user/presentation/validation/user.validation";

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

export const updateUserEffect = async (request: UpdateUserSchemaType): Promise<string> => {
    const response = await getUserUseCases().updateUserUseCase.execute(
        new UpdateUserParam(request)
    );

    return fold<Failure, string, string>(
        failure => {
            throw failure;
        },
        success => {
            return success;
        }
    )(response);

};

export const updatePasswordEffect = async (request: UpdatePasswordSchemaType): Promise<string> => {
    const response = await getUserUseCases().updatePasswordUseCase.execute(
        new UpdatePasswordParam(request)
    );

    return fold<Failure, string, string>(
        failure => {
            throw failure;
        },
        success => {
            return success;
        }
    )(response);

};

