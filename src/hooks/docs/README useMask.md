# Funções de Formatação de Dados

Este repositório contém um conjunto de funções utilitárias em JavaScript para formatar dados comuns no Brasil, como CPF, números de telefone, CEP, datas e valores monetários. Além disso, inclui uma função para extrair apenas números de uma string.

## Instalação

Não há necessidade de instalação, basta copiar e colar as funções em seu projeto JavaScript.

## Uso

Importe as funções que você precisa e utilize-as conforme os exemplos abaixo:

```javascript
import { formatCPF, formatTel, formatCEP, formatDate, formatValue, onlyNumbers } from './code';

// Exemplo de uso:
const cpfFormatado = formatCPF('12345678901'); // Saída: 123.456.789-01
const telFormatado = formatTel('11987654321'); // Saída: (11)98765-4321
const cepFormatado = formatCEP('12345678'); // Saída: 12345-678
const dateFormatada = formatDate('01012025'); // Saída: 01/01/2025
const valorFormatado = formatValue('1234567'); // Saída: 12.345,67
const apenasNumeros = onlyNumbers('abc123def456'); // Saída: 123456
```

## Funções

### `formatCPF(value)`

Formata uma string de 11 dígitos numéricos para o formato de CPF (XXX.XXX.XXX-XX).

**Parâmetros:**

- `value` (String): O CPF a ser formatado (apenas números).

**Retorna:**

- (String): O CPF formatado.

**Exemplo:**

```javascript
formatCPF('12345678901'); // Retorna: "123.456.789-01"
```

### `formatTel(value)`

Formata uma string numérica para o formato de telefone (XX)XXXXX-XXXX ou (XX)XXXX-XXXX.

**Parâmetros:**

- `value` (String): O número de telefone a ser formatado (apenas números).

**Retorna:**

- (String): O número de telefone formatado.

**Exemplo:**

```javascript
formatTel('11987654321'); // Retorna: "(11)98765-4321"
formatTel('2134567890'); // Retorna: "(21)3456-7890"
```

### `formatCEP(value)`

Formata uma string de 8 dígitos numéricos para o formato de CEP (XXXXX-XXX).

**Parâmetros:**

- `value` (String): O CEP a ser formatado (apenas números).

**Retorna:**

- (String): O CEP formatado.

**Exemplo:**

```javascript
formatCEP('12345678'); // Retorna: "12345-678"
```

### `formatDate(value)`

Formata uma string de 8 dígitos numéricos para o formato de data (DD/MM/AAAA).

**Parâmetros:**

- `value` (String): A data a ser formatada (DDMMAAAA).

**Retorna:**

- (String): A data formatada.

**Exemplo:**

```javascript
formatDate('01012025'); // Retorna: "01/01/2025"
```

### `formatValue(value)`

Formata uma string numérica para o formato de valor monetário brasileiro (ex: 1.234,56).

**Parâmetros:**

- `value` (String): O valor a ser formatado (apenas números, considerando os dois últimos como centavos).

**Retorna:**

- (String): O valor formatado.

**Exemplo:**

```javascript
formatValue('1234567'); // Retorna: "12.345,67"
formatValue('123'); // Retorna: "1,23"
```

### `onlyNumbers(value)`

Remove todos os caracteres não numéricos de uma string, retornando apenas os dígitos.

**Parâmetros:**

- `value` (String): A string de entrada.

**Retorna:**

- (String): A string contendo apenas números.

**Exemplo:**

```javascript
onlyNumbers('abc123def456'); // Retorna: "123456"
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou novas funções. Abra uma *issue* ou envie um *pull request*.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
