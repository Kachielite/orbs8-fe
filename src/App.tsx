import {ThemeProvider} from 'next-themes';
import {RouterProvider} from 'react-router-dom';

import router from '@/core/route';
import useGetUser from "@/features/user/presentation/state/hook/use-get-user";
import {GlobalLoader} from "@/core/common/presentation/components/global-loader";

export default function App() {
    const {isFetchingUser} = useGetUser();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="iorbs8-ui-theme"
    >
        {isFetchingUser ? <GlobalLoader show={true}/> : <RouterProvider router={router} />}
    </ThemeProvider>
  );
}
