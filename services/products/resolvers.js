import { PRODUCTS, VARIANTS } from "./data.js";

export const getVariantById = (id) => VARIANTS.find((it) => it.id === id);
export const getProductById = (id) => PRODUCTS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    variant(_, { id }, __, ___) {
      return variants.find((vara) => vara.id === id);
    },
    Product(_, { id }, __, ___) {
      return products.find((prod) => prod.id === id);
    },
    search(_, { searchInput }) {
      if (!searchInput) {
        return variants;
      }
      if (!!searchInput.titleStartsWith) {
        const t = products.filter((p) =>
          p.title.startsWith(searchInput.titleStartsWith)
        );
        console.log(JSON.stringify(variants, undefined, 2));
        const res = [];

        t.forEach((p) => p.variants.forEach((v) => res.push(v)));

        return res;
      }
      if (!!searchInput.sizeStartsWith) {
        return variants.filter((v) =>
          v.size.startsWith(searchInput.sizeStartsWith)
        );
      }
      return [];
    },
    allProducts(_, { searchInput }) {
      if (!searchInput) {
        return PRODUCTS;
      } else if (searchInput?.titleStartsWith) {
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
      const allVariants = getProductById(parent.id).variants.map((it) =>
        getVariantById(it.id)
      );

      if (!searchInput) {
        return allVariants;
      } else if (searchInput?.sizeStartsWith) {
        return allVariants.filter((it) =>
          it.size.startsWith(searchInput.sizeStartsWith)
        );
      } else {
        return allVariants;
      }
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
