import { startSubgraphs } from "./subgraphs/subgraphs.js";

// For production mode, we only run the subgraphs and the port
// will be provided via env variables
(async () => {
  // start subgraphs in monolith mode
  await startSubgraphs();
})();
