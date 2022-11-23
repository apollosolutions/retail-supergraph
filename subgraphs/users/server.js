import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { resolvers } from "./resolvers.js";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { authDirectiveTransformer } from "./auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sdlTypeDefs = parse(
  readFileSync(resolve(__dirname, "schema.graphql"), "utf8")
);
const schema = buildSubgraphSchema([
  { typeDefs: sdlTypeDefs, resolvers }
]);
const server = new ApolloServer({
  schema: authDirectiveTransformer(schema),
  cache: "bounded",
  csrfPrevention: true,
});

export const start = async (port) => {
  const serverPort = port ?? process.env.PORT;
  const { url } = await startStandaloneServer(server, {
    listen: { port: serverPort },
    async context({ req }) {
      return { headers: req.headers };
    },
  });
  console.log(`Users subgraph running at ${url}`);
};
