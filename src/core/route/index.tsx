import {createBrowserRouter} from 'react-router-dom';

import AuthLayout from '@/core/common/presentation/components/layouts/auth.layout';
import DashboardLayout from '@/core/common/presentation/components/layouts/dashboard.layout';
import ErrorPage from '@/core/common/presentation/pages/error.page';
import NotFoundPage from '@/core/common/presentation/pages/not-found.page';
import {protectedLoader, publicOnlyLoader} from '@/core/route/auth-utils';
import AccountsPage from '@/features/accounts/presentation/pages/accounts.page';
import ForgetPasswordPage from '@/features/authentication/presentation/pages/forget-password.page';
import LoginPage from '@/features/authentication/presentation/pages/login.page';
import RegisterPage from '@/features/authentication/presentation/pages/register.page';
import ResetPasswordPage from '@/features/authentication/presentation/pages/reset-password.page';
import DashboardPage from '@/features/dashboard/presentation/pages/dashboard.page';
import LinkEmailPage from '@/features/email/presentation/pages/link-email.page';
import InsightsPage from '@/features/insights/presentation/pages/insights.page';
import NotificationPage from '@/features/notification/presentation/pages/notification.page';
import SettingsPage from '@/features/settings/presentation/pages/settings.page';
import TransactionsPage from '@/features/transactions/presentation/pages/transactions.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Authentication routes (public only - redirect if already authenticated)
      {
        path: 'login',
        element: <LoginPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'forget-password',
        element: <ForgetPasswordPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },
        {
            path: '/link-email',
            element: <LinkEmailPage/>,
            errorElement: <ErrorPage/>,
        },
      // // Protected routes
      {
        path: '/',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        loader: protectedLoader,
        children: [
          {
            path: '',
            element: <DashboardPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/transactions',
            element: <TransactionsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/accounts',
            element: <AccountsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/insights',
            element: <InsightsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/settings',
            element: <SettingsPage />,
            errorElement: <ErrorPage />,
          },
            {
                path: '/notifications',
                element: <NotificationPage/>,
                errorElement: <ErrorPage/>,
            },
        ],
      },
    ],
  },
  // Catch-all route for 404
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
