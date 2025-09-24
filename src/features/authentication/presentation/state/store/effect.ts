import {
    LoginSchemaType,
    LoginWithGoogleSchemaType,
    RegisterSchemaType,
    RequestPasswordResetSchemaType,
    ResetPasswordSchemaType
} from "@/features/authentication/presentation/validation/auth.validation";
import {getAuthUseCases} from "@/core/init-dependencies/auth.dependency";
import {LoginUseCaseParam} from "@/features/authentication/domain/use-case/login";
import {Failure} from "@/core/errors/failure.error";
import {AuthEntity} from "@/features/authentication/domain/entity/auth.entity";
import {fold} from "fp-ts/Either";
import {LoginWithGoogleUseCaseParam} from "@/features/authentication/domain/use-case/login-with-google";
import {RegisterUseCaseParam} from "@/features/authentication/domain/use-case/register";
import {RequestPasswordResetUseCaseParam} from "@/features/authentication/domain/use-case/request-password-reset";
import {ResetPasswordUseCaseParam} from "@/features/authentication/domain/use-case/reset-password";

export const loginEffect = async (payload: LoginSchemaType) => {
    const response = await getAuthUseCases().loginUseCase.execute(
        new LoginUseCaseParam(payload)
    );

    return fold<Failure, AuthEntity, AuthEntity>(
        (failure) => {
            throw failure
        },
        (auth) => auth,
    )(response)
}

const loginWithGoogleEffect = async (payload: LoginWithGoogleSchemaType) => {
    const response = await getAuthUseCases().loginWithGoogleUseCase.execute(
        new LoginWithGoogleUseCaseParam(payload)
    );

    return fold<Failure, string, string>(
        (failure) => {
            throw failure
        },
        (token) => token,
    )(response)
}

export const registerEffect = async (payload: RegisterSchemaType) => {
    const response = await getAuthUseCases().registerUseCase.execute(
        new RegisterUseCaseParam(payload)
    );

    return fold<Failure, string, string>(
        (failure) => {
            throw failure
        },
        (res) => res,
    )(response)

}

export const requestPasswordResetEffect = async (payload: RequestPasswordResetSchemaType) => {
    const response = await getAuthUseCases().requestPasswordResetUseCase.execute(
        new RequestPasswordResetUseCaseParam(payload)
    );

    return fold<Failure, string, string>(
        (failure) => {
            throw failure
        },
        (res) => res,
    )(response)
}

export const resetPasswordEffect = async (payload: ResetPasswordSchemaType) => {
    const response = await getAuthUseCases().resetPasswordUseCase.execute(
        new ResetPasswordUseCaseParam(payload)
    );

    return fold<Failure, string, string>(
        (failure) => {
            throw failure
        },
        (res) => res,
    )(response)
}
