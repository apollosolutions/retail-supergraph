import {PRODUCTS, VARIANTS} from "./data.js";

export const getVariantById = (id) => VARIANTS.find(it => it.id === id);
export const getProductById = (id) => PRODUCTS.find(it => it.id === id);

export const resolvers = {
  Query: {
    allProducts(_, { searchInput }) {
      if (!searchInput) {
        return PRODUCTS;
      }
      else if (searchInput?.titleStartsWith) {
        return PRODUCTS.filter((p) =>
          p.title.startsWith(searchInput.titleStartsWith)
        );
      } else {
        return PRODUCTS;
      }
    },
  },
  Product: {
    __resolveReference(ref) {
      return getProductById(ref.id);
    },
    variants(parent, { searchInput }) {
      const allVariants = getProductById(parent.id).variants.map(it => getVariantById(it.id));

      if (!searchInput) {
        return allVariants;
      }
      else if (searchInput?.sizeStartsWith) {
        return allVariants.filter(it => it.size.startsWith(searchInput.sizeStartsWith))
      } else {
        return allVariants;
      }
    }
  },
  Variant: {
    __resolveReference(ref) {
      return getVariantById(ref.id)
    },
    product(parent) {
      const productId = getVariantById(parent.id).product.id;
      return getProductById(productId);
    }
  }
};
