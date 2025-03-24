import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { env } from "@/shared/env";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: createHttpLink({
    uri: env.NEXT_PUBLIC_API_URL,
  }),
});
