'use client';

import React from 'react';
import { gql, useApolloClient, useQuery } from '@apollo/client';

import { LOGIN_QUERY } from 'src/queries';

const EXAMPLE_QUERY = gql`
    query ExampleQuery {
        clubs {
            id
            name
        }
        players {
            id
            name
        }
    }
`;

const Example: React.FC = () => {
    const client = useApolloClient();
    const { data } = useQuery(EXAMPLE_QUERY);

    const loginQuery = client.readQuery({ query: LOGIN_QUERY  });
    console.log({ loginQuery, data });

    return (
        <div>
            <h1>Example</h1>
        </div>
    );
};

export default Example;