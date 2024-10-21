'use client';

import { useApolloClient } from '@apollo/client';
import { LOGIN_QUERY } from '../../queries';
import React from 'react';

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