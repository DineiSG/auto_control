import { useState, useEffect } from 'react';

export function useGetTest(endpoint) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_TEST;

    useEffect(() => {
        if (!endpoint) return; // evita chamada quando endpoint é null ou vazio

        async function fetchData() {
            setStatus('loading');
            setError(null);

            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`);
                if (!response.ok) throw new Error('Erro ao buscar dados');

                const result = await response.json();
                setData(result);
                setStatus('success');
            } catch (err) {
                setError(err.message || 'Erro desconhecido');
                setStatus('error');
            }
        }

        fetchData();
    }, [endpoint, API_BASE_URL]);

    return { data, status, error };
}

//Arquivo criado para teste de rota e tipo de usuario. Devera ser