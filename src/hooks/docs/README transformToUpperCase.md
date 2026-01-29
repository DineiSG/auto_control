# `toUpperCaseData`

## Descrição

Esta função JavaScript `toUpperCaseData` recebe um objeto como entrada e retorna um novo objeto onde todas as propriedades que são do tipo `string` foram convertidas para letras maiúsculas. Outros tipos de dados (números, booleanos, objetos aninhados, etc.) são mantidos inalterados.

## Uso

Para usar esta função, importe-a para o seu projeto JavaScript e chame-a com o objeto que deseja processar.

```javascript
import { toUpperCaseData } from './seu-arquivo-com-o-hook'; // Ajuste o caminho conforme necessário

const myData = {
  name: 'João',
  city: 'São Paulo',
  age: 30,
  isActive: true
};

const transformedData = toUpperCaseData(myData);

console.log(transformedData);
// Saída esperada:
// {
//   name: 'JOÃO',
//   city: 'SÃO PAULO',
//   age: 30,
//   isActive: true
// }
```

## Parâmetros

- `data`: `Object` - O objeto de entrada cujas propriedades de string serão convertidas para maiúsculas.

## Retorno

- `Object`: Um novo objeto com as mesmas propriedades do objeto de entrada, mas com todas as propriedades do tipo `string` convertidas para letras maiúsculas. Outros tipos de dados permanecem inalterados.




## Exemplo

```javascript
const myData = {
  firstName: "john",
  lastName: "doe",
  age: 25,
  address: {
    street: "123 Main St",
    city: "Anytown"
  },
  tags: ["developer", "javascript"]
};

const transformedData = toUpperCaseData(myData);

console.log(transformedData);
/*
Saída esperada:
{
  firstName: "JOHN",
  lastName: "DOE",
  age: 25,
  address: {
    street: "123 Main St",
    city: "Anytown"
  },
  tags: ["developer", "javascript"]
}
*/
```
```

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025
