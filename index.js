import { startSubgraphs } from './subgraphs/subgraphs.js';

// For local development, we will run `rover dev` that will handle
// composition and configure the ports of the Router and subgraphs manually
// See supergraph-config-dev.yaml for config setup
(async () => {
  // start subgraphs in monolith mode
  let port = undefined;
  if (process.env.NODE_ENV === 'dev') {
    // If you change this port for local dev, update rover dev config
    port = 4001;
  }
  await startSubgraphs(port);
})();
