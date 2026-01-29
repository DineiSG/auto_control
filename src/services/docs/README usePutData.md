# Hook usePutData

Este hook personalizado em **React** facilita o envio de requisições
**PUT** para atualizar dados em uma API, com suporte específico para
editar registros pelo parâmetro **placa**.\
Ele abstrai o tratamento de estados de **loading**, **error** e retorno
da requisição.

------------------------------------------------------------------------

## 📌 Funcionalidades

-   Envia requisições `PUT` para atualizar dados em um endpoint.
-   Permite editar registros a partir de um valor de **placa**.
-   Controla o estado de carregamento (`loading`).
-   Captura e armazena erros (`error`).
-   Retorna o JSON da resposta ou texto quando não for possível parsear
    como JSON.

------------------------------------------------------------------------

## 🚀 Como usar

### 1. Importação

``` javascript
import { usePutData } from './hooks/usePutData';
```

### 2. Utilização dentro de um componente

``` javascript
function EditarUsuario() {
  const { editByPlaca, loading, error } = usePutData('/users');

  const handleEdit = async () => {
    const usuarioAtualizado = {
      nome: "Waldinei Atualizado",
      email: "novoemail@example.com"
    };

    try {
      const resposta = await editByPlaca(usuarioAtualizado, "ABC1234");
      console.log("Resposta da API:", resposta);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  return (
    <div>
      <button onClick={handleEdit} disabled={loading}>
        {loading ? "Atualizando..." : "Editar Usuário"}
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

  ------------------------------------------------------------------------------
  Propriedade     Tipo         Descrição
  --------------- ------------ -------------------------------------------------
  `editByPlaca`   `Function`   Função que envia os dados via PUT, exigindo
                               parâmetro `placa`.

  `loading`       `boolean`    Indica se a requisição está em andamento.

  `error`         `string`     Mensagem de erro caso a requisição falhe.
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

## 📜 Exemplo de resposta da API

Supondo que o backend retorne após atualização:

``` json
{
  "id": 1,
  "placa": "ABC1234",
  "nome": "Waldinei Atualizado",
  "email": "novoemail@example.com"
}
```

O `editByPlaca` retornará esse objeto após a execução bem-sucedida.

------------------------------------------------------------------------

## ✅ Boas práticas

-   Sempre verificar se o parâmetro **placa** foi informado antes de
    chamar `editByPlaca`.
-   Tratar erros (`error`) adequadamente na interface do usuário.
-   Utilizar variáveis de ambiente para facilitar mudanças entre
    **desenvolvimento** e **produção**.
-   Reaproveitar o hook em diferentes partes da aplicação, alterando
    apenas o `endpoint`.

------------------------------------------------------------------------


**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025