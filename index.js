import { start as orders } from './services/orders/index.js';
import { start as products } from './services/products/index.js';
import { start as users } from './services/users/index.js';
import { start as gateway } from './gateway/index.js';

(async () => {
  // start all subgraphs
  await Promise.all([orders(), products(), users()]);
  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));
  // start gateway
  await gateway();
})();
