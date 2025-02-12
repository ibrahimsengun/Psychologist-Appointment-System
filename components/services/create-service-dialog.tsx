'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { ServiceForm } from '../forms/service-form';
import { createService } from '@/actions/service-actions';
import { useState } from 'react';
import { ServiceFormValues } from '@/types/service';

export function CreateServiceDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Hizmet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Hizmet Ekle</DialogTitle>
        </DialogHeader>
        <ServiceForm
          onSubmit={async (data: ServiceFormValues) => {
            await createService(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
