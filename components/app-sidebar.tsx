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
    SidebarMenuBadge,
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
    Clock,
    HelpCircle,
    Home,
    MessageCircleQuestion,
    ImageIcon,
    LogOut,
    Mail,
    MessageSquareText,
    LayoutDashboard,
    Video,
    Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/actions/auth-actions';
import { AdminBadgeCounts } from '@/types/dashboard';

const adminGroups = [
    {
        label: 'Günlük İşler',
        links: [
            { name: 'Bugün', url: '/admin', icon: LayoutDashboard },
            { name: 'Randevular', url: '/admin/appointments', icon: Calendar, badge: 'appointments' as const },
            { name: 'Sorular', url: '/admin/questions', icon: MessageCircleQuestion, badge: 'questions' as const },
            { name: 'Mesajlar', url: '/admin/messages', icon: Mail },
        ],
    },
    {
        label: 'Site İçeriği',
        links: [
            { name: 'Blog Yazıları', url: '/admin/blog', icon: BookText },
            { name: 'Blog Kategorileri', url: '/admin/categories', icon: ChartBarStacked },
            { name: 'Hizmetler', url: '/admin/services', icon: Briefcase },
            { name: 'Yorumlar', url: '/admin/reviews', icon: MessageSquareText },
            { name: 'Videolar', url: '/admin/videos', icon: Video },
            { name: 'Galeri', url: '/admin/gallery', icon: ImageIcon },
            { name: 'Sık Sorulanlar', url: '/admin/faqs', icon: HelpCircle },
        ],
    },
    {
        label: 'Ayarlar',
        links: [
            { name: 'Çalışma Saatleri', url: '/admin/available-times', icon: Clock },
            { name: 'Site Ayarları', url: '/admin/settings', icon: Settings },
        ],
    },
];

interface AppSidebarProps {
    userEmail: string | null;
    badgeCounts: AdminBadgeCounts;
}

export function AppSidebar({ userEmail, badgeCounts }: AppSidebarProps) {
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
                {adminGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.links.map((link) => {
                                    const Icon = link.icon;
                                    const count = 'badge' in link && link.badge ? badgeCounts[link.badge] : 0;
                                    return (
                                        <SidebarMenuItem key={link.url}>
                                            <SidebarMenuButton asChild isActive={isActive(link.url)}>
                                                <Link href={link.url}>
                                                    <Icon className="w-4 h-4" />
                                                    <span>{link.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                            {count > 0 && (
                                                <SidebarMenuBadge className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                                                    {count}
                                                </SidebarMenuBadge>
                                            )}
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

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
