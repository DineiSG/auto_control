# `useGetData` Hook

Este é um hook personalizado do React para buscar dados de uma API de forma assíncrona, gerenciando os estados de carregamento, sucesso e erro.

## Instalação

Este hook faz parte de um projeto React. Certifique-se de que você tem o React e o React DOM instalados em seu projeto.

```bash
npm install react react-dom
# ou
yarn add react react-dom
```

## Uso

O `useGetData` hook aceita um `endpoint` como argumento e retorna um objeto contendo `data`, `status` e `error`.

### Parâmetros

- `endpoint` (string): O caminho do endpoint da API a ser buscado. Este caminho será anexado à `VITE_API_BASE_URL` definida em suas variáveis de ambiente.

### Retorno

Um objeto com as seguintes propriedades:

- `data` (Array): Os dados retornados pela API. Vazio por padrão.
- `status` (string): O estado atual da requisição. Pode ser `'idle'`, `'loading'`, `'success'` ou `'error'`.
- `error` (string | null): Uma mensagem de erro se a requisição falhar, caso contrário, `null`.

### Exemplo

```jsx
import React from 'react';
import { useGetData } from './useGetData'; // Ajuste o caminho conforme necessário

function MyComponent() {
    const { data, status, error } = useGetData('/users');

    if (status === 'loading') {
        return <div>Carregando dados...</div>;
    }

    if (status === 'error') {
        return <div>Erro: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Usuários:</h1>
            <ul>
                {data.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;
```

## Configuração

Este hook depende de uma variável de ambiente `VITE_API_BASE_URL` para determinar a URL base da sua API. Certifique-se de que esta variável esteja definida em seu arquivo `.env` (ou equivalente, dependendo da sua configuração de build).

Exemplo de `.env`:

```
VITE_API_BASE_URL=https://api.example.com
```

## Detalhes Técnicos

- Utiliza `useState` para gerenciar o estado dos dados, status e erros.
- Utiliza `useEffect` para realizar a chamada da API quando o `endpoint` ou `VITE_API_BASE_URL` mudam.
- Inclui tratamento básico de erros para requisições de rede e respostas não-OK.
- Evita chamadas de API desnecessárias quando o `endpoint` é nulo ou vazio.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Crie um pull request no repositório do projeto.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
