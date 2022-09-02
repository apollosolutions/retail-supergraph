import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'orders',
        url: 'http://localhost:4001/graphql',
      },
      {
        name: 'products',
        url: 'http://localhost:4002/graphql',
      },
      {
        name: 'users',
        url: 'http://localhost:4003/graphql',
      },
    ]
  })
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})]
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Gateway running at ${url}`);
});