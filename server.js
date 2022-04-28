import { createServer } from "@graphql-yoga/node";

import Query from "./src/Resolvers/Query";
import typeDefs from "./src/typeDefs/schema";

const server = new createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: {
      Query,
    },
  },
});

server.start();
