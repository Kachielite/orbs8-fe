import { AxiosError } from 'axios';

import { ServerException } from '@/core/errors/server.error';

const extractErrorNetwork = (error: unknown, handler: string): string => {
  console.error(handler, error);
  if (error instanceof AxiosError) {
    // check of error is an array
    if (Array.isArray(error.response?.data?.message)) {
      throw new ServerException(error.response?.data?.message.join(', '));
    } else if (typeof error.response?.data?.message === 'string') {
      throw new ServerException(error.response?.data?.message);
    }
  }

  throw new ServerException('An unknown error occurred');
};

export default extractErrorNetwork;
