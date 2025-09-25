import { Failure } from '@/core/errors/failure.error';

export const extractErrorHooks = (error: unknown, hookName: string) => {
  console.log('instace of error', error instanceof Failure);
  const errorMessage =
    error instanceof Failure ? error.message : 'An unknown error occurred';
  console.error(`${hookName}: ${errorMessage}`);
  return errorMessage;
};
