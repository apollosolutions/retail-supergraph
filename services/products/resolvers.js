import { getItems } from "./data.js";

const { products, variants } = getItems();

export const resolvers = {
  Author: {
    __resolveReference(reference, _, __) {
      return authors.find((author) => author.id === parseInt(reference.id));
    },
  },

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
  },
};
