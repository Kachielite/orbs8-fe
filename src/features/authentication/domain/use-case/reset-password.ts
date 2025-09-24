import {ResetPasswordSchemaType} from "@/features/authentication/presentation/validation/auth.validation";
import {UseCase} from "@/core/use-case";
import {type AuthRepository} from "@/features/authentication/domain/repository/auth.repository";
import {inject, injectable} from "tsyringe";
import type {Either} from "fp-ts/Either";
import {Failure} from "@/core/errors/failure.error";

export class ResetPasswordUseCaseParam {
    constructor(
        public readonly payload: ResetPasswordSchemaType,
    ) {
    }
}

@injectable()
export class ResetPasswordUseCase implements UseCase<string, ResetPasswordUseCaseParam> {
    constructor(@inject('AuthRepository') private readonly authRepository: AuthRepository) {}

    async execute(params: ResetPasswordUseCaseParam): Promise<Either<Failure, string>> {
        return this.authRepository.resetPassword(params.payload);
    }
}