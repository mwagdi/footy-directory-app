'use client';

import React, { ReactNode, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from 'components/ui/sidebar';
import AppSidebar from 'components/AppSidebar';
import { LOGIN_QUERY } from 'src/queries';
import { Toaster } from 'components/ui/sonner';

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
            <main className="p-5">
                <SidebarTrigger />
                {children}
            </main>
            <Toaster />
        </SidebarProvider>
    );
};

export default DashboardLayout;