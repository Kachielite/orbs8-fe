import {
    LoginSchemaType,
    LoginWithGoogleSchemaType,
    RefreshTokenSchemaType,
    RegisterSchemaType,
    RequestPasswordResetSchemaType,
    ResetPasswordSchemaType
} from "@/features/authentication/presentation/validation/auth.validation";
import {AuthModel} from "@/features/authentication/data/model/auth.model";
import {inject, injectable} from "tsyringe";
import {AuthNetwork} from "@/features/authentication/data/datasource/auth.network";
import extractErrorDatasource from "@/core/helpers/extract-error-datasource";

export interface AuthDataSource {
    login(payload: LoginSchemaType): Promise<AuthModel>
    register(payload: RegisterSchemaType): Promise<string>
    refreshToken(payload: RefreshTokenSchemaType): Promise<AuthModel>
    loginWithGoogle(payload: LoginWithGoogleSchemaType): Promise<string>
    requestPasswordReset(payload: RequestPasswordResetSchemaType): Promise<string>
    resetPassword(payload: ResetPasswordSchemaType): Promise<string>
}

@injectable()
export class AuthDataSourceImpl implements AuthDataSource {
    private readonly authNetwork: AuthNetwork;

    constructor(@inject(AuthNetwork) authNetwork: AuthNetwork) {
        this.authNetwork = authNetwork;
    }

    async login(payload: LoginSchemaType): Promise<AuthModel> {
        try {
            const response = await this.authNetwork.login(payload);
            return AuthModel.from(response);
        } catch (error) {
            throw extractErrorDatasource(error, 'AuthDataSourceImpl:Login');
        }
    }

    async register(payload: RegisterSchemaType): Promise<string> {
        try {
            return await this.authNetwork.register(payload);
        } catch (error) {
            throw extractErrorDatasource(error, 'AuthDataSourceImpl:Register');
        }
    }

    async refreshToken(payload: RefreshTokenSchemaType): Promise<AuthModel> {
        try {
            const response = await this.authNetwork.refreshToken(payload);
            return AuthModel.from(response);
        } catch (error) {
            throw extractErrorDatasource(error, 'AuthDataSourceImpl:RefreshToken');
        }
    }

    async loginWithGoogle(payload: LoginWithGoogleSchemaType): Promise<string> {
        try {
            return await this.authNetwork.loginWithGoogle(payload);
        } catch (error) {
            throw extractErrorDatasource(error, 'AuthDataSourceImpl:LoginWithGoogle');
        }
    }

    async requestPasswordReset(payload: RequestPasswordResetSchemaType): Promise<string> {
        try {
            return await this.authNetwork.requestPasswordReset(payload);
        } catch (error) {
            throw extractErrorDatasource(error, 'AuthDataSourceImpl:RequestPasswordReset');
        }
    }

    async resetPassword(payload: ResetPasswordSchemaType): Promise<string> {
        try {
            return await this.authNetwork.resetPassword(payload);
        } catch (error) {
            throw extractErrorDatasource(error, 'AuthDataSourceImpl:ResetPassword');
        }
    }
}