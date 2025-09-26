import {container} from "tsyringe";
import {UserNetwork} from "@/features/user/data/datasource/user.network";
import {IUserDatasource, UserDataSource} from "@/features/user/data/datasource/user.datasource";
import {UserRepository} from "@/features/user/data/repository/user.repository";
import {GetUserUseCase} from "@/features/user/domain/use-case/get-user";


export function configureUserContainer(){
    // Register network/data dependencies
    container.registerSingleton<UserNetwork>(UserNetwork);
    container.register<IUserDatasource>('UserRepository', {
        useClass: UserDataSource,
    });

    // Register domain layer dependency
    container.register<IUserDatasource>('UserDataSource', {
        useClass: UserDataSource,
    })
    container.registerSingleton<GetUserUseCase>(GetUserUseCase);
}

export function getUserUseCases(){return {getUserUseCase: container.resolve(GetUserUseCase)}}