import {AxiosError} from 'axios';

const extractErrorNetwork = (error: unknown, handler: string): string => {
  console.error(handler, error);
  if (error instanceof AxiosError) {
    // check of error is an array
    if (Array.isArray(error.response?.data?.message)) {
      return error.response?.data?.message.join(', ');
    } else if (typeof error.response?.data?.message === 'string') {
      return error.response?.data?.message;
    }
  }

  return 'An unknown error occurred';
};

export default extractErrorNetwork;