
# GitHub User Search

Uma aplicação React para buscar e exibir detalhes de usuários do GitHub.

## Como rodar localmente

1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Inicie o servidor de desenvolvimento: `npm start`.

## Testes

- Testes de unidade: `npm test`.
- Testes E2E: `npm run cypress`.

## Hospedagem

A aplicação está disponível em [URL da aplicação].

## Decisões Técnicas

- Utilização do React Router para gerenciamento de rotas.
- Ordenação e filtragem de repositórios no frontend.
- Testes de unidade e E2E para garantir qualidade.

## Arquitetura

```
Frontend (React)
  ├── Página Inicial (/)
  ├── Página de Resultados (/search/:username)
  └── Página de Detalhes (/profile/:username)

API (GitHub REST API)
  ├── Busca de usuários (/search/users?q=:username)
  └── Detalhes do usuário (/users/:username)
```
