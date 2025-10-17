import { fold } from 'fp-ts/Either';

import { Failure } from '@/core/errors/failure.error';
import { getBankUseCases } from '@/core/init-dependencies/bank.dependency';
import { NoParams } from '@/core/use-case';
import { BankEntity } from '@/features/bank/domain/entity/bank.entity';
import { GetBankByIdParam } from '@/features/bank/domain/use-case/get-bank-by-id';

export const getBankByIdEffect = async (id: number) => {
  const response = await getBankUseCases().getBankById.execute(
    new GetBankByIdParam(id)
  );

  return fold<Failure, BankEntity, BankEntity>(
    failure => {
      throw failure;
    },
    bank => {
      return bank;
    }
  )(response);
};

export const getBanksEffect = async () => {
  const response = await getBankUseCases().getBanks.execute(new NoParams());

  return fold<Failure, BankEntity[], BankEntity[]>(
    failure => {
      throw failure;
    },
    banks => {
      return banks;
    }
  )(response);
};
