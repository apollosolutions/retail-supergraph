import {ApolloServer, gql} from 'apollo-server';
import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';
import {buildSubgraphSchema} from '@apollo/subgraph';
import {resolvers} from './resolvers.js';
import {readFileSync} from 'fs';

const typeDefs = gql(readFileSync('services/users/schema.graphql', 'utf8'));
const schema = buildSubgraphSchema([{typeDefs, resolvers}]);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})],
  context: (c) => {
    return {headers: c.req.headers};
  },
});

export const start = async () => {
  const { url } = await server.listen(4003);
  console.log(`🚀 Users service running at ${url}`);
};
