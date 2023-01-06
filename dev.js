import { start as checkout } from "@apollosolutions/retail-supergraph-checkout/server.js";
import { start as discovery } from "@apollosolutions/retail-supergraph-discovery/server.js";
import { start as inventory } from "@apollosolutions/retail-supergraph-inventory/server.js";
import { start as orders } from "@apollosolutions/retail-supergraph-orders/server.js";
import { start as products } from "@apollosolutions/retail-supergraph-products/server.js";
import { start as reviews } from "@apollosolutions/retail-supergraph-reviews/server.js";
import { start as shipping } from "@apollosolutions/retail-supergraph-shipping/server.js";
import { start as users } from "@apollosolutions/retail-supergraph-users/server.js";
import { start as gateway } from "@apollosolutions/retail-supergraph-gateway/server.js";

const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: "checkout",
    port: 4001
  },
  {
    name: "discovery",
    port: 4002
  },
  {
    name: "inventory",
    port: 4003
  },
  {
    name: "orders",
    port: 4004
  },
  {
    name: "products",
    port: 4005
  },
  {
    name: "reviews",
    port: 4006
  },
  {
    name: "shipping",
    port: 4007
  },
  {
    name: "users",
    port: 4008,
    url: 'http://localhost:4008/users/graphql'
  }
];

const getLocalPort = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName).port;

(async () => {
  // start all subgraphs
  await Promise.all([
    checkout(getLocalPort('checkout')),
    discovery(getLocalPort('discovery')),
    inventory(getLocalPort('inventory')),
    orders(getLocalPort('orders')),
    products(getLocalPort('products')),
    reviews(getLocalPort('reviews')),
    shipping(getLocalPort('shipping')),
    users(getLocalPort('users')),
  ]);

  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));

  // start gateway
  await gateway(4000, LOCAL_SUBGRAPH_CONFIG);
})();
