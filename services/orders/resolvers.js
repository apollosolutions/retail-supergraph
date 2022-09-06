import { orders } from "./data.js";

export const resolvers = {
  Query: {
    order(_, { id }, __, ___) {
      return orders.find((order) => order.id === id);
    },
  },
};
