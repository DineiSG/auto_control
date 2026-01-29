import { useState } from 'react';

export function usePutData(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

  // Faz PUT em baseUrl/placa/{placa}
  async function editByPlaca(data, placa) {
    setLoading(true);
    setError(null);


    try {
      if (!placa) throw new Error('Parâmetro "placa" é obrigatório para editar por placa.');

      const url = `${API_BASE_URL}${endpoint}/placa/${encodeURIComponent(placa)}`;
      console.log('[usePutData] PUT URL ->', url); // log para depuração

      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const text = await res.text(); // lê o body como texto primeiro (para mensagens de erro úteis)
      try {
        // tenta parsear JSON se possível
        const json = text ? JSON.parse(text) : null;
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${JSON.stringify(json) || text}`);
        }
        return json;
      } catch (parseErr) {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`, parseErr);
        // se não for JSON mas sucesso, retorna texto
        return text;
      }
    } catch (err) {
      setError(err.message || String(err));
      throw err; // relança para o caller tratar
    } finally {
      setLoading(false);
    }
  }

  return { editByPlaca, loading, error };
}