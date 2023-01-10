# Local Development Instructions

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

### Running just subgraphs in production mode
The subgraphs are deployed all together in a single Express app. You can run them all together in production mode with

```shell
npm start
```
