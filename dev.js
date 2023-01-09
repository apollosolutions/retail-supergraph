import { start as gateway } from "./gateway/server.js";
import { LOCAL_SUBGRAPH_CONFIG, startSubgraphs } from "./subgraphs.js";

(async () => {
  // start subgraphs in monolith mode
  await startSubgraphs(4001);

  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));

  // start gateway
  await gateway(4000, 4001, LOCAL_SUBGRAPH_CONFIG);
})();
