import {inject, injectable} from "tsyringe";
import CustomAxios from "@/core/network/custom-axios";
import extractErrorNetwork from "@/core/helpers/extract-error-network";

@injectable()
export class UserNetwork {
    private readonly userPath = '/auth/me';

    constructor(
        @inject(CustomAxios) private readonly axios: CustomAxios
    ) {}

    public async getUser() {
        try {
            const response = await this.axios.getInstance().get(this.userPath);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'UserNetwork:getUser');
        }
    }
}