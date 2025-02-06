'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { AppointmentCancelFormValues, appointmentCancelFormSchema } from '@/types/appointments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { toast } from 'sonner';

interface AppointmentCancelFormProps {
  onSubmit: (data: AppointmentCancelFormValues) => Promise<void>;
}

export function AppointmentCancelForm({ onSubmit }: AppointmentCancelFormProps) {
  const form = useForm<AppointmentCancelFormValues>({
    resolver: zodResolver(appointmentCancelFormSchema),
    defaultValues: {
      phone: '',
      cancelCode: ''
    }
  });

  const handleSubmit = async (data: AppointmentCancelFormValues) => {
    try {
      await onSubmit(data);
      toast.success('Randevunuz başarıyla iptal edildi');
      form.reset({
        phone: '',
        cancelCode: ''
      });
      form.clearErrors();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Randevu iptal edilirken bir hata oluştu');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon Numarası</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  mask="0500 000 00 00"
                  definitions={{
                    '0': /[0-9]/,
                    '5': /[5]/
                  }}
                  unmask={false}
                  value={field.value}
                  onAccept={(value) => field.onChange(value)}
                  placeholder="05XX XXX XX XX"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cancelCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İptal Kodu</FormLabel>
              <FormControl>
                <IMaskInput
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  mask="000000"
                  unmask={false}
                  value={field.value}
                  onAccept={(value) => field.onChange(value)}
                  placeholder="6 haneli iptal kodu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Randevuyu İptal Et
        </Button>
      </form>
    </Form>
  );
}
