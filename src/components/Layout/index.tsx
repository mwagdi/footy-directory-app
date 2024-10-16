import React, { ReactNode } from 'react';

const Layout: React.FC<{children: ReactNode}> = ({ children }) => (
    <main>{children}</main>
);

export default Layout;