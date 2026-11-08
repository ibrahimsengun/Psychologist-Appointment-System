'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Appointment, AppointmentStatus } from '@/types/appointments';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Check, MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AppointmentsListProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: AppointmentStatus) => Promise<void>;
  isPastView?: boolean;
}

const statusLabels: Record<AppointmentStatus, string> = {
  pending: 'Onay bekliyor',
  confirmed: 'Onaylandı',
  canceled: 'İptal edildi'
};

const statusColors: Record<AppointmentStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800'
};

// 0544..., 544... ve +90544... biçimlerini wa.me'nin istediği 90544... biçimine çevirir
function whatsappUrl(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const international = digits.startsWith('90')
    ? digits
    : digits.startsWith('0')
      ? `9${digits}`
      : `90${digits}`;
  return `https://wa.me/${international}`;
}

function AppointmentCard({
  appointment,
  isPastView,
  isSaving,
  onChange
}: {
  appointment: Appointment;
  isPastView?: boolean;
  isSaving: boolean;
  onChange: (status: AppointmentStatus) => void;
}) {
  const showApprove = !isPastView && appointment.status === 'pending';
  const showCancel = !isPastView && appointment.status !== 'canceled';

  return (
    <article className="flex flex-col gap-3 rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">
            {format(new Date(`${appointment.date}T00:00:00`), 'd MMMM EEEE', { locale: tr })}
          </p>
          <p className="text-sm tabular-nums text-muted-foreground">{appointment.time.slice(0, 5)}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[appointment.status]}`}
        >
          {statusLabels[appointment.status]}
        </span>
      </div>

      <div className="min-w-0 text-sm">
        <p className="font-medium">{appointment.name}</p>
        <a href={`mailto:${appointment.email}`} className="block truncate text-muted-foreground hover:underline">
          {appointment.email}
        </a>
        <p className="tabular-nums text-muted-foreground">{appointment.phone}</p>
        {appointment.note && <p className="mt-2 whitespace-pre-line rounded-md bg-muted p-2">{appointment.note}</p>}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {showApprove && (
          <Button size="sm" onClick={() => onChange('confirmed')} disabled={isSaving}>
            <Check className="mr-1 h-4 w-4" />
            Onayla
          </Button>
        )}
        <Button asChild size="sm" variant="outline">
          <a href={`tel:${appointment.phone.replace(/\s/g, '')}`}>
            <Phone className="mr-1 h-4 w-4" />
            Ara
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={whatsappUrl(appointment.phone)} target="_blank" rel="noreferrer">
            <MessageCircle className="mr-1 h-4 w-4" />
            WhatsApp
          </a>
        </Button>
        {showCancel && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" disabled={isSaving}>
                <X className="mr-1 h-4 w-4" />
                İptal et
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Randevu iptal edilsin mi?</AlertDialogTitle>
                <AlertDialogDescription>
                  {appointment.name} adlı danışana iptal e-postası gönderilir ve bu saat yeniden randevuya açılır.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onChange('canceled')}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  İptal et
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </article>
  );
}

export function AppointmentsList({ appointments, onStatusChange, isPastView }: AppointmentsListProps) {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const changeStatus = async (id: string, status: AppointmentStatus) => {
    setSavingId(id);
    try {
      await onStatusChange(id, status);
    } catch {
      toast.error('Durum güncellenirken bir hata oluştu');
    } finally {
      setSavingId(null);
    }
  };

  const search = searchTerm.toLocaleLowerCase('tr');
  const visibleAppointments = appointments
    .filter((appointment) => {
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      const matchesSearch =
        !search ||
        appointment.name.toLocaleLowerCase('tr').includes(search) ||
        appointment.email.toLocaleLowerCase('tr').includes(search) ||
        appointment.phone.includes(searchTerm);
      return matchesStatus && matchesSearch;
    })
    // Yaklaşanlarda en yakın, geçmişte en yeni randevu üstte
    .sort((a, b) => {
      const order = `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
      return isPastView ? -order : order;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="İsim, e-posta veya telefon ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-sm"
        />
        {!isPastView && (
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AppointmentStatus | 'all')}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Duruma göre filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              {Object.entries(statusLabels).map(([status, label]) => (
                <SelectItem key={status} value={status}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {visibleAppointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              isPastView={isPastView}
              isSaving={savingId === appointment.id}
              onChange={(status) => changeStatus(appointment.id, status)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border bg-card py-10 text-center text-sm text-muted-foreground">
          {searchTerm || statusFilter !== 'all' ? 'Aramanızla eşleşen randevu bulunamadı.' : 'Burada gösterilecek randevu yok.'}
        </p>
      )}
    </div>
  );
}
