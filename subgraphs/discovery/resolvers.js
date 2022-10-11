const PRODUCT_IDS = [
  { id: "product:1" },
  { id: "product:2" },
  { id: "product:3" },
  { id: "product:4" },
  { id: "product:5" },
];

export const resolvers = {
  User: {
    recommendedProducts: () => {
      // Probably better to have some machine learning process here,
      // but we will simulate by randomly returning products
      return PRODUCT_IDS.filter(() => Math.random() < 0.5)
    }
  },
};
