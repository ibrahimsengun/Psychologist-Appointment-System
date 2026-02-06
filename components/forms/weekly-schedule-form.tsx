'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { WeeklyScheduleDay } from '@/types/appointments';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 8; hour <= 21; hour++) {
        times.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return times;
};

interface WeeklyScheduleFormProps {
    initialSchedule: WeeklyScheduleDay[];
    onSubmit: (schedule: Omit<WeeklyScheduleDay, 'id'>[]) => Promise<void>;
}

export function WeeklyScheduleForm({ initialSchedule, onSubmit }: WeeklyScheduleFormProps) {
    const [schedule, setSchedule] = useState<WeeklyScheduleDay[]>(initialSchedule);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const timeOptions = generateTimeOptions();

    const handleToggleDay = (dayOfWeek: number, enabled: boolean) => {
        setSchedule((prev) =>
            prev.map((day) => (day.dayOfWeek === dayOfWeek ? { ...day, isEnabled: enabled } : day))
        );
    };

    const handleTimeChange = (
        dayOfWeek: number,
        field: 'startTime' | 'endTime',
        value: string
    ) => {
        setSchedule((prev) =>
            prev.map((day) => (day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day))
        );
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            await onSubmit(
                schedule.map((day) => ({
                    dayOfWeek: day.dayOfWeek,
                    isEnabled: day.isEnabled,
                    startTime: day.startTime,
                    endTime: day.endTime
                }))
            );
            toast.success('Haftalık çalışma saatleri kaydedildi!');
        } catch (error) {
            toast.error('Kaydetme sırasında bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            {schedule.map((day) => (
                <div
                    key={day.dayOfWeek}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${day.isEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                >
                    <Switch
                        checked={day.isEnabled}
                        onCheckedChange={(checked) => handleToggleDay(day.dayOfWeek, checked)}
                    />
                    <span className="w-24 font-medium">{DAY_NAMES[day.dayOfWeek]}</span>

                    {day.isEnabled ? (
                        <div className="flex items-center gap-2">
                            <Select
                                value={day.startTime}
                                onValueChange={(value) => handleTimeChange(day.dayOfWeek, 'startTime', value)}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeOptions.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className="text-muted-foreground">-</span>
                            <Select
                                value={day.endTime}
                                onValueChange={(value) => handleTimeChange(day.dayOfWeek, 'endTime', value)}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeOptions
                                        .filter((time) => time > day.startTime)
                                        .map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <span className="text-muted-foreground">Kapalı</span>
                    )}
                </div>
            ))}

            <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kaydediliyor...
                    </>
                ) : (
                    'Şablonu Kaydet'
                )}
            </Button>
        </div>
    );
}
