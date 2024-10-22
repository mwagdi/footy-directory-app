import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from 'components/ui/sidebar';
import { Earth, Home, PersonStanding, Shield } from 'lucide-react';

const menuItems = [
    {
        icon: Home,
        label: 'Home',
        href: '/'
    },
    {
        icon: Earth,
        label: 'Create Nation',
        href: '/dashboard/nations/create'
    },
    {
        icon: Shield,
        label: 'Create Club',
        href: '/dashboard/clubs/create'
    },
    {
        icon: PersonStanding,
        label: 'Create Player',
        href: '/dashboard/players/create'
    }
];

const AppSidebar: React.FC = () => {
    return(
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarMenu>
                        {menuItems.map(item => (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton asChild>
                                    <a href={item.href}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;