import { orders } from "./data.js";

const getOrderById = (id) => orders.find((it) => it.id === id);

export const resolvers = {
  Query: {
    order(_, { id }) {
      return getOrderById(id);
    },
  },
  Order: {
    __resolveReference(ref) {
      return getOrderById(ref.id);
    },
  },
};
