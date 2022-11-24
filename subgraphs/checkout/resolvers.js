import { users } from "./data.js";

const getUserById = (id) => users.find((it) => it.id === id);

export const resolvers = {
  User: {
    cart: (parent) => getUserById(parent.id).cart
  },
  Mutation: {
    viewer: () => ({})
  },
  ViewerMutations: {
    checkout: () => ({
      successful: true,
      orderID: 'mockOderId123'
    }),
    addVariantToCart: () => ({
      successful: true,
      message: 'MOCK: Added variant to cart'
    }),
    removeVariantFromCart: () => ({
      successful: true,
      message: 'MOCK: Removed variant from cart'
    }),
  }
};
