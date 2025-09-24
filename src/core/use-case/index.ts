import type {Either} from 'fp-ts/Either';
import {Failure} from "@/core/errors/failure.error";

export abstract class UseCase<T, P> {
  abstract execute(params: P): Promise<Either<Failure, T>>;
}

export class NoParams {}