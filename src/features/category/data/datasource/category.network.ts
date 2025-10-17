import {inject, injectable} from "tsyringe";

import {BASE_URL} from "@/core/constants/env.constants";
import extractErrorNetwork from "@/core/helpers/extract-error-network";
import CustomAxios from "@/core/network/custom-axios";

@injectable()
export class CategoryNetworkDataSource {
    private readonly categoryPath = `${BASE_URL}/category`;

  constructor(@inject(CustomAxios) private readonly axios: CustomAxios) {}

    public async getCategories() {
        try {
            const response = await this.axios.getInstance().get(this.categoryPath);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'CategoryNetworkDataSource:getCategories');
        }
    }

    public async getCategoryById(id: number) {
        try {
            const response = await this.axios.getInstance().get(`${this.categoryPath}/${id}`);
            return response.data;
        } catch (error) {
            throw extractErrorNetwork(error, 'CategoryNetworkDataSource:getCategoryById');
        }
    }
}