import {RequestPasswordResetSchemaType} from "@/features/authentication/presentation/validation/auth.validation";
import {inject, injectable} from "tsyringe";
import {UseCase} from "@/core/use-case";
import {type AuthRepository} from "@/features/authentication/domain/repository/auth.repository";
import {Failure} from "@/core/errors/failure.error";
import {Either} from "fp-ts/lib/Either";

export class RequestPasswordResetUseCaseParam {
    constructor(
        public readonly payload: RequestPasswordResetSchemaType,
    ) {
    }
}

@injectable()
export class RequestPasswordResetUseCase implements UseCase<string, RequestPasswordResetUseCaseParam> {
    constructor(@inject('AuthRepository') private readonly authRepository: AuthRepository) {
    }

    async execute(params: RequestPasswordResetUseCaseParam): Promise<Either<Failure, string>> {
        return this.authRepository.requestPasswordReset(params.payload);
    }

}