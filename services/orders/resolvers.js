import { orders } from "./data.js";

const getOrderById = (id) => orders.find(it => it.id === id);

export const resolvers = {
  Query: {
    order(_, { id }, __, ___) {
      return getOrderById(id);
    },
    allOrdersForUser(_, { id }) {
      return orders.filter(it => it.buyer.id === id);
    }
  },
  Order: {
    __resolveReference(ref) {
      return getOrderById(ref.id);
    }
  }
};
