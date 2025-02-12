'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { ServiceForm } from '../forms/service-form';
import { updateService } from '@/actions/service-actions';
import { useState } from 'react';
import { Service, ServiceFormValues } from '@/types/service';

interface UpdateServiceDialogProps {
  service: Service;
}

export function UpdateServiceDialog({ service }: UpdateServiceDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hizmet Düzenle</DialogTitle>
        </DialogHeader>
        <ServiceForm
          initialData={service}
          onSubmit={async (data: ServiceFormValues) => {
            await updateService(service.id, data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
