import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getCheckoutSchema } from './checkout/subgraph.js';
import { getDiscoverySchema } from './discovery/subgraph.js';
import { getInventorySchema } from './inventory/subgraph.js';
import { getOrdersSchema } from './orders/subgraph.js';
import { getProductsSchema } from './products/subgraph.js';
import { getReviewsSchema } from './reviews/subgraph.js';
import { getShippingSchema } from './shipping/subgraph.js';
import { getUsersSchema } from './users/subgraph.js';

export const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: 'checkout',
    getSchema: getCheckoutSchema
  },
  {
    name: 'discovery',
    getSchema: getDiscoverySchema
  },
  {
    name: 'inventory',
    getSchema: getInventorySchema
  },
  {
    name: 'orders',
    getSchema: getOrdersSchema
  },
  {
    name: 'products',
    getSchema: getProductsSchema
  },
  {
    name: 'reviews',
    getSchema: getReviewsSchema
  },
  {
    name: 'shipping',
    getSchema: getShippingSchema
  },
  {
    name: 'users',
    getSchema: getUsersSchema
  }
];

const getLocalSubgraphConfig = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName);

export const startSubgraphs = async (httpPort) => {
  // Create a monolith express app for all subgraphs
  const app = express();
  const httpServer = http.createServer(app);
  const serverPort = process.env.PORT ?? httpPort;

  // Run each subgraph on the same http server, but at different paths
  for (const subgraph of LOCAL_SUBGRAPH_CONFIG) {
    const subgraphConfig = getLocalSubgraphConfig(subgraph.name);
    const schema = subgraphConfig.getSchema();
    const server = new ApolloServer({
      schema,
      // For a real subgraph introspection should remain off, but for demo we enabled
      introspection: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginInlineTraceDisabled()]
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

    console.log(`Setting up [${subgraphConfig.name}] subgraph at http://localhost:${serverPort}${path}`);
  }

  // Start entire monolith at given port
  await new Promise((resolve) => httpServer.listen({ port: serverPort }, resolve));

  console.log('All subgraphs started.')
};
