import moment from 'moment';

export const initialTransactionState = {
  transaction: null,
  transactions: null,
  transactionSummary: null,
    transactionStartDate: moment().startOf('month').format('YYYY-MM-DD'),
    transactionEndDate: moment().endOf('month').format('YYYY-MM-DD'),
};

