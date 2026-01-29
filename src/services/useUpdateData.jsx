import { useState } from 'react';

export function useUpdateData(apiUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para atualizar um item com base no ID
  async function updateData(data) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erro ao atualizar os dados');
      return await response.json(); // Retorna o item atualizado (se a API retornar)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { updateData, loading, error };
}