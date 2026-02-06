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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { TimeBlockFormValues, timeBlockFormSchema } from '@/types/appointments';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 8; hour <= 21; hour++) {
        times.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return times;
};

interface TimeBlockFormProps {
    onSubmit: (data: TimeBlockFormValues) => Promise<void>;
}

export function TimeBlockForm({ onSubmit }: TimeBlockFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const timeOptions = generateTimeOptions();

    const form = useForm<TimeBlockFormValues>({
        resolver: zodResolver(timeBlockFormSchema),
        defaultValues: {
            date: '',
            isFullDay: false,
            startTime: '',
            endTime: '',
            reason: ''
        }
    });

    const isFullDay = form.watch('isFullDay');

    const handleSubmit = async (data: TimeBlockFormValues) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data);
            toast.success('Zaman bloğu eklendi!');
            form.reset();
        } catch (error) {
            toast.error('Zaman bloğu eklenirken bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                                                format(new Date(field.value), 'PPP', { locale: tr })
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

                <FormField
                    control={form.control}
                    name="isFullDay"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Tüm gün</FormLabel>
                        </FormItem>
                    )}
                />

                {!isFullDay && (
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Başlangıç</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Saat seçin" />
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
                                    <FormLabel>Bitiş</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Saat seçin" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {timeOptions
                                                .filter((time) => {
                                                    const startTime = form.getValues('startTime');
                                                    return !startTime || time > startTime;
                                                })
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
                )}

                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sebep (opsiyonel)</FormLabel>
                            <FormControl>
                                <Input placeholder="Dış randevu, tatil vb." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Ekleniyor...
                        </>
                    ) : (
                        'Blok Ekle'
                    )}
                </Button>
            </form>
        </Form>
    );
}
