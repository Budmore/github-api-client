# Northshape.com / main website

## Technology stack:

-   [Typescript](https://www.typescriptlang.org/) JS Typing and compiler
-   [React JS](https://reactjs.org/) Render library
-   [Pracel](https://expressjs.com/) Package bundler and simple http server
-   [eslint](https://lodash.com/) Lint library
-   [prettier](https://lodash.com/) Code Formatter
-   [apollo-client](https://www.apollographql.com/docs/react/) GraphQL client
-   [codegen-graphql](https://github.com/dotansimha/graphql-code-generator) Code generator based on a GraphQL schema

## Prerequisites

-   [`nvm`](https://github.com/creationix/nvm#installation)
-   [`yarn`](https://yarnpkg.com/en/docs/install)
-   `cp .env.exmaple .env.development` Create config.js
-   [Get your Github User Token](https://github.com/settings/tokens) and paste it to the `.env.development` (required scope: ['read:org'])

## Start development

-   `nvm use`
-   `yarn`
-   `yarn start`
-   open a borwser on http://localhost:1234
