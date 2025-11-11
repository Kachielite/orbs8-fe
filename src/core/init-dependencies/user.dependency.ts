import {container} from 'tsyringe';

import {IUserDatasource, UserDataSource,} from '@/features/user/data/datasource/user.datasource';
import {UserNetwork} from '@/features/user/data/datasource/user.network';
import {UserRepository} from '@/features/user/data/repository/user.repository';
import {IUserRepository} from '@/features/user/domain/repository/user.repository';
import {GetUserUseCase} from '@/features/user/domain/use-case/get-user';
import {UpdatePassword} from '@/features/user/domain/use-case/update-password';
import {UpdateUser} from '@/features/user/domain/use-case/update-user';

export function configureUserContainer() {
  // Register network/data dependencies
  container.registerSingleton<UserNetwork>(UserNetwork);
  container.register<IUserDatasource>('UserDataSource', {
    useClass: UserDataSource,
  });

  // Register domain layer dependency
  container.register<IUserRepository>('UserRepository', {
    useClass: UserRepository,
  });
  container.registerSingleton<GetUserUseCase>(GetUserUseCase);
    container.registerSingleton<UpdateUser>(UpdateUser);
    container.registerSingleton<UpdatePassword>(UpdatePassword);
}

export function getUserUseCases() {
    return {
        getUserUseCase: container.resolve(GetUserUseCase),
        updateUserUseCase: container.resolve(UpdateUser),
        updatePasswordUseCase: container.resolve(UpdatePassword),
    };
}
