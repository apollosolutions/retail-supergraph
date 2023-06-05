import { users } from "./data.js";
import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";

const getUserById = (id) => users.find((user) => user.id === id);

export const resolvers = {
  Query: {
    user(_, __, context) {
      const userId = context.headers["x-user-id"];
      const user = getUserById(userId);

      if (!user) {
        throw new GraphQLError(
          "Could not locate user by id. Please specify a valid `x-user-id` header like `user:1`"
        );
      }

      return user;
    },
  },
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    },
    previousSessions: () => [uuidv4(), uuidv4()],
    accountId: () => Math.floor(Math.random() * 100000),
  },
};
