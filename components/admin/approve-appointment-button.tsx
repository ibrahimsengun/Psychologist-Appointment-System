'use client';

import { updateAppointmentStatus } from '@/actions/appointment-actions';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function ApproveAppointmentButton({ id }: { id: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const approve = async () => {
    setIsSaving(true);
    try {
      await updateAppointmentStatus(id, 'confirmed');
      toast.success('Randevu onaylandı, danışana e-posta gönderildi');
      router.refresh();
    } catch {
      toast.error('Randevu onaylanamadı, lütfen tekrar deneyin');
      setIsSaving(false);
    }
  };

  return (
    <Button size="sm" onClick={approve} disabled={isSaving}>
      {isSaving ? 'Onaylanıyor…' : 'Onayla'}
    </Button>
  );
}
