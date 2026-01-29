# Hook usePostData

Este hook personalizado em **React** facilita o envio de requisições
**POST** para uma API, abstraindo o tratamento de estados de
**loading**, **error** e retorno da requisição.

------------------------------------------------------------------------

## 📌 Funcionalidades

-   Envia requisições `POST` para um endpoint definido.
-   Controla o estado de carregamento (`loading`).
-   Captura e armazena erros (`error`).
-   Retorna os dados da resposta da API em formato JSON.

------------------------------------------------------------------------

## 🚀 Como usar

### 1. Importação

``` javascript
import { usePostData } from './hooks/usePostData';
```

### 2. Utilização dentro de um componente

``` javascript
function MeuComponente() {
  const { createData, loading, error } = usePostData('/users');

  const handleSubmit = async () => {
    const novoUsuario = {
      nome: "Waldinei",
      email: "teste@example.com"
    };

    const resposta = await createData(novoUsuario);
    console.log(resposta);
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Enviando..." : "Criar Usuário"}
      </button>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
    </div>
  );
}
```

------------------------------------------------------------------------

## ⚙️ Configuração

Este hook utiliza a variável de ambiente `VITE_API_BASE_URL` para
definir a **base URL da API**.\
No arquivo `.env` do seu projeto Vite, defina:

``` env
VITE_API_BASE_URL=https://suaapi.com/api
```

------------------------------------------------------------------------

## 📂 Estrutura do Retorno

O hook retorna um objeto com três propriedades:

  --------------------------------------------------------------------------
  Propriedade    Tipo         Descrição
  -------------- ------------ ----------------------------------------------
  `createData`   `Function`   Função que envia os dados via POST.

  `loading`      `boolean`    Indica se a requisição está em andamento.

  `error`        `string`     Mensagem de erro caso a requisição falhe.
  --------------------------------------------------------------------------

------------------------------------------------------------------------

## 📜 Exemplo de resposta da API

Supondo que o backend retorne:

``` json
{
  "id": 1,
  "nome": "Waldinei",
  "email": "teste@example.com"
}
```

O `createData` retornará esse objeto após a execução bem-sucedida.

------------------------------------------------------------------------

## ✅ Boas práticas

-   Sempre tratar os erros (`error`) ao utilizar o hook.
-   Utilizar variáveis de ambiente para facilitar mudanças entre
    **desenvolvimento** e **produção**.
-   Reaproveitar o hook em diferentes partes da aplicação, alterando
    apenas o `endpoint`.

------------------------------------------------------------------------

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025