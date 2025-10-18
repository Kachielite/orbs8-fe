import moment from 'moment/moment';

export const initialDashboardState = {
  dashboardTransactionsSummary: null,
  dashboardAccountsSummary: null,
  dashboardRecentTransactions: null,
  dashboardTransactionsByTypes: null,
  dashboardSpendingByBanks: null,
  dashboardStartDate: moment().startOf('month').format('YYYY-MM-DD'),
  dashboardEndDate: moment().endOf('month').format('YYYY-MM-DD'),
};
