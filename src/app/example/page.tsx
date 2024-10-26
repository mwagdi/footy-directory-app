'use client';

import React from 'react';
import { useApolloClient } from '@apollo/client';

import { LOGIN_QUERY } from 'src/queries';

const Example: React.FC = () => {
    const client = useApolloClient();

    const x = client.readQuery({ query: LOGIN_QUERY  });
    console.log(x);

    return (
        <div>
            <h1>Example</h1>
        </div>
    );
};

export default Example;