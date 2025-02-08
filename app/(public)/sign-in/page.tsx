'use client';

import { signIn } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function SigninPage() {
  const [error, setError] = useState<string>('');

  async function handleSubmit(formData: FormData) {
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-[68vh] flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Admin Girişi</CardTitle>
          <CardDescription>Yönetici paneline erişmek için giriş yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" name="email" type="email" placeholder="ornek@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
