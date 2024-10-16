import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const { getClient } = registerApolloClient(() => new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: process.env.API_URL
    })
}));