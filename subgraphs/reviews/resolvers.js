import { REVIEWS } from "./data.js";

export const getReviewsById = (reviewId) => REVIEWS.find((it) => it.id === reviewId);
export const getReviewsByProductUpc = (productUpc) => REVIEWS.filter((it) => it.product.upc === productUpc);

export const resolvers = {
  Review: {
    __resolveReference: (ref) => getReviewsById(ref.id)
  },
  Product: {
    reviews: (parent) => getReviewsByProductUpc(parent.upc)
  }
};
