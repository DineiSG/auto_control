import { useState, useEffect, useCallback } from "react";

/**
 * Hook para buscar token e obter acessos de usuario

 */

export function useAccessToken(autoFetch = true, keepAliveInterval = 300000) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSessionActive, setIsSessionActive] = useState(false)

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    /**
     * Busca os dados do usuário através da API Java
     */

    const fetchUserData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/auth/user-access`, {
                method: 'POST',
                credentials: 'include', //Envia cookies para a API Java
                headers: {
                    'Content-Type': 'application/json',
                },

            })

            console.log("Cookies enviados: ", response)

            if (!response.ok) {
                if (response.sataus === 401) {
                    throw new Error('Sessao expirada ou usuario nao autenticado')

                }
                throw new Error(`Erro ao buscar dados do usuario: ${response.status}`)
            }
            
            const userData = await response.json()

            if (userData.status === 'error') {
                throw new Error(userData.message || 'Erro ao buscar dados')
            }

            setData(userData)
            setIsSessionActive(true)
            console.log('Dados do usuario recebidos: '.userData)
        } catch (err) {
            setError(err.message)
            setIsSessionActive(false)
            console.error('Erro no yhook userAccessToken: ', err)
        } finally {
            setLoading(false)
        }
    }, [API_BASE_URL])

    /**
     * Verifica se a sessao ainda está ativa(keep-alive)
     */

    const checkSession = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/check-session`, {
                method: 'GET',
                credentials: 'include',
            })

            if (response.ok) {
                const sessionData = await response.json()
                setIsSessionActive(sessionData.active)

                //Se a sessao nao está ativa, limpa os dados

                if (!sessionData.active) {
                    setData(null)
                }
            } else {
                setIsSessionActive(false)
                setData(null)
            }
        } catch (err) {
            console.error('Erro ao verificar sessao: ', err)
            setIsSessionActive(false)
        }
    }, [API_BASE_URL])

    //Busca inicial dos dados

    useEffect(() => {
        if (autoFetch) {
            fetchUserData()
        }
    }, [autoFetch, fetchUserData])

    //Keep-alive: verifica sessao periodicamente

    useEffect(() => {
        if (!isSessionActive || !keepAliveInterval) return

        const intervalId = setInterval(() => {
            checkSession()
        }, keepAliveInterval)

        return () => clearInterval(intervalId)
    }, [isSessionActive, keepAliveInterval, checkSession])

    //Listener para evento de logout ou mudança de sessao
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'session_expired') {
                setIsSessionActive(false)
                setData(null)
                setError('Sessao expirada')
            }
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return {
        data, loading, error, refetch: fetchUserData, isSessionActive, checkSession
    }

}


