import { useEffect } from 'react';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useInitializeSession = () => {
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/session-info`, {
          method: 'GET',
          credentials: 'omit', // ou 'include' se usar cookies reais (não é o caso aqui)
        });

        if (!response.ok) {
          console.warn('Falha ao inicializar sessão:', response.status, await response.text());
        } else {
          const data = await response.json();
          console.log('Sessão inicializada com sucesso:', data);
        }
      } catch (error) {
        console.error('Erro na chamada para /session-info', error);
      }
    };

    // Chama imediatamente na montagem
    initializeSession();

    // Agenda a próxima chamada a cada 5 segundos
    const intervalId = setInterval(initializeSession, 60000);

    // Limpa o intervalo na desmontagem
    return () => clearInterval(intervalId);
  }, []);
};

export default useInitializeSession;