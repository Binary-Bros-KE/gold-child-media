import { useEffect, useState } from 'react';
import { ADMIN_TOKEN_KEY, getCurrentAdmin, loginAdmin } from '../api/adminApi';

const readStoredToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export default function useAdminAuth() {
  const [token, setToken] = useState(readStoredToken());
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = readStoredToken();

      if (!storedToken) {
        setToken(null);
        setUser(null);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const me = await getCurrentAdmin(storedToken);
        setToken(storedToken);
        setUser(me);
      } catch {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoggingIn(true);
      setAuthError('');
      const authData = await loginAdmin(credentials);
      localStorage.setItem(ADMIN_TOKEN_KEY, authData.token);
      setToken(authData.token);
      setUser(authData.user);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to log in.';
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setUser(null);
    setAuthError('');
  };

  return {
    token,
    user,
    isCheckingAuth,
    isLoggingIn,
    authError,
    setAuthError,
    login,
    logout
  };
}
