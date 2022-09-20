import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server";

export const start = async (port) => {
  const gateway = new ApolloGateway(getGatewayConfig());

  const server = new ApolloServer({
    gateway,
    debug: isDebugMode(),
    subscriptions: false,
    cache: "bounded",
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  const serverPort = port ?? process.env.PORT;
  const { url } = await server.listen(serverPort);
  console.log(`🚀 Gateway running at ${url}`);
};

const getGatewayConfig = () => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          {
            name: "orders",
            url: "http://localhost:4001/graphql",
          },
          {
            name: "products",
            url: "http://localhost:4002/graphql",
          },
          {
            name: "users",
            url: "http://localhost:4003/graphql",
          },
          {
            name: "inventory",
            url: "http://localhost:4004/graphql",
          },
          {
            name: "shipping",
            url: "http://localhost:4005/graphql",
          },
        ]
      }),
      debug: isDebugMode()
    };
  } else {
    return {
      debug: isDebugMode()
    };
  }
};

const isDebugMode = () => {
  return process.env.NODE_ENV === 'dev' || process.env.GATEWAY_DEBUG === 'true' || false;
};
