import {RegisterSchemaType} from "@/features/authentication/presentation/validation/auth.validation";
import {UseCase} from "@/core/use-case";
import {inject, injectable} from "tsyringe";
import {type AuthRepository} from "@/features/authentication/domain/repository/auth.repository";
import {Failure} from "@/core/errors/failure.error";
import {Either} from "fp-ts/lib/Either";

export class RegisterUseCaseParam {
    constructor(
        public readonly payload: RegisterSchemaType,
    ) {
    }
}

@injectable()
export class RegisterUseCase implements UseCase<string, RegisterUseCaseParam> {
    constructor(@inject('AuthRepository') private readonly authRepository: AuthRepository) {}

    async execute(params: RegisterUseCaseParam): Promise<Either<Failure, string>> {
        return this.authRepository.register(params.payload);
    }
}