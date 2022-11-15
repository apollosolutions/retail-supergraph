import { USERS } from "./data.js";

export const getUserById = (id) => USERS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    users: () => USERS
  },
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    }
  },
};
