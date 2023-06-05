# Apollo GraphOS for Media

This repo provides a demonstration supergraph for a media business containing media and users subgraphs. You can explore the schema and run queries against it in Apollo Studio. We encourage you to also use the schema as inspiration for your own media supergraph!

## Getting Started

locally run Subgraphs:

```
npm run dev
```

locally run Router:

```
npm run router
```

NOTE: If this is your first time running the project, make sure you have first downloaded the latest version of Router using the following command:

```
curl -sSL https://router.apollo.dev/download/nix/latest | sh
```

## View the Schema

This demo is published to the [Apollo Solutions organization](https://studio.apollographql.com/org/apollo-solutions) in Apollo Studio with the graph ID [apollo-media-supergraph](https://studio.apollographql.com/graph/apollo-media-supergraph).

You can also view and share the [public variant](https://studio.apollographql.com/public/apollo-media-supergraph/home?variant=prod) to run queries right from Explorer.

## What's Inside

If you would like to run some sample operations, checkout the public [Operation Collections](https://studio.apollographql.com/public/apollo-media-supergraph/explorer?collectionId=9da0ba4b-12d1-4ebb-89bb-bed4a4d476ff&focusCollectionId=9da0ba4b-12d1-4ebb-89bb-bed4a4d476ff&variant=prod) in Explorer.

We also have a series of blog posts on media best practices that dive into different elements of this schema to illustrate how Apollo GraphOS helps power essential features of modern media applications:

- _Blogs currently in progress_

## GraphOS Features Demonstrated in Repo

Below is the list of GraphOS Specific features that are demonstrated in this repo:

- @Defer
- Subscriptions
- Entity Interface

## Local Development

If you want to run this supergraph locally you can clone this [GitHub repo](https://github.com/apollosolutions/media-supergraph) and follow the instructions in [DEV.md](https://github.com/apollosolutions/media-supergraph/blob/main/DEV.md).

## Disclaimer

The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.
