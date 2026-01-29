# Funções Utilitárias de Formatação de Data e Hora

Este módulo JavaScript fornece um conjunto de funções utilitárias para formatar objetos `Date` e timestamps em diferentes representações de string, adequadas para diversas necessidades, como armazenamento em banco de dados ou exibição amigável ao usuário.

## Funções

### `formatTimestamp(date)`

Formata um objeto `Date` para uma string de timestamp no formato ISO 8601, incluindo milissegundos e o offset do fuso horário. Este formato é ideal para armazenamento em bancos de dados que exigem precisão e informações completas de fuso horário.

#### Parâmetros

- `date`: (Obrigatório) Um objeto `Date` JavaScript a ser formatado.

#### Retorno

- Uma `string` representando o timestamp formatado (ex: `2025-09-11T10:30:00.12345+03:00`).

#### Exemplo de Uso

```javascript
import { formatTimestamp } from './date_utils';

const now = new Date();
const formattedTimestamp = formatTimestamp(now);
console.log(formattedTimestamp); // Ex: 2025-09-11T10:30:00.12345-03:00
```

### `formatDateInfo(timestamp)`

Formata um timestamp (string ou número) para uma string de data localizada no formato 'pt-BR' (dia/mês/ano). Esta função é útil para exibir datas de forma legível para usuários brasileiros.

#### Parâmetros

- `timestamp`: (Obrigatório) Uma string ou número representando um timestamp. Se for `null` ou vazio, retorna uma string vazia.

#### Retorno

- Uma `string` representando a data formatada (ex: `11/09/2025`).

#### Exemplo de Uso

```javascript
import { formatDateInfo } from './date_utils';

const timestampFromDB = '2025-09-11T14:00:00Z';
const formattedDate = formatDateInfo(timestampFromDB);
console.log(formattedDate); // Saída: 11/09/2025

const emptyTimestamp = null;
const formattedEmpty = formatDateInfo(emptyTimestamp);
console.log(formattedEmpty); // Saída: 
```

### `formatTimestampWithTime(timestamp)`

Formata um timestamp (string ou número) para uma string de data e hora localizada no formato 'pt-BR', incluindo dia, mês, ano, hora e minuto. Ideal para exibição completa de data e hora para o usuário.

#### Parâmetros

- `timestamp`: (Obrigatório) Uma string ou número representando um timestamp. Se for `null` ou vazio, retorna `'-'`.

#### Retorno

- Uma `string` representando a data e hora formatadas (ex: `11/09/2025 10:30`).

#### Exemplo de Uso

```javascript
import { formatTimestampWithTime } from './date_utils';

const timestampFromAPI = '2025-09-11T10:30:00.000Z';
const formattedDateTime = formatTimestampWithTime(timestampFromAPI);
console.log(formattedDateTime); // Saída: 11/09/2025 07:30 (considerando fuso horário local)

const anotherTimestamp = null;
const formattedAnother = formatTimestampWithTime(anotherTimestamp);
console.log(formattedAnother); // Saída: -
```

## Instalação

Este módulo é um conjunto de funções utilitárias JavaScript puro e não requer instalação de pacotes externos. Basta incluir o arquivo `date_utils.js` em seu projeto e importar as funções conforme necessário.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções de bugs ou novas funcionalidades.

---

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025


