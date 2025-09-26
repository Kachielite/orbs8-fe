import {container} from "tsyringe";
import AxiosClient from "../network/custom-axios";

export function configureCustomAxiosContainer(){
    container.registerSingleton("AxiosClient", AxiosClient);
}

const axiosClient = container.resolve<AxiosClient>("AxiosClient");
const customAxiosInstance = axiosClient.getInstance();

export default customAxiosInstance;
