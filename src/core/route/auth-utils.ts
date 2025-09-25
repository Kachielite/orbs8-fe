import { redirect } from 'react-router-dom';

export const authService = {
  isAuthenticated: async (): Promise<boolean> => {
    const authData = localStorage.getItem('auth-data');
    if (!authData) {
      return false;
    }
    const accessToken = JSON.parse(authData)?.state?.auth?.accessToken;
    if (!accessToken) {
      return false;
    }
    return accessToken;
  },
};

// Protected route loader - runs before component renders
export const protectedLoader = async () => {
  const isAuth = await authService.isAuthenticated();
  if (!isAuth) {
    throw redirect('/login');
  }
  return null;
};

// Public only route loader (redirects authenticated users)
export const publicOnlyLoader = async () => {
  const isAuth = await authService.isAuthenticated();
  if (isAuth) {
    throw redirect('/');
  }
  return null;
};
