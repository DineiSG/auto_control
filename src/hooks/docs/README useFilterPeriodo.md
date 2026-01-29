# `useFilterPeriodo` Hook

Este hook React permite filtrar uma lista de vendas por um período de tempo definido por datas de início e fim. É útil para aplicações que precisam exibir dados de vendas de forma dinâmica, com base na seleção de um intervalo de datas pelo usuário.




## Funcionalidades

- **Filtragem por Período:** Filtra eficientemente um array de objetos de vendas com base em um período de datas (data inicial e data final).
- **Flexibilidade de Chave de Data:** Permite especificar qual propriedade do objeto de venda contém a informação da data (ex: `dataVenda`, `createdAt`, `data`).
- **Tratamento de Formatos de Data:** Suporta datas em formato ISO (`YYYY-MM-DDTHH:mm:ssZ`) e `YYYY-MM-DD`.
- **Mensagens Personalizáveis:** Oferece a capacidade de definir mensagens personalizadas para estados iniciais, períodos sem vendas e erros de validação de datas.
- **Controle de Estado Simplificado:** Gerencia internamente os estados das datas de início e fim, bem como os dados filtrados e o status da operação.
- **Reset Conveniente:** Inclui uma função para redefinir as datas de início e fim, retornando o hook ao seu estado inicial.
- **Indicação de Resultados:** Fornece uma flag `hasResults` para verificar rapidamente se há dados filtrados válidos.




## Instalação

Este hook é um módulo JavaScript puro e não requer instalação de pacotes externos além do React. Basta copiar o código para o seu projeto e importá-lo onde for necessário.

```javascript
// useFilterPeriodo.js
import { useMemo, useState } from "react";

/**
 * Hook para filtrar uma lista de vendas por período (data inicial e final).
 *
 * @param {Object} params
 * @param {Array<Object>} params.sales - Array de vendas completo (ex.: vindo do useGetData("/vendas")).
 * @param {string} [params.dateKey="dataVenda"] - Nome da propriedade no objeto de venda que contém a data.
 *                                                Pode ser "dataVenda", "createdAt", "data", etc.
 *                                                Aceita ISO (ex.: "2025-08-22T13:45:00Z") ou "YYYY-MM-DD".
 * @param {string} [params.initialMessage] - Mensagem inicial (estado sem período).
 * @param {string} [params.emptyMessage] - Mensagem quando não há vendas no período.
 *
 * @returns {{
 *   startDate: string,
 *   endDate: string,
 *   setStartDate: (v: string) => void,
 *   setEndDate: (v: string) => void,
 *   reset: () => void,
 *   filteredData: Array<Object>,
 *   status: 'idle' | 'error' | 'empty' | 'ok',
 *   message: string,
 *   hasResults: boolean
 * }}
 */
export function useFilterPeriodo({
  sales,
  dateKey = "dataRegistro",
  initialMessage = "Selecione as datas de inicio e fim para determinar um período para a busca das vendas",
  emptyMessage = "Não houve vendas no período selecionado",
}) {
  // Inputs de datas (formatos aceitos pelo <input type="date">: "YYYY-MM-DD")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Utilitário: transforma valor "YYYY-MM-DD" em Date local no início do dia (00:00:00.000)
  const startOfDayLocalFromInput = (yyyyMMdd) => {
    const [y, m, d] = yyyyMMdd.split("-").map(Number);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  };

  // Utilitário: transforma valor "YYYY-MM-DD" em Date local no fim do dia (23:59:59.999)
  const endOfDayLocalFromInput = (yyyyMMdd) => {
    const [y, m, d] = yyyyMMdd.split("-").map(Number);
    return new Date(y, m - 1, d, 23, 59, 59, 999);
  };

  // Utilitário: tenta obter um Date a partir do campo de data de cada venda
  // Aceita ISO completo ou somente data. Retorna null se inválido.
  const parseVendaDate = (value) => {
    if (!value) return null;

    // Se vier apenas "YYYY-MM-DD", converte para meio-dia local para evitar problemas de fuso/DST
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, d, 12, 0, 0, 0);
    }

    const d = new Date(value);
    return isNaN(d) ? null : d;
  };

  // Cálculos derivados (sem efeitos colaterais): dados filtrados, status e mensagem
  const { filteredData, status, message } = useMemo(() => {
    // Estado inicial: sem datas selecionadas
    if (!startDate || !endDate) {
      return {
        filteredData: [],
        status: "idle",
        message: initialMessage,
      };
    }

    // Validação: fim >= início
    const start = startOfDayLocalFromInput(startDate);
    const end = endOfDayLocalFromInput(endDate);
    if (end < start) {
      return {
        filteredData: [],
        status: "error",
        message: "A data final não pode ser anterior à data inicial.",
      };
    }

    // Filtro inclusivo: [início 00:00, fim 23:59]
    const list = Array.isArray(sales) ? sales : [];
    const filtered = list.filter((row) => {
      const d = parseVendaDate(row?.[dateKey]);
      if (!d) return false;
      return d >= start && d <= end;
    });

    if (filtered.length === 0) {
      return {
        filteredData: [],
        status: "empty",
        message: emptyMessage,
      };
    }

    return {
      filteredData: filtered,
      status: "ok",
      message: "",
    };
  }, [sales, startDate, endDate, dateKey, initialMessage, emptyMessage]);

  // Limpa inputs e volta ao estado inicial
  const reset = () => {
    setStartDate("");
    setEndDate("");
  };

  return { startDate, endDate, setStartDate, setEndDate, reset, filteredData, status, message, hasResults: status === "ok", };
}
```

## Uso

Para usar o `useFilterPeriodo` hook, importe-o em seu componente React e forneça o array de vendas e, opcionalmente, a chave da data e as mensagens personalizadas. O hook retornará as datas de início e fim, funções para atualizá-las, uma função de reset, os dados filtrados, o status da operação, uma mensagem e uma flag `hasResults`.

## API

### Parâmetros

O hook `useFilterPeriodo` aceita um objeto de configuração com as seguintes propriedades:

| Propriedade      | Tipo           | Obrigatório | Padrão                                                                      | Descrição                                                                                                                               |
| ---------------- | -------------- | ----------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `sales`          | `Array<Object>` | Sim         | -                                                                           | O array completo de objetos de vendas a ser filtrado.                                                                                   |
| `dateKey`        | `string`       | Não         | `"dataRegistro"`                                                              | A chave no objeto de venda que contém a data (ex: `"dataVenda"`, `"createdAt"`).                                                          |
| `initialMessage` | `string`       | Não         | `"Selecione as datas de inicio e fim para determinar um período para a busca das vendas"` | Mensagem exibida quando nenhuma data de início ou fim foi selecionada.                                                                  |
| `emptyMessage`   | `string`       | Não         | `"Não houve vendas no período selecionado"`                                     | Mensagem exibida quando a filtragem não retorna nenhum resultado.                                                                       |

### Retorno

O hook retorna um objeto com as seguintes propriedades:

| Propriedade    | Tipo                  | Descrição                                                                                             |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| `startDate`    | `string`              | O valor atual da data de início no formato `"YYYY-MM-DD"`.                                            |
| `endDate`      | `string`              | O valor atual da data de fim no formato `"YYYY-MM-DD"`.                                               |
| `setStartDate` | `(v: string) => void` | Função para atualizar a data de início.                                                               |
| `setEndDate`   | `(v: string) => void` | Função para atualizar a data de fim.                                                                  |
| `reset`        | `() => void`          | Função para limpar as datas de início e fim, redefinindo o filtro.                                    |
| `filteredData` | `Array<Object>`       | Um array contendo os objetos de venda que correspondem ao período de datas selecionado.               |
| `status`       | `string`              | O status atual da operação de filtragem. Pode ser `"idle"`, `"error"`, `"empty"` ou `"ok"`.             |
| `message`      | `string`              | Uma mensagem informativa correspondente ao status atual (ex: mensagem de erro ou de estado vazio).    |
| `hasResults`   | `boolean`             | Um booleano que é `true` se houver resultados de vendas filtrados (`status === "ok"`) e `false` caso contrário. |





### Status

O `status` retornado pelo hook indica o estado atual da filtragem:

- **`idle`**: Estado inicial, quando nenhuma data de início ou fim foi selecionada.
- **`error`**: Ocorre quando a data final é anterior à data inicial.
- **`empty`**: Ocorre quando não há vendas no período selecionado.
- **`ok`**: Indica que a filtragem foi bem-sucedida e há resultados em `filteredData`.


**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025