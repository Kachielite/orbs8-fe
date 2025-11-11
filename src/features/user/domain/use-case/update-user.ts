import {Either} from "fp-ts/Either";
import {inject, injectable} from "tsyringe";

import {Failure} from "@/core/errors/failure.error";
import {UseCase} from "@/core/use-case";
import {type IUserRepository} from '@/features/user/domain/repository/user.repository';
import {UpdateUserSchemaType} from "@/features/user/presentation/validation/user.validation";

export class UpdateUserParam {
    constructor(
        public request: UpdateUserSchemaType,
    ) {
    }
}


@injectable()
export class UpdateUser implements UseCase<string, UpdateUserParam> {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository
    ) {
    }

    async execute(
        params: UpdateUserParam
    ): Promise<Either<Failure, string>> {
        return await this.userRepository.updateUser(params.request);
    }
}