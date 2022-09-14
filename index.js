import { start as orders } from "@apollosolutions/industry-vertical-retail-orders/server.js";
import { start as products } from "@apollosolutions/industry-vertical-retail-products/server.js";
import { start as users } from "@apollosolutions/industry-vertical-retail-users/server.js";
import { start as inventory } from "@apollosolutions/industry-vertical-retail-inventory/server.js";
import { start as shipping } from "@apollosolutions/industry-vertical-retail-shipping/server.js";
import { start as gateway } from "@apollosolutions/industry-vertical-retail-gateway/server.js";

(async () => {
  // start all subgraphs
  await Promise.all([orders(4001), products(4002), users(4003), inventory(4004), shipping(4005)]);
  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));
  // start gateway
  await gateway(4000);
})();
