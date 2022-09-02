import { start as orders } from './services/orders/index.js';
import { start as products } from './services/products/index.js';
import { start as users } from './services/users/index.js';
import { start as gateway } from './gateway/index.js';

(async () => {
  // start all subgraphs
  await Promise.all([orders(), products(), users()]);
  // start gateway
  await gateway();
})();
