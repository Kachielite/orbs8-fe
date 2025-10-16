import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Toaster} from 'sonner';

import App from '@/App';
import '@/index.css';
import {configureAccountsContainer} from '@/core/init-dependencies/accounts.dependency';
import {configureAuthContainer} from '@/core/init-dependencies/auth.dependency';
import {configureCustomAxiosContainer} from '@/core/init-dependencies/custom-axois.dependency';
import {configureEmailSyncContainer} from '@/core/init-dependencies/email-sync.dependency';
import {configureTransactionsContainer} from "@/core/init-dependencies/transaction.dependency";
import {configureUserContainer} from '@/core/init-dependencies/user.dependency';

// Initialize dependencies
configureCustomAxiosContainer();
configureAuthContainer();
configureUserContainer();
configureEmailSyncContainer();
configureAccountsContainer();
configureTransactionsContainer();

// React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster position="top-center" richColors duration={5000} closeButton />
  </QueryClientProvider>
);
