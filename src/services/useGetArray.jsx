import { useState, useEffect } from "react";

/**
 * Hook para buscar dados de uma API, filtrando por um parâmetro
 * e ordenando do mais antigo para o mais novo.
 *
 * @param {string} apiUrl - URL da API
 * @param {string} filterField - Nome do campo a filtrar (ex: "placa")
 * @param {string | number} filterValue - Valor a buscar (ex: "ABC1234")
 */

export function useGetArray(endpoint, filterField, filterValue) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Função para buscar os dados da API
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`);
                if (!response.ok) throw new Error('Erro ao buscar dados');
                const result = await response.json();

                // Filtra os dados pelo campo e valor especificados
                let filtered = result.filter(item => {
                    const fieldValue = item[filterField]
                    // Verifica se o campo existe e se o valor corresponde ao filtro
                    if (typeof fieldValue === "number") {
                        return Number(fieldValue) === filterValue;
                    }
                    return String(fieldValue).toUpperCase() === String(filterValue).toUpperCase();
                })

                setData(filtered);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [API_BASE_URL,endpoint, filterField, filterValue]);

    return { data, loading, error };
}