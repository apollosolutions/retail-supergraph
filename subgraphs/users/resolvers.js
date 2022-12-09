import { users } from "./data.js";

const getUserById = (id) => users.find((it) => it.id === id);

export const resolvers = {
  Query: {
    user(_, __, context) {
      const userId = context.headers["x-user-id"];

      if (!userId) {
        return null;
      }

      return getUserById(userId);
    },
  },
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    },
  },
};
