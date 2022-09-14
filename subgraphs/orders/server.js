import {ApolloServer, gql} from "apollo-server";
import {ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core";
import {buildSubgraphSchema} from "@apollo/subgraph";
import {resolvers} from "./resolvers.js";
import {readFileSync} from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const typeDefs = gql(readFileSync(resolve(__dirname, "schema.graphql"), "utf8"));
const schema = buildSubgraphSchema([{typeDefs, resolvers}]);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})]
});

export const start = async (port) => {
  const serverPort = port ?? process.env.PORT;
  const { url } = await server.listen(serverPort);
  console.log(`📝 Orders subgraph running at ${url}`);
};
