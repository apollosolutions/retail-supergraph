import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DataSourceWithHeaders } from "./header-forwarding.js";

export const start = async (port) => {
  const gateway = new ApolloGateway({
    ...getGatewayConfig(),
    buildService: (config) => {
      return new DataSourceWithHeaders(config);
    },
  });

  const server = new ApolloServer({
    gateway,
    debug: isDebugMode(),
    cache: "bounded",
    csrfPrevention: true,
  });

  const serverPort = port ?? process.env.PORT;
  const { url } = await startStandaloneServer(server, {
    listen: { port: serverPort },
    async context({ req }) {
      return { headers: req.headers };
    },
  });
  console.log(`🚀 Gateway running at ${url}`);
};

const getGatewayConfig = () => {
  if (process.env.NODE_ENV === "dev") {
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
        ],
      }),
      debug: isDebugMode(),
    };
  } else {
    return {
      debug: isDebugMode(),
    };
  }
};

const isDebugMode = () => {
  return (
    process.env.NODE_ENV === "dev" ||
    process.env.GATEWAY_DEBUG === "true" ||
    false
  );
};
