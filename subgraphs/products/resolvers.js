import { PRODUCTS, VARIANTS } from "./data.js";

export const getVariantById = (id) => VARIANTS.find((it) => it.id === id);
export const getProductById = (id) => PRODUCTS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    product: (_, { id }) => getProductById(id),
    variant: (_, { id }) => getVariantById(id),
    searchVariants(_, { searchInput }) {
      if (searchInput?.sizeStartsWith) {
        return VARIANTS.filter((v) =>
          v.size.startsWith(searchInput.sizeStartsWith)
        );
      }

      return VARIANTS;
    },
    searchProducts(_, { searchInput }) {
      if (searchInput?.titleStartsWith) {
        return PRODUCTS.filter((p) =>
          p.title.startsWith(searchInput.titleStartsWith)
        );
      }

      return PRODUCTS;
    },
  },
  Product: {
    __resolveReference(ref) {
      return getProductById(ref.id);
    },
    variants(parent, { searchInput }) {
      const variants = getProductById(parent.id).variants.map((it) =>
        getVariantById(it.id)
      );

      if (searchInput?.sizeStartsWith) {
        return variants.filter((it) =>
          it.size.startsWith(searchInput.sizeStartsWith)
        );
      }
      return variants;
    },
  },
  Variant: {
    __resolveReference(ref) {
      return getVariantById(ref.id);
    },
    product(parent) {
      const productId = getVariantById(parent.id).product.id;
      return getProductById(productId);
    },
  },
};
