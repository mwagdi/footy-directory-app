'use client';

import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { persistCache } from 'apollo3-cache-persist';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { PropsWithChildren } from 'react';

const cache = new InMemoryCache();

(async () => {
    if (typeof window !== 'undefined') {
        await persistCache({
            cache,
            storage: window.localStorage,
        });
    }
})();

// have a function to create a client for you
const makeClient = () => {
    const uploadLink = createUploadLink({
        uri: 'https://footy-directory-59316565a7b1.herokuapp.com/',
        fetchOptions: { cache: 'no-store' },
        headers: {
           'Apollo-Require-Preflight': 'true',
            // 'Content-Type': 'application/json',
        }
    });



    // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
    return new ApolloClient({
        // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
        cache,
        link: uploadLink,
    });
};

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}