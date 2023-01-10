import { start as gateway } from "./gateway/server.js";
import { LOCAL_SUBGRAPH_CONFIG, startSubgraphs } from "./subgraphs/subgraphs.js";

// For local development, we will run a local gateway that will handle
// composition and configure the ports of the gateway and subgraphs manually.
// We could use `rover dev` here but that will not work for Stackblitz
(async () => {
  // start subgraphs in monolith mode
  await startSubgraphs(4001);

  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));

  // start gateway
  await gateway(4000, 4001, LOCAL_SUBGRAPH_CONFIG);
})();
