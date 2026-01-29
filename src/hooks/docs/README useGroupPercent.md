# `useGroupPercent` Hook

Este é um hook React customizado que facilita a agregação e o cálculo de porcentagens de dados brutos, ideal para visualização em gráficos. Ele agrupa dados por uma chave específica, calcula contagens e porcentagens, e prepara os dados em formatos compatíveis com bibliotecas de gráficos como o Chart.js.




## Instalação

Como este é um hook React, você pode incluí-lo diretamente em seu projeto. Certifique-se de ter o React e o Chart.js (se for usar as saídas `chartDataCounts`, `chartDataPercentages` e `chartOptions`) instalados.

```bash
npm install react chart.js react-chartjs-2
# ou
yarn add react chart.js react-chartjs-2
```


## Uso

Importe o hook em seu componente e chame-o com as opções desejadas. O hook `useGroupPercent` aceita um objeto de configuração com as seguintes chaves:

- `data` (Array): O array de objetos a ser processado.
- `groupByKey` (String): A chave pela qual os dados serão agrupados.
- `datasetLabel` (String, opcional): O rótulo para o conjunto de dados de contagem. Padrão: `"Quantidade"`.
- `percentLabel` (String, opcional): O rótulo para o conjunto de dados de porcentagem. Padrão: `"Porcentagem"`.
- `sortBy` (String, opcional): Critério de ordenação. Pode ser `"value"` (padrão) ou `"key"`.
- `sortOrder` (String, opcional): Ordem de classificação. Pode ser `"desc"` (padrão) ou `"asc"`.
- `palette` (Array, opcional): Um array de cores para os gráficos. Se não for fornecido, um conjunto de cores padrão será usado.
- `round` (Number, opcional): O número de casas decimais para arredondar as porcentagens. Padrão: `2`.

### Exemplo

```javascript
import useGroupPercent from './useGroupPercent';

const MyComponent = () => {
  const data = [
    { marca: 'Toyota', ano: 2020 },
    { marca: 'Ford', ano: 2021 },
    { marca: 'Toyota', ano: 2022 },
    { marca: 'Honda', ano: 2020 },
    { marca: 'Ford', ano: 2022 },
    { marca: 'Toyota', ano: 2021 },
  ];

  const { 
    total,
    counts,
    percentages,
    chartDataCounts,
    chartDataPercentages,
    chartOptions 
  } = useGroupPercent({
    data: data,
    groupByKey: 'marca',
  });

  // Agora você pode usar os dados retornados em seu componente
  // para exibir informações ou renderizar gráficos.

  return (
    <div>
      <h2>Total de itens: {total}</h2>
      {/* Exemplo de como usar com react-chartjs-2 */}
      {/* <Pie data={chartDataPercentages} options={chartOptions} /> */}
    </div>
  );
};
```




## Retorno

O hook retorna um objeto com as seguintes propriedades:

- `total` (Number): O número total de itens nos dados.
- `counts` (Object): Um objeto onde as chaves são os valores agrupados e os valores são as contagens de cada um.
- `percentages` (Object): Um objeto semelhante a `counts`, mas com os valores em porcentagem.
- `chartDataCounts` (Object): Um objeto de dados formatado para ser usado com o Chart.js, contendo as contagens.
- `chartDataPercentages` (Object): Um objeto de dados formatado para ser usado com o Chart.js, contendo as porcentagens.
- `chartOptions` (Object): Um objeto de opções padrão para ser usado com o Chart.js, incluindo legendas e tooltips customizados.





## Observações Importantes

### Customização de Legenda e Tooltip (Chart.js)

O `chartOptions` retornado pelo hook inclui lógica customizada para a legenda e os tooltips do Chart.js. Isso permite que a legenda exiba tanto a contagem quanto a porcentagem para cada item, e que o tooltip formate corretamente os valores, adicionando o símbolo de porcentagem quando aplicável.

- **Legenda**: A função `generateLabels` dentro de `plugins.legend.labels` é sobrescrita para mostrar o formato `"[label]: [valor] ([porcentagem]%)"`.
- **Tooltip**: A função `label` dentro de `plugins.tooltip.callbacks` é customizada para garantir que os tooltips exibam as porcentagens corretamente para datasets de porcentagem e incluam a porcentagem entre parênteses para datasets de contagem.

Essas customizações visam proporcionar uma experiência de visualização mais rica e informativa ao usar os dados gerados pelo hook em gráficos do Chart.js.


**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
