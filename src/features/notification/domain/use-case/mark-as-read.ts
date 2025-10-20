import {Either} from 'fp-ts/lib/Either';
import {inject, injectable} from 'tsyringe';

import {Failure} from '@/core/errors/failure.error';
import {UseCase} from '@/core/use-case';
import {type INotificationRepository} from '@/features/notification/domain/repository/notification.repository';

export class MarkAsReadParam {
    constructor(public readonly id: number) {
    }
}

@injectable()
export class MarkAsRead implements UseCase<string, MarkAsReadParam> {
    constructor(
        @inject('INotificationRepository')
        private readonly notificationRepository: INotificationRepository
    ) {
    }

    async execute(
        params: MarkAsReadParam
    ): Promise<Either<Failure, string>> {
        return await this.notificationRepository.markAsRead(params.id);
    }
}
