import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export const { getClient } = registerApolloClient(() => new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: process.env.API_URL
    })
}));