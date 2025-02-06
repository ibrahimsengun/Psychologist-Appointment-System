import { signOut } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-2 mb-12">
        <div className="container mx-auto flex flex-row justify-between items-center">
          <span className="text-2xl font-bold">Admin Panel</span>
          <div>
            <Button variant="outline" onClick={signOut}>
              Çıkış
            </Button>
          </div>
        </div>
      </header>
      {children}
      <footer></footer>
    </>
  );
}
