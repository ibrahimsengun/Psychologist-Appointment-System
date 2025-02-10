'use client';

import { postContactForm } from '@/actions/contact-messages-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData, contactSchema } from '@/types/contact-messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { IMaskInput } from 'react-imask';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await postContactForm(data);
      setIsSuccess(true);
      toast.success('Mesajınız başarıyla gönderildi.');
      reset();
    } catch (error) {
      toast.error('Mesaj gönderilirken hata oluştu.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Adınız</Label>
        <Input id="name" {...register('name')} placeholder="Adınızı girin" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="E-posta adresinizi girin"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Telefon</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <IMaskInput
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              mask="(000) 000 00 00"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
              placeholder="(5XX) XXX XX XX"
            />
          )}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Mesajınız</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Mesajınızı buraya yazın..."
          rows={4}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
      </Button>

      {isSuccess && <p className="text-green-500 text-sm">Mesajınız başarıyla iletildi.</p>}
    </form>
  );
}
