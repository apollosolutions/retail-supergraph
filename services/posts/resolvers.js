import { posts } from "./data.js";

export const resolvers = {
  Author: {
    posts(author, args, context, info) {
      return posts.filter(post => post.authorID === author.id);
    }
  },

  Post: {
    __resolveReference(reference, _, __) {
      return posts.find(post => post.id === parseInt(reference.id));
    },
    author(post) {
      return { __typename: "Author", id: post.authorID };
    }
  },

  Query: {
    post(root, { id }, context, info) {
      return posts.find(post => post.id === parseInt(id));
    },
    posts(root, args, context, info) {
      return posts;
    }
  },

  Mutation: {
    addPost(root, args, context, info) {
      const postID = posts.length + 1;
      const post = {
        ...args,
        id: postID,
        publishedAt: new Date().toISOString()
      };

      posts.push(post);
      return post;
    }
  }
};