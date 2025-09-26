import type {AxiosInstance} from 'axios';
import axios from 'axios';
import {injectable} from 'tsyringe';

@injectable()
class AxiosClient {
  //TODO: add refresh token logic
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
    });
    this.setupRequestInterceptor();
    this.handleUnauthorized();
  }

  setupRequestInterceptor() {
    this.instance.interceptors.request.use(async (config) => {
        const token = this.getToken();
      if (token) {
        const setup = { ...config };
        setup.headers.Authorization = `Bearer ${token}`;

        return setup;
      }

      return config;
    });
  }

  handleUnauthorized() {
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 ||
          error.response?.data?.message === 'Unauthorized'
        ) {
          window.localStorage.clear();
          window.sessionStorage.clear();
          window.location.replace('/login');
          return error;
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  private getToken(): string | null {
      const persistentState =  localStorage.getItem('auth-state');
      const authState = persistentState ? JSON.parse(persistentState) : null;
      if(authState && authState.auth) {
        return authState.auth.accessToken;
      }
      return null;
  }
}

export default AxiosClient;