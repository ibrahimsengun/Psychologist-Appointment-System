'use client';

import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

interface AdminLayoutClientProps {
    children: React.ReactNode;
    userEmail: string | null;
}

export function AdminLayoutClient({ children, userEmail }: AdminLayoutClientProps) {
    return (
        <SidebarProvider>
            <AppSidebar userEmail={userEmail} />
            <SidebarInset>
                <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex-1" />
                </header>
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
