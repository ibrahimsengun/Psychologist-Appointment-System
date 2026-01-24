'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AppointmentFormValues, appointmentFormSchema } from '@/types/appointments';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { toast } from 'sonner';

interface AppointmentFormProps {
  availableTimeSlots: {
    date: string;
    times: string[];
  }[];
  action: (data: AppointmentFormValues) => Promise<any>;
}

export function AppointmentForm({ availableTimeSlots, action }: AppointmentFormProps) {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      note: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedDate = form.watch('date');
  const availableTimes = availableTimeSlots.find((slot) => slot.date === selectedDate)?.times || [];

  const handleSubmit = async (data: AppointmentFormValues) => {
    try {
      setIsSubmitting(true);
      // Doğum tarihini parse et (GG.AA.YYYY -> YYYY-MM-DD)
      const [day, month, year] = data.birthDate.split('.');
      if (!day || !month || !year) {
        throw new Error('Geçersiz doğum tarihi formatı');
      }

      data.birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      console.log('Form verileri:', data); // Debug için

      await action(data);
      const formattedDate = format(new Date(data.date), 'EEEE, d MMMM yyyy', { locale: tr });
      window.location.href = `/appointment/success?date=${formattedDate}&time=${data.time}`;
    } catch (error) {
      console.error('Randevu oluşturma hatası:', error);
      setIsSubmitting(false);

      if (error instanceof Error) {
        toast.error(`Randevu oluşturulamadı: ${error.message}`);
      } else {
        toast.error('Randevu oluşturulurken beklenmeyen bir hata oluştu.');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 justify-start items-start md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-[10px]">
                <FormLabel>Randevu Tarihi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'EEEE, d MMMM yyyy', {
                            locale: tr
                          })
                        ) : (
                          <span>Tarih seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" aria-hidden="true" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                      disabled={(date) =>
                        !availableTimeSlots.some((slot) => slot.date === format(date, 'yyyy-MM-dd'))
                      }
                      locale={tr}
                      classNames={{
                        head_row: 'flex',
                        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                        row: 'flex w-full mt-2',
                        cell: cn(
                          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent',
                          field.value && 'cursor-pointer'
                        ),
                        day: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
                        day_range_end: 'day-range-end',
                        day_selected:
                          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                        day_today: 'bg-accent text-accent-foreground',
                        day_outside: 'text-muted-foreground opacity-50',
                        day_disabled: 'text-muted-foreground opacity-50',
                        day_range_middle:
                          'aria-selected:bg-accent aria-selected:text-accent-foreground',
                        day_hidden: 'invisible',
                        nav_button_previous: 'absolute left-1',
                        nav_button_next: 'absolute right-1',
                        nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                        caption: 'flex justify-center pt-1 relative items-center'
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Randevu Saati</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {availableTimes.length === 0 && !selectedDate && (
                      <p className="text-sm text-muted-foreground w-full">
                        Lütfen önce bir tarih seçin
                      </p>
                    )}
                    {availableTimes.length === 0 && selectedDate && (
                      <p className="text-sm text-muted-foreground w-full">
                        Seçilen tarihte müsait randevu saati bulunmuyor
                      </p>
                    )}
                    {availableTimes.map((time) => {
                      const shortTime = time.split(':').slice(0, 2).join(':');
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => field.onChange(time)}
                          className={cn(
                            'flex items-center justify-center h-9 w-[75px] px-4 rounded-md border text-sm font-medium transition-colors whitespace-nowrap',
                            field.value === time
                              ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          {shortTime}
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input type="email" {...field} autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <IMaskInput
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    mask="\0\500 000 00 00"
                    definitions={{
                      '0': /[0-9]/,
                      '5': /[5]/
                    }}
                    unmask={false}
                    value={field.value}
                    onAccept={(value) => field.onChange(value)}
                    placeholder="05XX XXX XX XX"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doğum Tarihi</FormLabel>
                <FormControl>
                  <div className="relative">
                    <IMaskInput
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      mask="00.00.0000"
                      definitions={{
                        '0': /[0-9]/
                      }}
                      value={field.value}
                      onAccept={(value) => field.onChange(value)}
                      placeholder="GG.AA.YYYY"
                      autoComplete="bday"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Not (Opsiyonel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Eklemek istediğiniz notları buraya yazabilirsiniz"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">Randevu Oluşturuluyor…</span>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            'Randevu Oluştur'
          )}
        </Button>
      </form>
    </Form>
  );
}
