export const MEDIA = [
  {
    id: "media:1",
    title: "Scaling Beyond The Monolith",
    description:
      "How do you transform an old monolithic GraphQL API into a federated schema, without sacrificing performance or breaking every single consumer in the process? Learn from the mistakes of TV 2, as they journey through the transformation of a 6 year old schema to federation.",
    mediaUrl:
      "blob:https://www.apollographql.com/1024b740-ead6-4ae7-9ef3-5f8df2071c8c",
  },
  {
    id: "media:2",
    title: "Building Great GraphQL Developer Experiences at Scale",
    description:
      "In this talk, Marc-Andre Giroux covers everything they’ve built at Netflix, from idea to production, to create high quality GraphQL APIs. Learn about what a powerful GraphQL developer experience can bring to their team, and what kind of tools and best practices can get them there.",
    mediaUrl:
      "blob:https://www.apollographql.com/3ffe0d76-a6ed-4390-98a6-ffb073f68bfa",
  },
  {
    id: "media:3",
    title:
      "Stranger Graphs – Scaling Netflix Financials with Federation & GraphQL",
    description:
      "Netflix spends 20+ billion dollars on content. At that scale, it is imminent they ensure that content is accounted for and paid for in a timely fashion and the numbers on our statements to Wall Street are accurate. To aid in the accuracy and completeness of financial data, their finance stakeholders rely on business applications to provide automated workflows, real time calculations and traceability. The Netflix Studio entities and their relationships are modeled as a federated graph with parts of this graph being served by independent teams. Timing differences in how the various studio teams operate make it challenging to make assumptions of upstream data and inform choices on how to model the data relationships in the graph. Learn how finance engineering teams at Netflix migrated from REST/Grpc to federated graphql and how to overcome challenges in a federated world when data across the ecosystem is fragmented. They have also had to overcome performance challenges given platform controlled timeout limits in the federated ecosystem. This talk covers Netflix’s performance challenges, how they solved the N+1 problem at both the resolver layer and ORM/database layer, sync v/s async considerations, leveraging codegen to speedup UI development, and how they coordinated between backend and frontend engineers to delivery value to our customers.",
    mediaUrl:
      "blob:https://www.apollographql.com/1b0d810b-484f-41a1-bd8b-a8b8ec32aa82",
  },
];
