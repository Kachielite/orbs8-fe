import {inject, injectable} from "tsyringe";
import {IUserRepository} from "@/features/user/domain/repository/user.repository";
import {type IUserDataSource} from "@/features/user/data/datasource/IUserDataSource";
import {Failure} from "@/core/errors/failure.error";
import {Either, right} from "fp-ts/lib/Either";
import {UserEntity} from "../../domain/entity/user.entity";
import extractErrorRepository from "@/core/helpers/extract-error-respository";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @inject('UserDataSource') private readonly userDataSource: IUserDataSource,
    ) {
    }

    async getUser(): Promise<Either<Failure, UserEntity>> {
        try {
            const response = await this.userDataSource.getUser();
            return right(response)
        } catch (error) {
            throw extractErrorRepository(error, 'UserRepository:getUsers')
        }
    }
}