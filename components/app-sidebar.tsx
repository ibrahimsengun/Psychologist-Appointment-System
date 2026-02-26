'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    BookText,
    Briefcase,
    Calendar,
    ChartBarStacked,
    ChevronUp,
    HelpCircle,
    Home,
    LogOut,
    Mail,
    Users,
    Video,
    Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/actions/auth-actions';

const adminLinks = [
    { name: 'Randevular', url: '/admin', icon: Calendar },
    { name: 'Müsait Zamanlar', url: '/admin/available-times', icon: Users },
    { name: 'Blog Yazıları', url: '/admin/blog', icon: BookText },
    { name: 'Blog Kategorileri', url: '/admin/categories', icon: ChartBarStacked },
    { name: 'SSS Yönetimi', url: '/admin/faqs', icon: HelpCircle },
    { name: 'İletişim Mesajları', url: '/admin/messages', icon: Mail },
    { name: 'Hizmetler', url: '/admin/services', icon: Briefcase },
    { name: 'Videolar', url: '/admin/videos', icon: Video },
    { name: 'Ayarlar', url: '/admin/settings', icon: Settings },
];

interface AppSidebarProps {
    userEmail: string | null;
}

export function AppSidebar({ userEmail }: AppSidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/admin') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                                    L
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Admin Panel</span>
                                    <span className="text-xs text-muted-foreground">Lokman Yılmaz</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Yönetim</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.url);
                                return (
                                    <SidebarMenuItem key={link.url}>
                                        <SidebarMenuButton asChild isActive={active}>
                                            <Link href={link.url}>
                                                <Icon className="w-4 h-4" />
                                                <span>{link.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Hızlı Erişim</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/" target="_blank">
                                        <Home className="w-4 h-4" />
                                        <span>Siteyi Görüntüle</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <div className="flex my-4 h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium text-sm">
                                        {userEmail?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none text-left">
                                        <span className="font-medium text-sm truncate max-w-[150px]">
                                            {userEmail || 'Kullanıcı'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">Admin</span>
                                    </div>
                                    <ChevronUp className="ml-auto h-4 w-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/" target="_blank">
                                        <Home className="mr-2 h-4 w-4" />
                                        Siteyi Görüntüle
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <form action={signOut} className="w-full">
                                        <button type="submit" className="flex items-center w-full text-destructive">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Çıkış Yap
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
