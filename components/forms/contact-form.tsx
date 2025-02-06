'use client';

import { postContactForm } from '@/actions/contact-messages-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData, contactSchema } from '@/types/contact-messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await postContactForm(data);
    } catch (error) {
      toast.error('Mesaj gönderilirken hata oluştu.');
    }

    setIsSuccess(true);
    toast.success('Mesajınız başarıyla gönderildi.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4">
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
