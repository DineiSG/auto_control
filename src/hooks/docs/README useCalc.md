# Funções Utilitárias JavaScript

Este repositório contém um conjunto de funções utilitárias em JavaScript projetadas para auxiliar em operações financeiras e de controle de estoque. As funções são independentes e podem ser facilmente integradas em projetos JavaScript ou TypeScript existentes.

## Funções



### `calcValorFinanceiro(valor_1, valor_2)`

**Descrição:**

Esta função calcula a diferença entre dois valores financeiros formatados como strings no padrão brasileiro (com vírgula como separador decimal e ponto como separador de milhar) e retorna o resultado formatado no mesmo padrão. É útil para operações de subtração onde os valores de entrada podem vir de campos de formulário ou outras fontes que utilizam a formatação regional.

**Parâmetros:**

- `valor_1` (String): O primeiro valor financeiro. Espera-se uma string no formato brasileiro (ex: "1.234,56").
- `valor_2` (String): O segundo valor financeiro a ser subtraído do primeiro. Espera-se uma string no formato brasileiro (ex: "789,00").

**Retorno:**

- (String): O resultado da subtração formatado como uma string no padrão brasileiro (ex: "445,56"). Se qualquer um dos valores de entrada não puder ser convertido para um número válido, a função retorna "0,00".

**Exemplo de Uso:**

```javascript
import { calcValorFinanceiro } from './seu-arquivo-de-funcoes';

const valorTotal = "1.500,75";
const valorDesconto = "250,25";

const valorFinal = calcValorFinanceiro(valorTotal, valorDesconto);
console.log(valorFinal); // Saída: "1.250,50"

const valorInvalido = calcValorFinanceiro("abc", "100,00");
console.log(valorInvalido); // Saída: "0,00"
```



### `calculateDaysInStock(dateString)`

**Descrição:**

Esta função calcula a quantidade de dias que se passaram desde uma data específica até a data atual. É comumente utilizada para determinar o tempo que um item está em estoque, por exemplo. A função considera apenas a parte da data, ignorando as horas, minutos e segundos para um cálculo preciso dos dias completos.

**Parâmetros:**

- `dateString` (String): Uma string representando a data inicial. Deve ser um formato de data reconhecido pelo construtor `new Date()` do JavaScript (ex: "YYYY-MM-DD", "MM/DD/YYYY"). Se a string for vazia ou inválida, a função retorna 0.

**Retorno:**

- (Number): O número de dias completos decorridos desde `dateString` até a data atual. Retorna 0 se a `dateString` for inválida, vazia ou se a data for futura.

**Exemplo de Uso:**

```javascript
import { calculateDaysInStock } from './seu-arquivo-de-funcoes';

const dataEntradaEstoque = "2023-01-15";
const diasEmEstoque = calculateDaysInStock(dataEntradaEstoque);
console.log(`Dias em estoque: ${diasEmEstoque}`); // Saída: Dias em estoque: <número de dias>

const dataFutura = "2025-12-31";
const diasFuturos = calculateDaysInStock(dataFutura);
console.log(`Dias futuros: ${diasFuturos}`); // Saída: Dias futuros: 0

const dataInvalida = calculateDaysInStock("");
console.log(`Dias inválidos: ${dataInvalida}`); // Saída: Dias inválidos: 0
```



## Como Usar

Para utilizar estas funções em seu projeto, você pode copiar o código diretamente para um arquivo `.js` ou `.ts` em seu projeto e importá-las conforme necessário.

**Exemplo de estrutura de arquivo (e.g., `utils/finance.js`):**

```javascript
// utils/finance.js

export function calcValorFinanceiro(valor_1, valor_2) {
  // ... código da função ...
}

export function calculateDaysInStock(dateString) {
  // ... código da função ...
}
```

**Exemplo de importação e uso em outro arquivo:**

```javascript
// seu-componente.js ou sua-logica.js

import { calcValorFinanceiro, calculateDaysInStock } from './utils/finance';

// Usando as funções
const resultadoFinanceiro = calcValorFinanceiro("1.000,00", "200,50");
console.log(resultadoFinanceiro);

const dias = calculateDaysInStock("2024-01-01");
console.log(dias);
```

---

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025