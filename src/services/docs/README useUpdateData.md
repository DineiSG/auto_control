# Hook useUpdateData

Este hook personalizado em **React** facilita o envio de requisições
**PUT** para atualizar dados em uma API.\
Ele abstrai o tratamento de estados de **loading**, **error** e retorno
da requisição.

------------------------------------------------------------------------

## 📌 Funcionalidades

-   Envia requisições `PUT` para atualizar dados em um endpoint.
-   Controla o estado de carregamento (`loading`).
-   Captura e armazena erros (`error`).
-   Retorna o JSON da resposta da API (quando disponível).

------------------------------------------------------------------------

## 🚀 Como usar

### 1. Importação

``` javascript
import { useUpdateData } from './hooks/useUpdateData';
```

### 2. Utilização dentro de um componente

``` javascript
function EditarProduto() {
  const { updateData, loading, error } = useUpdateData('https://suaapi.com/api/produtos/1');

  const handleUpdate = async () => {
    const produtoAtualizado = {
      id: 1,
      nome: "Notebook Gamer",
      preco: 5500
    };

    const resposta = await updateData(produtoAtualizado);
    console.log("Resposta da API:", resposta);
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Atualizando..." : "Atualizar Produto"}
      </button>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
    </div>
  );
}
```

------------------------------------------------------------------------

## ⚙️ Configuração

Diferente de outros hooks, o `useUpdateData` recebe diretamente a **URL
completa da API** como parâmetro no momento da chamada.

Exemplo:

``` javascript
const { updateData } = useUpdateData("https://suaapi.com/api/produtos/1");
```

------------------------------------------------------------------------

## 📂 Estrutura do Retorno

O hook retorna um objeto com três propriedades:

  ---------------------------------------------------------------------------
  Propriedade    Tipo         Descrição
  -------------- ------------ -----------------------------------------------
  `updateData`   `Function`   Função que envia os dados via PUT.

  `loading`      `boolean`    Indica se a requisição está em andamento.

  `error`        `string`     Mensagem de erro caso a requisição falhe.
  ---------------------------------------------------------------------------

------------------------------------------------------------------------

## 📜 Exemplo de resposta da API

Supondo que o backend retorne após atualização:

``` json
{
  "id": 1,
  "nome": "Notebook Gamer",
  "preco": 5500
}
```

O `updateData` retornará esse objeto após a execução bem-sucedida.

------------------------------------------------------------------------

## ✅ Boas práticas

-   Sempre verificar se a **URL da API** fornecida está correta e
    acessível.
-   Tratar erros (`error`) adequadamente na interface do usuário.
-   Reaproveitar o hook em diferentes partes da aplicação passando URLs
    diferentes.

------------------------------------------------------------------------


**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025