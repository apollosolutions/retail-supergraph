import {users} from './data.js';

export const resolvers = {
  Query: {
    viewer(root, args, context, info) {
      const userId = context.headers['user-id'];

      if (!userId) {
        return null;
      }

      return users.find((user) => user.id === userId);
    },
  },
};
