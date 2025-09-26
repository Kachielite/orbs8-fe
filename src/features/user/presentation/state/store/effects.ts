import {getUserUseCases} from "@/core/init-dependencies/user.depencey";
import {NoParams} from "@/core/use-case";
import {Failure} from "@/core/errors/failure.error";
import {UserEntity} from "@/features/user/domain/entity/user.entity";
import {fold} from "fp-ts/Either";

export const getUserEffect = async () => {
    const response = await getUserUseCases().getUserUseCase.execute(
        new NoParams()
    );

    fold<Failure, UserEntity, UserEntity>(
        failure => {
            throw failure;
        },
        user => {
            return user;
        }
    )(response);
}