import {AuthEntity} from "@/features/authentication/domain/entity/auth.entity";

export class AuthModel extends AuthEntity{
    constructor(
        public accessToken: string,
        public refreshToken: string,
    ) {
        super(accessToken, refreshToken);
    }

    static from(auth: AuthEntity): AuthModel {
        return new AuthModel(auth.accessToken, auth.refreshToken);
    }
}