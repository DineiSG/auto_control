# `useGetExtern`

## Descrição

`useGetExtern` é um hook React personalizado para simplificar a busca de dados de uma API externa. Ele gerencia os estados de carregamento, dados e erro, tornando o consumo de APIs em componentes funcionais React mais limpo e eficiente.

## Instalação

Este hook é um módulo JavaScript simples e pode ser usado diretamente em seu projeto React. Não há pacotes externos adicionais para instalar. Basta copiar o código para um arquivo `.js` ou `.jsx` em seu projeto (por exemplo, `hooks/useGetExtern.js`).

```javascript
// hooks/useGetExtern.js
import { useState, useEffect } from 'react';

export function useGetExtern(apiUrl) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Erro ao buscar dados');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [apiUrl]);

    return { data, loading, error };
}
```

## Uso

Importe o hook em seu componente React e chame-o com a URL da API que você deseja buscar.

```javascript
import React from 'react';
import { useGetExtern } from './hooks/useGetExtern'; // Ajuste o caminho conforme necessário

function MyComponent() {
    const { data, loading, error } = useGetExtern('https://api.example.com/data');

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            <h1>Dados da API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default MyComponent;
```

## Parâmetros

- `apiUrl` (string, **obrigatório**): A URL da API externa da qual os dados serão buscados.

## Retorno

O hook retorna um objeto com as seguintes propriedades:

- `data` (Array): Os dados retornados pela API. Inicialmente um array vazio (`[]`).
- `loading` (boolean): Um booleano que indica se a requisição está em andamento. `true` enquanto a requisição está carregando, `false` após a conclusão (sucesso ou erro).
- `error` (string | null): Uma mensagem de erro se a requisição falhar. `null` se não houver erro.

## Exemplo Completo

```javascript
import React from 'react';
import { useGetExtern } from './hooks/useGetExtern';

function UserList() {
    const { data: users, loading, error } = useGetExtern('https://jsonplaceholder.typicode.com/users');

    if (loading) {
        return <p>Carregando usuários...</p>;
    }

    if (error) {
        return <p>Erro ao carregar usuários: {error}</p>;
    }

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
```
**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
