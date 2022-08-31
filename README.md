# industry-vertical-retail

Example [supergraph](https://www.apollographql.com/docs/federation) for a retail business

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Usage

Provide detailed usage instructions here.

## Running Locally

### Install requirements
* Install the latest LTS version of Node (preferably using [nvm](https://github.com/nvm-sh/nvm))
* Install Apollo's [Rover CLI](https://www.apollographql.com/docs/rover)

### Running the subgraphs

Run the subgraphs which use [Apollo Server](https://www.apollographql.com/docs/apollo-server/) using `npm`

```shell
npm start
```

### Running the Router

After the subgraphs are started, run the [Apollo Router](https://www.apollographql.com/docs/router) locally

```shell
cd router
./start-local.sh
```
