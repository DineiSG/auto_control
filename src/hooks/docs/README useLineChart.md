# useLineChart Hook

Este repositório contém um hook React (`useLineChart`) projetado para simplificar a integração e o gerenciamento de gráficos de linha baseados na biblioteca Chart.js. Ele oferece funcionalidades para manipulação de dados, estados de carregamento e erro, e métodos para adicionar e remover pontos de dados dinamicamente.




## Funcionalidades

- **Gerenciamento de Estado Simplificado**: Gerencia o estado dos dados do gráfico, carregamento e erros de forma centralizada.
- **Opções Configuráveis**: Permite a personalização das opções do Chart.js, com valores padrão inteligentes.
- **Atualização de Dados Flexível**: Métodos para substituir todos os dados do gráfico ou adicionar/remover pontos de dados individualmente.
- **Integração com APIs**: Função `fetchData` para buscar dados de fontes assíncronas, tratando estados de carregamento e erro.
- **Garantia de Dataset**: Assegura que os datasets existam antes de tentar adicionar pontos de dados, evitando erros comuns.




## Instalação

Para utilizar este hook em seu projeto React, certifique-se de ter o `react` e o `chart.js` instalados. Se você ainda não os tem, pode instalá-los via npm ou yarn:

```bash
npm install react chart.js react-chartjs-2
# ou
yarn add react chart.js react-chartjs-2
```

Em seguida, copie o arquivo `useLineChart.jsx` para o diretório de hooks do seu projeto (ex: `src/hooks/`).




## Uso

Importe o hook `useLineChart` em seu componente React e utilize-o para gerenciar seu gráfico. Abaixo, um exemplo básico de como usá-lo:

```jsx
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useLineChart from './hooks/useLineChart'; // Ajuste o caminho conforme necessário

// Importe os registradores necessários do Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MyLineChartComponent() {
  const { data, options, loading, error, updateData, fetchData, addDataPoint, removeLastDataPoint } = useLineChart(
    { labels: ['Jan', 'Fev', 'Mar'], datasets: [{ label: 'Vendas', data: [65, 59, 80], borderColor: 'rgb(75, 192, 192)', tension: 0.1 }] },
    { plugins: { title: { text: 'Vendas Mensais' } } }
  );

  useEffect(() => {
    // Exemplo de como buscar dados de uma API
    const fetchSalesData = async () => {
      // Simula uma chamada de API
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            labels: ['Abr', 'Mai', 'Jun'],
            datasets: [
              { label: 'Vendas', data: [70, 90, 75], borderColor: 'rgb(75, 192, 192)', tension: 0.1 },
              { label: 'Despesas', data: [30, 40, 35], borderColor: 'rgb(255, 99, 132)', tension: 0.1 }
            ],
          });
        }, 1000);
      });
    };

    // fetchData(fetchSalesData);

    // Exemplo de como adicionar pontos de dados dinamicamente
    // setTimeout(() => addDataPoint('Jul', 100, 0), 2000);
    // setTimeout(() => addDataPoint('Jul', 50, 1), 2000);

    // Exemplo de como remover o último ponto de dados
    // setTimeout(() => removeLastDataPoint(0), 3000);

  }, [fetchData, addDataPoint, removeLastDataPoint]);

  if (loading) return <p>Carregando dados do gráfico...</p>;
  if (error) return <p>Erro ao carregar dados: {error}</p>;

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Line data={data} options={options} />
      <button onClick={() => updateData({ labels: ['Q1', 'Q2'], datasets: [{ label: 'Lucro', data: [120, 150], borderColor: 'green', tension: 0.1 }] })}>Atualizar Dados</button>
      <button onClick={() => addDataPoint('Q3', 180, 0)}>Adicionar Q3 Lucro</button>
      <button onClick={() => removeLastDataPoint(0)}>Remover Último Lucro</button>
    </div>
  );
}

export default MyLineChartComponent;
```




## Referência da API

### `useLineChart(initialData, options)`

**Parâmetros:**

- `initialData` (Object, opcional): Objeto inicial para os dados do gráfico, seguindo a estrutura `Chart.js` (`{ labels: [], datasets: [] }`). Padrão: `{ labels: [], datasets: [] }`.
- `options` (Object, opcional): Objeto de opções para o gráfico, seguindo a estrutura `Chart.js`. Estas opções serão mescladas com as opções padrão.

**Retorna:**

Um objeto contendo:

- `data` (Object): O estado atual dos dados do gráfico.
- `options` (Object): As opções mescladas do gráfico, incluindo as opções padrão e as personalizadas.
- `loading` (Boolean): Indica se uma operação de busca de dados está em andamento.
- `error` (String|null): Contém a mensagem de erro se uma operação de busca falhar, caso contrário, `null`.
- `updateData(newData)` (Function): Uma função para substituir completamente os dados do gráfico.
  - `newData` (Object): Os novos dados do gráfico.
- `fetchData(apiCall)` (Function): Uma função assíncrona para buscar dados de uma API.
  - `apiCall` (Function): Uma função que retorna uma `Promise` que resolve com os dados do gráfico.
- `addDataPoint(label, value, datasetIndex)` (Function): Adiciona um novo ponto de dados a um dataset específico.
  - `label` (String): O rótulo para o novo ponto de dados (adicionado a `labels`).
  - `value` (Number): O valor do dado para o novo ponto.
  - `datasetIndex` (Number, opcional): O índice do dataset ao qual o ponto será adicionado. Padrão: `0`.
- `removeLastDataPoint(datasetIndex)` (Function): Remove o último ponto de dados de um dataset específico e o último rótulo.
  - `datasetIndex` (Number, opcional): O índice do dataset do qual o ponto será removido. Padrão: `0`.


**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
