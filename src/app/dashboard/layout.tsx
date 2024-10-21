'use client';

import React, { ReactNode, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { LOGIN_QUERY } from 'src/queries';
import { redirect } from 'next/navigation';
import { SidebarProvider } from 'components/ui/sidebar';
import AppSidebar from 'components/AppSidebar';

const DashboardLayout: React.FC<{children: ReactNode}> = ({ children }) => {
    const client = useApolloClient();

    const cached = client.readQuery({ query: LOGIN_QUERY  });

    useEffect(() => {
        if (!cached?.login) {
            console.log('redirecting');
            redirect('/login');
        }
    }, [cached]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <h1>Dashboard Layout</h1>
                {children}
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;