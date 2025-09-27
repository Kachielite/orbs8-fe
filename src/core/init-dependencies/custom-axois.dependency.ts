import { container } from 'tsyringe';
import AxiosClient from '../network/custom-axios';

export function configureCustomAxiosContainer() {
  container.registerSingleton('AxiosClient', AxiosClient);
}
