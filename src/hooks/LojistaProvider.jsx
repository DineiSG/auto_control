import { useState, useEffect, useRef, useCallback } from 'react';
import { LojistaContext } from './LojistaContext';

export const LojistaProvider = ({ children, endpointLojista }) => {
  const [lojaAtiva, setLojaAtiva] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const carregarLojista = useCallback(async () => {
    if (!endpointLojista) {
      console.error('Endpoint não fornecido');
      return;
    }

    setCarregando(true);
    setErro(null);

    try {

      const resposta = await fetch(endpointLojista, {
        credentials: 'include', // ← permite enviar cookies de sessão
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!resposta.ok) throw new Error(`HTTP error! status: ${resposta.status}`);
      const dados = await resposta.json();

      let lojaAtiva = null;
      const unidade = dados?.userData?.dados?.Unidade
      console.log("Dados da unidade:", unidade);
      if (
        unidade &&
        typeof unidade === 'object' &&
        !Array.isArray(unidade) &&
        unidade.Fantasia &&
        typeof unidade.Fantasia === 'string' &&
        unidade.Fantasia.trim() !== ''
      ) {
        lojaAtiva = {
          nome: unidade.Fantasia,
          dados: unidade,
          temLoja: true
        };
      } else {
        lojaAtiva = null; // usuário NÃO está em modo lojista
      }

      if (isMounted.current) setLojaAtiva(lojaAtiva);
    } catch (err) {
      console.error('Erro ao carregar lojista:', err);
      if (isMounted.current) {
        setErro(err.message);
        setLojaAtiva(null);
      }
    } finally {
      if (isMounted.current) setCarregando(false);
    }
  }, [endpointLojista]);

  // Carrega automaticamente na montagem (recomendado)
  useEffect(() => {
    if (endpointLojista) {
      carregarLojista();
    }
  }, [carregarLojista, endpointLojista]);

  return (
    <LojistaContext.Provider value={{ lojaAtiva, carregando, erro, carregarLojista }}>
      {children}
    </LojistaContext.Provider>
  );
};