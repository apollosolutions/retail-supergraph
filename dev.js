import { startSubgraphs } from "./subgraphs/subgraphs.js";

// For local development, we will run a local router that will handle
// composition and configure the ports of the router and subgraphs manually.
// We could use `rover dev` here but that will not work for Stackblitz
(async () => {
  // start subgraphs in monolith mode
  await startSubgraphs(4001);
})();
