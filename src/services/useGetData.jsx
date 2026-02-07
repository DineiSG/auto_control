import { useState, useEffect } from 'react';

export function useGetData(endpoint) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (!endpoint) return; // evita chamada quando endpoint é null ou vazio

        async function fetchData() {
            setError(null);
            setLoading(true);
            setStatus('loading');

            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`);
                if (!response.ok) throw new Error('Erro ao buscar dados');

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message || 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint, API_BASE_URL]);

    return { data, status, error, loading };
}