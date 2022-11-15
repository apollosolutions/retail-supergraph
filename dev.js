import { start as users } from "@apollosolutions/financial-supergraph-users/server.js";
import { start as gateway } from "@apollosolutions/financial-supergraph-gateway/server.js";

const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: "users",
    port: 4001,
    url: `http://localhost:4001/graphql`,
  }
];

const getLocalPort = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName).port;

(async () => {
  // start all subgraphs
  await Promise.all([
    users(getLocalPort('users'))
  ]);

  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));

  // start gateway
  await gateway(4000, LOCAL_SUBGRAPH_CONFIG);
})();
