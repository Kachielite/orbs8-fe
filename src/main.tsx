import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import {configureAuthContainer} from "@/core/init-dependencies/auth.dependency";
import {QueryClient, QueryClientProvider} from "react-query";
import {Toaster} from "sonner";

// Initialize dependencies
configureAuthContainer();

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
    <Toaster position="top-center" richColors />
  </QueryClientProvider>
)
