import {injectable} from "tsyringe";
import {BASE_URL} from "@/core/constants/env.constants";
import {
    LoginSchemaType,
    LoginWithGoogleSchemaType,
    RefreshTokenSchemaType,
    RegisterSchemaType,
    RequestPasswordResetSchemaType,
    ResetPasswordSchemaType
} from "@/features/authentication/presentation/validation/auth.validation";
import axios from "axios";
import extractErrorNetwork from "@/core/helpers/extract-error-network";

@injectable()
export class AuthNetwork {
    private readonly authPath = `${BASE_URL}/auth`;

    public async login(payload: LoginSchemaType) {
        try {
            const response = await axios.post(`${this.authPath}/login`, payload);
            return response.data;
        } catch (error) {
            const errorMessage = extractErrorNetwork(error, 'AuthNetwork');
            throw new Error(errorMessage);
        }
    }

    public async register(payload: RegisterSchemaType) {
        try {
            const response = await axios.post(`${this.authPath}/register`, payload);
            return response.data;
        } catch (error) {
            const errorMessage = extractErrorNetwork(error, 'AuthNetwork');
            throw new Error(errorMessage);
        }
    }

    public async refreshToken(payload: RefreshTokenSchemaType) {
        try {
            const response = await axios.post(`${this.authPath}/refresh-token`, payload);
            return response.data;
        } catch (error) {
            const errorMessage = extractErrorNetwork(error, 'AuthNetwork');
            throw new Error(errorMessage);
        }
    }

    public async loginWithGoogle(payload: LoginWithGoogleSchemaType) {
        try {
            const response = await axios.get(`${this.authPath}/google`);
            return response.data;
        } catch (error) {
            const errorMessage = extractErrorNetwork(error, 'AuthNetwork');
            throw new Error(errorMessage);
        }
    }

    public async requestPasswordReset(payload: RequestPasswordResetSchemaType) {
        try {
            const response = await axios.get(`${this.authPath}/request-password-reset?email=${payload.email}`);
            return response.data;
        } catch (error) {
            const errorMessage = extractErrorNetwork(error, 'AuthNetwork');
            throw new Error(errorMessage);
        }
    }

    public async resetPassword(payload: ResetPasswordSchemaType) {
        try {
            const response = await axios.post(`${this.authPath}/reset-password`, payload);
            return response.data;
        } catch (error) {
            const errorMessage = extractErrorNetwork(error, 'AuthNetwork');
            throw new Error(errorMessage);
        }
    }
}