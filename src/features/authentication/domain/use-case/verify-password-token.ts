import {VerifyPasswordResetTokenSchemaType} from "@/features/authentication/presentation/validation/auth.validation";
import {UseCase} from "@/core/use-case";
import {inject, injectable} from "tsyringe";
import {type AuthRepository} from "@/features/authentication/domain/repository/auth.repository";
import {Failure} from "@/core/errors/failure.error";
import {Either} from "fp-ts/lib/Either";

export class VerifyPasswordTokenUseCaseParam {
    constructor(
        public payload: VerifyPasswordResetTokenSchemaType
    ) {
    }
}

@injectable()
export class VerifyPasswordTokenUseCase implements UseCase<string, VerifyPasswordTokenUseCaseParam> {
    constructor(@inject('AuthRepository') private readonly authRepository: AuthRepository) {
    }

    async execute(params: VerifyPasswordTokenUseCaseParam): Promise<Either<Failure, string>> {
        return this.authRepository.verifyPasswordResetToken(params.payload);
    }
}