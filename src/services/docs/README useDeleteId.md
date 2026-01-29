# `useDeleteId` Hook

Este é um hook React personalizado (`useDeleteId`) projetado para simplificar a operação de exclusão de recursos em uma API RESTful. Ele encapsula a lógica de requisição `DELETE`, gerenciando estados de carregamento e erro, e fornecendo uma função assíncrona para executar a exclusão de um item específico por seu ID.




## Instalação

Como este é um hook personalizado, não há uma instalação via pacote NPM. Basta copiar o código-fonte do `useDeleteId.js` para o seu projeto React.

```javascript
// useDeleteId.js
import { useState } from 'react';

export function useDeleteId(endpoint) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
```




## Uso

Para usar o hook `useDeleteId`, importe-o para o seu componente React e chame-o, passando o `endpoint` da API para a qual você deseja realizar a operação de exclusão. O hook retornará um objeto contendo a função `deleteData`, um estado `loading` e um estado `error`.

```javascript
import React from 'react';
import { useDeleteId } from './useDeleteId'; // Ajuste o caminho conforme necessário

function MyComponent() {
    const { deleteData, loading, error } = useDeleteId('/api/veiculos');

    const handleDelete = async (id) => {
        try {
            const result = await deleteData(id);
            console.log('Item deletado com sucesso:', result);
            // Lógica adicional após a exclusão, como atualizar a lista de itens
        } catch (err) {
            console.error('Erro ao deletar item:', err);
            // Lógica de tratamento de erro, como exibir uma mensagem para o usuário
        }
    };

    return (
        <div>
            {loading && <p>Deletando...</p>}
            {error && <p>Erro: {error}</p>}
            <button onClick={() => handleDelete('some-item-id')}>Deletar Item</button>
        </div>
    );
}

export default MyComponent;
```




## Parâmetros

### `useDeleteId(endpoint)`

- `endpoint`: `string` (obrigatório)
  - O caminho base da API para o recurso que você deseja deletar. Por exemplo, se a URL completa para deletar um veículo for `https://api.exemplo.com/api/veiculos/123`, o `endpoint` seria `'/api/veiculos'`.

### `deleteData(id)`

- `id`: `string | number` (obrigatório)
  - O identificador único do recurso a ser deletado. Este `id` será anexado ao `endpoint` fornecido ao `useDeleteId`.





## Retorno

O hook `useDeleteId` retorna um objeto com as seguintes propriedades:

- `deleteData`: `function(id: string | number): Promise<any | null>`
  - Uma função assíncrona que executa a requisição `DELETE` para o `id` fornecido. Retorna o corpo da resposta da API (se houver e for JSON válido), o texto da resposta (se não for JSON) ou `null` (se a resposta for 204 No Content).
  - Em caso de erro HTTP ou de rede, a função lançará uma exceção, que deve ser capturada pelo chamador.
- `loading`: `boolean`
  - Indica se a operação de exclusão está em andamento (`true`) ou não (`false`).
- `error`: `string | null`
  - Contém a mensagem de erro se a operação de exclusão falhar, ou `null` se não houver erro.





## Tratamento de Erros

O hook `useDeleteId` gerencia erros de duas formas principais:

1.  **Validação de Parâmetro `id`**: Se a função `deleteData` for chamada sem um `id` válido, ela lançará imediatamente um erro com a mensagem `'Parâmetro "id" é obrigatório para deletar o veículo.'`.

2.  **Erros de Requisição HTTP**: Se a requisição `fetch` resultar em uma resposta HTTP com status de erro (ou seja, `res.ok` for `false`), um erro será lançado contendo o status HTTP e a mensagem de erro retornada pelo servidor (se houver).

Em ambos os casos, o estado `error` do hook será atualizado com a mensagem de erro, e a função `deleteData` lançará a exceção, permitindo que o componente chamador a capture e trate adequadamente.


```javascript
// Exemplo de tratamento de erro no componente
const handleDelete = async (id) => {
    try {
        await deleteData(id);
        alert("Item deletado com sucesso!");
    } catch (err) {
        console.error("Falha ao deletar:", err.message);
        alert(`Erro ao deletar: ${error || err.message}`); // 'error' é o estado do hook
    }
};
```
**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025

