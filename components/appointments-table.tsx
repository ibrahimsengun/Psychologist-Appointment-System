'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Appointment, AppointmentStatus } from '@/types/appointments';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MoreHorizontal } from 'lucide-react';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: AppointmentStatus) => Promise<void>;
}

const statusLabels: Record<AppointmentStatus, string> = {
  pending: 'Beklemede',
  confirmed: 'Onaylandı',
  canceled: 'İptal Edildi'
};

const statusColors: Record<AppointmentStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800'
};

export function AppointmentsTable({ appointments, onStatusChange }: AppointmentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tarih</TableHead>
          <TableHead>Saat</TableHead>
          <TableHead>Ad Soyad</TableHead>
          <TableHead>E-posta</TableHead>
          <TableHead>Telefon</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{format(new Date(appointment.date), 'PPP', { locale: tr })}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.name}</TableCell>
            <TableCell>{appointment.email}</TableCell>
            <TableCell>{appointment.phone}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[appointment.status]
                }`}
              >
                {statusLabels[appointment.status]}
              </span>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Menüyü aç</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(statusLabels).map(([status, label]) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => onStatusChange(appointment.id, status as AppointmentStatus)}
                      disabled={status === appointment.status}
                    >
                      Durumu {label.toLowerCase()} olarak değiştir
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
