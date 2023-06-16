import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchApi from '../hooks/useFetchApi';
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { data: userData, isError } = useFetchApi({
    endpoint: `/user/me`,
    retry: 0,
    errorOff: true,
  });

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login', { replace: true });
      window.location.reload();
    }
    if (userData) {
      setUser(userData);
    }
  }, [isError, userData, navigate]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};
