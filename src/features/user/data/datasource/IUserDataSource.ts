import {UserModel} from "@/features/user/data/model/user.model";
import {UserNetwork} from "@/features/user/data/datasource/user.network";
import {inject, injectable} from "tsyringe";
import extractErrorRepository from "@/core/helpers/extract-error-respository";

export interface IUserDataSource {
    getUser():Promise<UserModel>;
}

@injectable()
export class UserDataSource implements UserDataSource {
    constructor(
        @inject(UserNetwork) private readonly userNetwork: UserNetwork,
    ) {}

    public async getUser(): Promise<UserModel> {
        try {
            const response = await this.userNetwork.getUser();
            return UserModel.fromJSON(response);
        } catch (error) {
            throw extractErrorRepository(error, 'UserDataSource:getUser');
        }
    }
}