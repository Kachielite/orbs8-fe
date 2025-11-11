import {Either} from "fp-ts/Either";
import {inject, injectable} from "tsyringe";

import {Failure} from "@/core/errors/failure.error";
import {UseCase} from "@/core/use-case";
import type {IUserRepository} from "@/features/user/domain/repository/user.repository";
import {UpdatePasswordSchemaType} from "@/features/user/presentation/validation/user.validation";

export class UpdatePasswordParam {
    constructor(
        public request: UpdatePasswordSchemaType
    ) {
    }
}

@injectable()
export class UpdatePassword implements UseCase<string, UpdatePasswordParam> {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository
    ) {
    }

    async execute(
        params: UpdatePasswordParam
    ): Promise<Either<Failure, string>> {
        return await this.userRepository.updatePassword(params.request);
    }
}