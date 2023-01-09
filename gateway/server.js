import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { DataSourceWithHeaders } from "./header-forwarding.js";

export const start = async (gatewayPort, subgraphsPort, localSubgraphConfig) => {
  const gateway = new ApolloGateway({
    ...getGatewayConfig(subgraphsPort, localSubgraphConfig),
    buildService: (config) => {
      return new DataSourceWithHeaders(config);
    },
  });

  const server = new ApolloServer({
    gateway,
    includeStacktraceInErrorResponses: isDebugMode(),
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
  });

  const serverPort = gatewayPort ?? process.env.PORT;
  const { url } = await startStandaloneServer(server, {
    listen: { port: serverPort },
    async context({ req }) {
      return { headers: req.headers };
    },
  });
  console.log(`🚀 Gateway running at ${url}`);
};

const getGatewayConfig = (subgraphsPort, localSubgraphConfig) => {
  if (process.env.NODE_ENV === "dev") {
    return {
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: localSubgraphConfig.map(it => ({
          name: it.name,
          url: `http://localhost:${subgraphsPort}/${it.name}/graphql`
        })),
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
