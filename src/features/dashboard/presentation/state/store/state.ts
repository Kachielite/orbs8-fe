import moment from 'moment/moment';

export const initialDashboardState = {
  dashboardTransactionsSummary: null,
  dashboardAccountsSummary: null,
  dashboardRecentTransactions: null,
  dashboardTransactionsByTypes: null,
  dashboardSpendingByBanks: null,
    dashboardStartDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    dashboardEndDate: moment().format('YYYY-MM-DD'),
};
