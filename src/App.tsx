import { ThemeProvider } from 'next-themes';
import { RouterProvider } from 'react-router-dom';

import router from '@/core/route';

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="iorbs8-ui-theme"
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
