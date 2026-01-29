# `useDeleteData` Hook

Este hook React personalizado fornece funcionalidade para realizar operações de exclusão (DELETE) em uma API RESTful. Ele gerencia os estados de carregamento e erro, e é projetado para ser reutilizável em diferentes endpoints de API.

## Instalação

Este é um hook React personalizado e não requer instalação separada se você já tem um projeto React configurado. Basta copiar o arquivo `useDeleteData.js` para o seu projeto.

## Uso

Para usar o hook `useDeleteData`, importe-o para o seu componente React e chame-o com o `endpoint` da API para a qual você deseja enviar a requisição DELETE.

```javascript
import { useDeleteData } from './useDeleteData'; // Ajuste o caminho conforme necessário

function MyComponent() {
    const { deleteData, loading, error } = useDeleteData('/api/veiculos');

    const handleDelete = async (placa) => {
        try {
            await deleteData(placa);
            alert(`Veículo com placa ${placa} deletado com sucesso!`);
        } catch (err) {
            alert(`Erro ao deletar veículo: ${error.message}`);
        }
    };

    return (
        <div>
            {loading && <p>Deletando...</p>}
            {error && <p>Erro: {error.message}</p>}
            <button onClick={() => handleDelete('ABC1234')}>Deletar Veículo ABC1234</button>
        </div>
    );
}

export default MyComponent;
```

## API

### `useDeleteData(endpoint)`

**Parâmetros:**

- `endpoint`: `string` - O caminho base da API para a qual as requisições DELETE serão feitas (ex: `/api/veiculos`). Este valor será prefixado com `VITE_API_BASE_URL` do seu ambiente.

**Retorna:**

Um objeto contendo:

- `deleteData`: `function(placa: string)` - Uma função assíncrona que executa a requisição DELETE.
    - `placa`: `string` - O valor da placa do veículo a ser deletado. Este parâmetro é **obrigatório**.
- `loading`: `boolean` - Indica se a requisição DELETE está em andamento (`true`) ou não (`false`).
- `error`: `Error | null` - Um objeto `Error` se a requisição falhou, ou `null` se não houver erro.

## Variáveis de Ambiente

O hook espera que a URL base da sua API seja definida na variável de ambiente `VITE_API_BASE_URL`. Certifique-se de que esta variável esteja configurada em seu arquivo `.env` (ou equivalente) para que o hook possa construir corretamente as URLs da API.

Exemplo de `.env`:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Tratamento de Erros

O hook `useDeleteData` lida com erros de rede e respostas HTTP não-OK. Ele captura a mensagem de erro da resposta da API (se disponível) ou uma mensagem de erro genérica. O erro é armazenado no estado `error` e também é relançado pela função `deleteData` para que o componente chamador possa tratá-lo.

- Se o parâmetro `placa` não for fornecido, um erro será lançado imediatamente.
- Respostas HTTP com status `res.ok` como `false` (ex: 404 Not Found, 500 Internal Server Error) resultarão em um erro.
- Erros de rede (ex: sem conexão com a internet) também serão capturados.

## Considerações de Desenvolvimento

- **Logs de Depuração**: O hook inclui um `console.log` que exibe a URL da requisição DELETE. Isso é útil para depuração durante o desenvolvimento.
- **Reutilização**: Este hook é genérico o suficiente para ser usado com qualquer endpoint que suporte a exclusão de recursos por um identificador (neste caso, `placa`). Você pode adaptá-lo para outros identificadores, se necessário.
- **Segurança**: Certifique-se de que suas operações de exclusão na API sejam devidamente autenticadas e autorizadas para evitar acessos indevidos.

---

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025


