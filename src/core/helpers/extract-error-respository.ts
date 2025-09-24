import {Failure} from "@/core/errors/failure.error";
import {ServerException} from "@/core/errors/server.error";

const extractErrorRepository = (error: unknown, handlerName: string) => {
  console.error(handlerName, error);
  const errorMessage =
    error instanceof ServerException
      ? error.message
      : 'An unknown error occurred';
  return new Failure(errorMessage);
};

export default extractErrorRepository;