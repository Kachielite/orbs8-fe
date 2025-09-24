export class AuthEntity {
    constructor(
        public accessToken: string,
        public refreshToken: string
    ) {}
}