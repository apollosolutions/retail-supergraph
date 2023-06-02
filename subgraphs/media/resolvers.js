import { MEDIA } from "./data.js";

export const getMediaById = (id) => MEDIA.find((it) => it.id === id);

export const resolvers = {
  Query: {
    media: (_, { id }) => getMediaById(id),
    searchProducts(_, { searchInput }) {
      if (searchInput?.titleStartsWith) {
        return MEDIA.filter((p) =>
          p.title.startsWith(searchInput.titleStartsWith)
        );
      }

      return MEDIA;
    },
  },
  Media: {
    __resolveReference(ref) {
      return getMediaById(ref.id);
    },
    releaseDate: () => getRandomDate().toISOString(),
    content: () => {},
  },
};

const getRandomDate = () => {
  // Get a random number between -10 and 10
  const randomDays = Math.floor(Math.random() * 20) - 10;
  const today = new Date();

  // Add the random number of days to today's date
  return new Date(today.getTime() + randomDays * 24 * 60 * 60 * 1000);
};
