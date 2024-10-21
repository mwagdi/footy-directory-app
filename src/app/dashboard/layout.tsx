import React, { ReactNode } from 'react';

const DashboardLayout: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div style={{ background: 'black' }}>
            <h1>Dashboard Layout</h1>
            {children}
        </div>
    );
};

export default DashboardLayout;