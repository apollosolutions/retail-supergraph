import { REVIEWS } from "./data.js";

export const getReviewsById = (reviewId) => REVIEWS.find((it) => it.id === reviewId);
export const getReviewsByProductId = (productId) => REVIEWS.filter((it) => it.product.id === productId);

export const resolvers = {
  Review: {
    __resolveReference: (ref) => getReviewsById(ref.id)
  },
  Product: {
    reviews: (parent) => getReviewsByProductId(parent.id)
  }
};
