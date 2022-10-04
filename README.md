# apollo-retail-supergraph

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/apollosolutions/retail-supergraph?title=Apollo%20Solutions%20-%20Retail%20Supergraph)

Example supergraph for a retail business

## Disclaimer
The code in this repository is experimental and has been provided for reference purposes only. Community feedback is
welcome but this project may not be supported in the same way that repositories in the
official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an
issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create
a ticket directly in Apollo Studio.

## View the schema

This demo is published to the [Apollo Solutions](https://studio.apollographql.com/org/apollo-solutions/graphs) Studio
org with the graph
id [retail-supergraph](https://studio.apollographql.com/graph/apollo-retail-supergraph).

You can also view and share the [public variant](https://studio.apollographql.com/public/apollo-retail-supergraph/home?variant=prod) to run queries right from Explorer.

## Running in browser

Using [Stackblitz](https://stackblitz.com/github/apollosolutions/retail-supergraph?title=Apollo%20Solutions%20-%20Retail%20Supergraph) you can run a local instance of this supergraph without cloning the repo.

## Running locally

### Software requirements

* Install the latest LTS version of Node (preferably using [nvm](https://github.com/nvm-sh/nvm))

### Install dependencies

```shell
npm install
```

### Running the subgraphs and gateway

Run the subgraphs and gateway, which use [Apollo Server](https://www.apollographql.com/docs/apollo-server/), using `npm`

```shell
npm run dev
```
