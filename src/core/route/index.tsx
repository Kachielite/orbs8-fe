import {createBrowserRouter} from 'react-router-dom';
import AuthLayout from "@/core/common/presentation/components/layouts/auth.layout";
import ErrorPage from "@/core/common/presentation/pages/error.page";
import LoginPage from "@/features/authentication/presentation/pages/login.page";
import ForgetPasswordPage from "@/features/authentication/presentation/pages/forget-password.page";
import OtpPage from "@/features/authentication/presentation/pages/otp.page";
import ResetPasswordPage from "@/features/authentication/presentation/pages/reset-password.page";
import NotFoundPage from "@/core/common/presentation/pages/not-found.page";
import {publicOnlyLoader} from "@/core/route/auth-utils";


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
        path: 'forgot-password',
        element: <ForgetPasswordPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'otp',
        element: <OtpPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
        loader: publicOnlyLoader,
        errorElement: <ErrorPage />,
      },

      // // Protected routes
      // {
      //   path: '/',
      //   element: <DashboardLayout />,
      //   errorElement: <ErrorPage />,
      //   loader: protectedLoader,
      //   children: [
      //     {
      //       path: '',
      //       element: <OverviewPage />,
      //       errorElement: <ErrorPage />,
      //     },
      //   ],
      // },
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