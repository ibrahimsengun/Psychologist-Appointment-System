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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: AppointmentStatus) => Promise<void>;
  isPastView?: boolean;
}

const statusLabels: Record<AppointmentStatus, string> = {
  pending: 'Beklemede',
  confirmed: 'Onaylandı',
  canceled: 'İptal Edildi'
};

type StatusChangeKeys = 'confirmed' | 'canceled';
const statusChangeLabels: Record<StatusChangeKeys, string> = {
  confirmed: 'Onaylandı',
  canceled: 'İptal Edildi'
};

const statusColors: Record<AppointmentStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800'
};

type SortField = 'date' | 'name' | 'status';
type SortOrder = 'asc' | 'desc';

export function AppointmentsTable({
  appointments,
  onStatusChange,
  isPastView
}: AppointmentsTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedAppointments = appointments
    .filter((appointment) => {
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      const matchesSearch = searchTerm
        ? appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.phone.includes(searchTerm)
        : true;
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'date':
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
        case 'name':
          return a.name.localeCompare(b.name) * order;
        case 'status':
          return a.status.localeCompare(b.status) * order;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="İsim, e-posta veya telefon ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        {!isPastView && (
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
              <div className="flex items-center gap-1">
                Tarih
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer">
              <div className="flex items-center gap-1">Saat</div>
            </TableHead>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              <div className="flex items-center gap-1">
                Ad Soyad
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>E-posta</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
              <div className="flex items-center gap-1">
                Durum
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedAppointments.map((appointment) => (
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
                {!isPastView ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menüyü aç</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {Object.entries(statusChangeLabels).map(([status, label]) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() =>
                            onStatusChange(appointment.id, status as AppointmentStatus)
                          }
                          disabled={status === appointment.status}
                        >
                          Durumu {label.toLowerCase()} olarak değiştir
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
          {filteredAndSortedAppointments.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                {searchTerm || statusFilter !== 'all'
                  ? 'Aramanızla eşleşen randevu bulunamadı'
                  : 'Henüz randevu bulunmuyor'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
