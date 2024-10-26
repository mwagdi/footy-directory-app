'use client';

import { useApolloClient } from '@apollo/client';
import React from 'react';
import { LOGIN_QUERY } from 'src/queries';

const Dashboard: React.FC = () => {
    const client = useApolloClient();

    const x = client.readQuery({ query: LOGIN_QUERY  });
    console.log({ x });

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;