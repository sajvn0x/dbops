import { Link, useLocation } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Database, Terminal, LineChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Connections', href: '/', icon: Database },
    { name: 'Query Editor', href: '/query', icon: Terminal },
    { name: 'Monitoring', href: '/monitoring', icon: LineChart },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navbar() {
    const location = useLocation();

    return (
        <header className="border-b">
            <div className="container flex h-16 items-center px-4">
                <div className="mr-8 font-bold text-xl">DBOps</div>
                <NavigationMenu>
                    <NavigationMenuList className="space-x-2">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink asChild active={isActive}>
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                                                isActive
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'hover:bg-accent hover:text-accent-foreground'
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}