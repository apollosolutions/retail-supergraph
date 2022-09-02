import { authors } from "./data.js";

export const resolvers = {
  Author: {
    __resolveReference(reference, _, __) {
      return authors.find(author => author.id === parseInt(reference.id));
    }
  },

  Query: {
    author(_, { id }, __, ___) {
      return authors.find(author => author.id === parseInt(id));
    },
    authors() {
      return authors;
    }
  }
};