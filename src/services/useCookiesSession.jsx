import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gerenciar o envio de cookies de sessão para a API
 * e obter informações da sessão do usuário
 */

const useCookiesSession = () => {

    
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL



    /**
     * Captura os cookies do navegador atual
     * @returns {string} String com todos os cookies
     */
    /* const getCookiesFromBrowser = useCallback(() => {
        return document.cookie;
    }, []); */

    /**
     * Envia os cookies para a API e inicializa a sessão
     * @param {string} cookies - String com os cookies de sessão
     * @returns {Promise<Object>} Dados da sessão inicializada
    */
    /* 
    Esta chamada será utilizada quando a aplicação for para ambiente de produção
    const initializeSession = useCallback(async (cookies) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/initialize-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cookies }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Falha ao inicializar sessão');
            }

            const data = await response.json();
            setSessionData(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    }, [API_BASE_URL]); */


    /**
     * Captura os cookies do navegador e envia para a API
     * @returns {Promise<Object>} Dados da sessão inicializada
     */
    /* 
    const sendCookiesToApi = useCallback(async () => {
        const cookies = getCookiesFromBrowser();

        if (!cookies || cookies.trim() === '') {
            const errorMsg = 'Nenhum cookie encontrado no navegador';
            setError(errorMsg);
            throw new Error(errorMsg);
        }

        return await initializeSession(cookies);
    }, [getCookiesFromBrowser, initializeSession]); */

    /**;
     * Limpa a sessão na API
     * @returns {Promise<void>}
    */
    /* 
        const clearSession = useCallback(async () => {
            setLoading(true);
            setError(null);
    
            try {
                const response = await fetch(`${API_BASE_URL}/auth/clear-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Falha ao limpar sessão');
                }
    
                setSessionData(null);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                throw err;
            }
        }, [API_BASE_URL]); */

    /*  return {
         // Estado
         sessionData,
         loading,
         error,
 
         // Métodos
         sendCookiesToApi,
         initializeSession,
         clearSession,
         getCookiesFromBrowser,
     }; */

    // Nesta versao, o hook chama a api para que ela busque na pasta os cookies de sessao
    const initializeSession = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/initialize-session`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Falha ao inicializar sessão');
            }

            const data = await response.json();
            setSessionData(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    }, [API_BASE_URL]);

    /**
     * Chama a inicialização de sessão (busca os cookies automaticamente na pasta via API)
     * @returns {Promise<Object>} Dados da sessão inicializada
     */
    const sendCookiesToApi = useCallback(async () => {
        return await initializeSession();
    }, [initializeSession]);

    /**
     * Limpa a sessão na API
     * @returns {Promise<void>}
     */
    const clearSession = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/clear-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao limpar sessão');
            }

            setSessionData(null);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    }, [API_BASE_URL]);

    // Função removida: getCookiesFromBrowser

    return {
        // Estado
        sessionData,
        loading,
        error,

        // Métodos
        sendCookiesToApi,        // Agora chama initializeSession
        initializeSession,       // Chama o endpoint GET
        clearSession,
        // getCookiesFromBrowser, // Removido
    };
};

export default useCookiesSession;