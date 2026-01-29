import { useState } from 'react';

export function useDeleteId(endpoint) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

    async function deleteData(id) {
        setLoading(true);
        setError(null);

        try {
            if (!id) throw new Error('Parâmetro "id" é obrigatório para deletar o veículo.');

            const url = `${API_BASE_URL}${endpoint}/${encodeURIComponent(id)}`;

            console.log('[useDeleteId] DELETE URL ->', url);

            const res = await fetch(url, {
                method: 'DELETE',
            });

            const text = await res.text();

            // Caso de erro HTTP
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${text || 'Sem mensagem do servidor'}`);
            }

            // Se não houver conteúdo (204 No Content), retorna null
            if (!text) {
                return null;
            }

            // Tenta converter para JSON, se falhar, retorna texto
            try {
                return JSON.parse(text);
            } catch {
                return text;
            }
        } catch (err) {
            setError(err.message || String(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { deleteData, loading, error };
}