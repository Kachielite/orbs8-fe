import {Failure} from "@/core/errors/failure.error";
import {UserEntity} from "@/features/user/domain/entity/user.entity";
import {Either} from "fp-ts/lib/Either";

export interface IUserRepository {
    getUsers(): Promise<Either<Failure, UserEntity>>;
}