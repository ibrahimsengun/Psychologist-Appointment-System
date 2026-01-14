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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AvailableTimeSlotFormValues, availableTimeSlotFormSchema } from '@/types/appointments';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// Saat seçenekleri için yardımcı fonksiyon
const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 9; hour <= 21; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return times;
};

interface AvailableTimeSlotFormProps {
  onSubmit: (data: AvailableTimeSlotFormValues) => Promise<void>;
}

export function AvailableTimeSlotForm({ onSubmit }: AvailableTimeSlotFormProps) {
  const form = useForm<AvailableTimeSlotFormValues>({
    resolver: zodResolver(availableTimeSlotFormSchema),
    defaultValues: {
      date: '',
      startTime: '',
      endTime: ''
    }
  });

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (data: AvailableTimeSlotFormValues) => {
    try {
      await onSubmit(data);
      toast.success('Müsait zaman aralığı başarıyla eklendi!');
      form.reset();
    } catch (error) {
      toast.error('Müsait zaman aralığı eklenirken bir hata oluştu.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tarih</FormLabel>
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
                        format(new Date(field.value), 'PPP', {
                          locale: tr
                        })
                      ) : (
                        <span>Tarih seçin</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlangıç Saati</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Başlangıç saati seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bitiş Saati</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitiş saati seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeOptions
                      .filter(
                        (time) => !form.getValues('startTime') || time > form.getValues('startTime')
                      )
                      .map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Müsait Zaman Ekle
        </Button>
      </form>
    </Form>
  );
}
