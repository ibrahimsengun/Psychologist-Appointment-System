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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Service, ServiceFormValues, serviceFormSchema } from '@/types/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ServiceFormProps {
  initialData?: Service;
  onSubmit:
    | ((data: ServiceFormValues) => Promise<any>)
    | ((id: string, data: ServiceFormValues) => Promise<any>);
}

export function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description || undefined
        }
      : {
          name: '',
          description: undefined
        }
  });

  const handleSubmit = async (data: ServiceFormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        await (onSubmit as (id: string, data: ServiceFormValues) => Promise<any>)(
          initialData.id,
          data
        );
      } else {
        await (onSubmit as (data: ServiceFormValues) => Promise<any>)(data);
      }
      toast.success(initialData ? 'Hizmet güncellendi' : 'Hizmet oluşturuldu');
      router.push('/admin/services');
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      toast.error(error instanceof Error ? error.message : 'Hizmet kaydedilirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hizmet Adı</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">{initialData ? 'Güncelleniyor' : 'Oluşturuluyor'}</span>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : initialData ? (
            'Güncelle'
          ) : (
            'Oluştur'
          )}
        </Button>
      </form>
    </Form>
  );
}
