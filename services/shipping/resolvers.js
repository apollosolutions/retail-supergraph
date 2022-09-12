export const resolvers = {
  Order: {
    // Simulate calculating costs with some added randomness
    shippingCost: (parent) => {
      const variantCost = parent.items.map(it => getCostToShipToAddress(it.weight, parent.buyer.shippingAddress));
      const totalCost = variantCost.reduce((prev, cur) => prev + cur, 0);
      return totalCost + (Math.floor(Math.random() * 10));
    },
  },
};


// Simulate calculating real shipping costs from an address
// Just turn address string size to a number for simple math
const getCostToShipToAddress = (weight, address) => {
  return weight * address.length;
};
