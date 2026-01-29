import { useState, useEffect } from "react";


/**
 * Este hook é responsável por buscar periodicamente no back end 
 * @param {*} tipo_consulta 
 * @param {*} intervalo 
 * @returns consultas e pendencias
 */

export function usePostNotifications(tipo_consulta = "default", intervalo = 600000) {
    const [consultas, setConsultas] = useState([]);
    const [pendencias, setPendencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    async function fetchConsultas() {
        const resp = await fetch(`${API_BASE_URL}/auth/consultas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ tipo_consulta })
        });
        if (!resp.ok) throw new Error(`Erro ao buscar consultas: ${resp.status}`);
        return resp.json();
        
    }

    async function fetchPendencias() {
        const resp = await fetch(`${API_BASE_URL}/auth/pendencias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({})
        });
        if (!resp.ok) throw new Error(`Erro ao buscar pendências: ${resp.status}`);

        const json = await resp.json();
        // Extrai o array de pendências
        return Array.isArray(json.dados) ? json.dados : [];
    }

    async function atualizar() {
        try {
            setLoading(true);
            const [c, p] = await Promise.all([fetchConsultas(), fetchPendencias()]);
            setConsultas(c);
            setPendencias(p);
        } catch (err) {
            setErro(err);
        } finally {
            setLoading(false);
        }
    }

    //Chama as atualizações de pendencias
    useEffect(() => {
        atualizar();
        const id = setInterval(intervalo);
        return () => clearInterval(id);
    }, [tipo_consulta, intervalo]);

    return { consultas, pendencias, loading, erro };
}