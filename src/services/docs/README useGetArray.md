# `useGetArray` Hook

## Descrição

Este hook React personalizado (`useGetArray`) é projetado para buscar dados de uma API, filtrar esses dados com base em um campo e valor específicos, e gerenciar os estados de carregamento e erro da requisição. Ele é ideal para cenários onde você precisa carregar uma lista de itens e exibir apenas aqueles que correspondem a um determinado critério.

## Instalação

Como este é um hook personalizado, não há uma instalação via npm ou yarn. Basta copiar o código `useGetArray.js` (ou o nome do arquivo que você preferir) para o seu projeto React.

## Uso

O hook `useGetArray` retorna um objeto contendo `data`, `loading` e `error`. Você pode desestruturá-lo em seu componente funcional React.

```javascript
import { useGetArray } from './useGetArray'; // Ajuste o caminho conforme necessário

function MyComponent() {
  const { data, loading, error } = useGetArray(
    '/carros', // endpoint da API
    'placa',   // campo para filtrar
    'ABC1234'  // valor do filtro
  );

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Carros Filtrados</h1>
      <ul>
        {data.map(carro => (
          <li key={carro.id}>{carro.modelo} - {carro.placa}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
```

## Parâmetros

O hook `useGetArray` aceita os seguintes parâmetros:

- `endpoint` (string, **obrigatório**): O caminho do endpoint da API a ser anexado à `API_BASE_URL`. Ex: `'/usuarios'`, `'/produtos'`. 
- `filterField` (string, **obrigatório**): O nome do campo no objeto de dados retornado pela API que será usado para filtrar. Ex: `'categoria'`, `'id'`, `'nome'`.
- `filterValue` (string | number, **obrigatório**): O valor a ser comparado com o `filterField` para filtrar os dados. A comparação não diferencia maiúsculas de minúsculas para strings e faz uma conversão para número se o `fieldValue` for numérico.

## Retorno

O hook retorna um objeto com as seguintes propriedades:

- `data` (Array): Um array dos dados filtrados retornados pela API. Vazio se nenhum dado for encontrado ou se houver um erro.
- `loading` (boolean): `true` enquanto os dados estão sendo buscados, `false` caso contrário.
- `error` (string | null): Uma mensagem de erro se a requisição falhar, caso contrário `null`.

## Notas Importantes

- **Variável de Ambiente**: O hook utiliza `import.meta.env.VITE_API_BASE_URL` para construir a URL completa da API. Certifique-se de que esta variável de ambiente esteja configurada corretamente em seu projeto Vite (ou ferramenta de build equivalente).
- **Tratamento de Erros**: Erros na requisição da API são capturados e armazenados no estado `error`, que pode ser usado para exibir feedback ao usuário.
- **Filtragem**: A filtragem é realizada no lado do cliente após a busca de todos os dados do endpoint. Para grandes conjuntos de dados, considere implementar a filtragem no lado do servidor para melhorar a performance.
- **Ordenação**: O código original não inclui ordenação. Se a ordenação for necessária, ela deve ser adicionada manualmente após a filtragem ou implementada no lado do servidor.

**Autor:** Waldinei Santos Gonçalves
**Data:** 11 de Setembro de 2025