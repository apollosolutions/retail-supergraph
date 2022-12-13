const PRODUCT_IDS = [
  { id: "product:1" },
  { id: "product:2" },
  { id: "product:3" },
  { id: "product:4" },
  { id: "product:5" },
];

// Probably better to have some machine learning process here,
// but we will simulate by randomly returning products
const getRandomProductsExcludingOne = (productId) =>
  PRODUCT_IDS
    .filter(product => product.id !== productId)
    .filter(() => Math.random() < 0.7);

export const resolvers = {
  User: {
    recommendedProducts: (_, args) => {
      return getRandomProductsExcludingOne(args.productId);
    }
  },
  Product: {
    recommendedProducts: (parent) => {
      return getRandomProductsExcludingOne(parent.id);
    }
  }
};
