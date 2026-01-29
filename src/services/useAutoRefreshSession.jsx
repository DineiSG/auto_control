import { useEffect, useState } from 'react';

export const useAutoRefreshSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const refreshSession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-session`);
      
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
      } else {
        setError('Falha ao atualizar sessão');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();

    const interval = setInterval(() => {
      refreshSession();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return { sessionData, isLoading, error, refreshSession };
};