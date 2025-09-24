import {LoginWithGoogleSchemaType} from "@/features/authentication/presentation/validation/auth.validation";
import {UseCase} from "@/core/use-case";
import {inject, injectable} from "tsyringe";
import {type AuthRepository} from "@/features/authentication/domain/repository/auth.repository";
import {Failure} from "@/core/errors/failure.error";
import {Either} from "fp-ts/lib/Either";

export class LoginWithGoogleUseCaseParam {
    constructor(
        public readonly payload: LoginWithGoogleSchemaType,
    ) {
    }
}

@injectable()
export class LoginWithGoogleUseCase implements UseCase<string, LoginWithGoogleUseCaseParam> {
    constructor(@inject('AuthRepository') private readonly authRepository: AuthRepository) {
    }

    async execute(params: LoginWithGoogleUseCaseParam): Promise<Either<Failure, string>> {
        return this.authRepository.loginWithGoogle(params.payload);
    }


}