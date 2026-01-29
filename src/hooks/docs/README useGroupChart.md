# `useGroupedChart` Hook

Um hook React para agrupar e agregar dados de forma flexível, ideal para visualização em gráficos Chart.js.

## Sumário

- [Instalação](#instalação)
- [Uso Básico](#uso-básico)
- [API](#api)
  - [Parâmetros](#parâmetros)
  - [Retorno](#retorno)
- [Exemplos](#exemplos)
- [Considerações](#considerações)
- [Licença](#licença)



## Instalação

Este é um hook React. Para usá-lo, basta copiar o arquivo `useGroupedChart.jsx` para o seu projeto e importá-lo onde for necessário.

```jsx
import useGroupedChart from './hooks/useGroupedChart';
```




## Uso Básico

O `useGroupedChart` simplifica a preparação de dados para gráficos, permitindo agrupar informações por uma chave específica e aplicar funções de agregação como contagem, soma ou média. Ele retorna os dados formatados para o Chart.js, as opções do gráfico e o objeto de dados agrupados.

```jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import useGroupedChart from './hooks/useGroupedChart'; // Ajuste o caminho conforme necessário

const MyChartComponent = () => {
  const rawData = [
    { categoria: 'Frutas', valor: 10 },
    { categoria: 'Vegetais', valor: 15 },
    { categoria: 'Frutas', valor: 20 },
    { categoria: 'Grãos', valor: 5 },
    { categoria: 'Vegetais', valor: 10 },
  ];

  const { chartData, chartOptions, grouped } = useGroupedChart({
    data: rawData,
    groupByKey: 'categoria',
    aggregate: 'sum',
    valueKey: 'valor',
    datasetLabel: 'Total por Categoria',
    chartType: 'bar',
  });

  console.log('Dados Agrupados:', grouped);
  // Exemplo de saída: { Frutas: 30, Vegetais: 25, Grãos: 5 }

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default MyChartComponent;
```




## API

### Parâmetros

O hook `useGroupedChart` aceita um objeto de configuração com as seguintes propriedades:

| Chave | Tipo | Padrão | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `data` | `Array` | `[]` | Sim | O array de objetos a ser processado. |
| `groupByKey` | `String` | - | Sim | A chave do objeto pela qual os dados serão agrupados. |
| `aggregate` | `String` | `'count'` | Não | A operação de agregação a ser aplicada. Valores possíveis: `'count'`, `'sum'`, `'avg'`. |
| `valueKey` | `String` \| `Function` | `null` | Condicional | Necessário se `aggregate` for `'sum'` ou `'avg'`. Define qual valor numérico usar. Pode ser uma chave aninhada (ex: `"a.b.c"`) ou uma função `(item) => number`. |
| `datasetLabel`| `String` | `'Total'` | Não | O rótulo para o dataset do Chart.js. |
| `chartType` | `String` | `'bar'` | Não | Usado para determinar a paleta de cores padrão. Não afeta a estrutura dos dados. |
| `sortBy` | `String` | `'value'` | Não | Critério de ordenação. Valores possíveis: `'value'` (ordena pelo valor agregado) ou `'key'` (ordena pelo rótulo do grupo). |
| `sortOrder` | `String` | `'desc'` | Não | Ordem de classificação. Valores possíveis: `'asc'` (ascendente) ou `'desc'` (descendente). |
| `palette` | `Array<String>` | `null` | Não | Um array de cores hexadecimais para substituir a paleta padrão. |
| `options` | `Object` | `{}` | Não | Objeto de opções adicionais que será mesclado (superficialmente) com as opções padrão do Chart.js. |

### Retorno

O hook retorna um objeto com três propriedades:

| Chave | Tipo | Descrição |
| :--- | :--- | :--- |
| `chartData` | `Object` | Um objeto no formato `{ labels, datasets }`, pronto para ser usado pela biblioteca Chart.js. |
| `chartOptions`| `Object` | Um objeto de opções mescladas (padrão + as fornecidas em `options`) para o Chart.js. |
| `grouped` | `Object` | Um objeto simples contendo os dados agrupados e agregados no formato `{ chave: valor }`. |




## Exemplos

### 1. Contagem de Itens por Categoria

Este é o caso de uso mais simples. Se você quer apenas contar quantos itens existem em cada categoria, basta fornecer `data` e `groupByKey`.

```jsx
const { chartData } = useGroupedChart({
  data: produtos,
  groupByKey: 'categoria',
  // aggregate: 'count' é o padrão
});
```

### 2. Soma de Valores com Chave Aninhada

Se o valor que você precisa somar está dentro de um objeto aninhado, você pode usar a notação de ponto em `valueKey`.

```jsx
const vendas = [
  { produto: 'Maçã', detalhes: { preco: 5.50 } },
  { produto: 'Banana', detalhes: { preco: 3.00 } },
  { produto: 'Maçã', detalhes: { preco: 6.00 } },
];

const { grouped } = useGroupedChart({
  data: vendas,
  groupByKey: 'produto',
  aggregate: 'sum',
  valueKey: 'detalhes.preco', // Acessa o valor aninhado
});

// grouped será: { Maçã: 11.5, Banana: 3 }
```

### 3. Média de Preços com `valueKey` como Função

Para cálculos mais complexos, `valueKey` pode ser uma função. Isso é útil quando o valor precisa ser derivado de múltiplos campos.

```jsx
const itens = [
  { nome: 'Item A', quantidade: 2, precoUnitario: 10 }, // total: 20
  { nome: 'Item B', quantidade: 3, precoUnitario: 5 },  // total: 15
  { nome: 'Item A', quantidade: 1, precoUnitario: 12 }, // total: 12
];

const { grouped } = useGroupedChart({
  data: itens,
  groupByKey: 'nome',
  aggregate: 'avg',
  valueKey: (item) => item.quantidade * item.precoUnitario, // Calcula o valor total do item
});

// grouped será: { 'Item A': 16, 'Item B': 15 }
// Média para Item A: (20 + 12) / 2 = 16
```

### 4. Ordenação e Paleta de Cores Personalizada

Você pode controlar a aparência e a ordem do gráfico facilmente.

```jsx
const { chartData } = useGroupedChart({
  data: dados,
  groupByKey: 'regiao',
  aggregate: 'sum',
  valueKey: 'vendas',
  sortBy: 'key', // Ordena pelo nome da região
  sortOrder: 'asc', // Ordem alfabética ascendente
  palette: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'], // Cores customizadas
});
```



## Considerações

- **Chart.js**: Este hook é projetado para funcionar perfeitamente com o Chart.js. Certifique-se de ter o Chart.js e o `react-chartjs-2` instalados em seu projeto.
- **Mesclagem de Opções**: A mesclagem do objeto `options` é superficial. Se você precisar de uma mesclagem profunda para as opções do Chart.js, considere usar uma biblioteca como `lodash.merge` externamente antes de passar as opções para o hook.
- **Tratamento de Números**: O hook inclui uma lógica robusta para parsear strings numéricas, tratando diferentes formatos (ex: "1.234,56", "1234.56", "R$ 1.234,56"). Valores não numéricos ou nulos são tratados como zero para fins de agregação.
- **Chaves Nulas/Indefinidas**: Se `item[groupByKey]` for nulo ou indefinido, o item será agrupado sob a chave `‘—‘`.

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
