import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getSchema as getUsersSchema } from "@apollosolutions/retail-supergraph-users/server.js";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServer} from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

export const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: 'users',
    port: 4008,
    url: 'http://localhost:4008/users/graphql',
    getSchema: getUsersSchema
  }
];

const getLocalSubgraphConfig = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName);

export const startSubgraphs = async () => {
  // Create a monolith express app for all subgraphs
  const app = express();
  const httpServer = http.createServer(app);

  // Run each subgraph on the same http server, but at different paths
  for (const subgraph of LOCAL_SUBGRAPH_CONFIG) {
    const subgraphConfig = getLocalSubgraphConfig(subgraph.name);
    const serverPort = process.env.PORT ?? subgraphConfig.port;
    const schema = subgraphConfig.getSchema();
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();

    const path = `/${subgraphConfig.name}/graphql`;
    app.use(
      path,
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ headers: req.headers })
      })
    );

    await new Promise((resolve) => httpServer.listen({ port: serverPort }, resolve));

    console.log(`${subgraphConfig.name} subgraph running at http://localhost:${serverPort}${path}`);
  }
};
