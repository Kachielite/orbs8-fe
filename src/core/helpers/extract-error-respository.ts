import { Failure } from '@/core/errors/failure.error';
import { ServerException } from '@/core/errors/server.error';

const extractErrorRepository = (error: unknown, handlerName: string) => {
  console.error(handlerName, error);
  console.log(
    'instance of error',
    error instanceof ServerException,
    (error as ServerException).message
  );
  const errorMessage =
    error instanceof ServerException
      ? error.message
      : 'An unknown error occurred';
  return new Failure(errorMessage);
};

export default extractErrorRepository;
