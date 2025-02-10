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
import { AvailableTimeSlot } from '@/types/appointments';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MoreHorizontal, Trash } from 'lucide-react';

interface AvailableTimeSlotsTableProps {
  timeSlots: AvailableTimeSlot[];
  onDelete: (id: string) => Promise<void>;
}

export function AvailableTimeSlotsTable({ timeSlots, onDelete }: AvailableTimeSlotsTableProps) {
  return (
    <div className="max-w-[90vw] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarih</TableHead>
            <TableHead>Başlangıç Saati</TableHead>
            <TableHead>Bitiş Saati</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((slot) => (
            <TableRow key={slot.id}>
              <TableCell>{format(new Date(slot.date), 'PPP', { locale: tr })}</TableCell>
              <TableCell>{slot.startTime}</TableCell>
              <TableCell>{slot.endTime}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    slot.isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {slot.isBooked ? 'Dolu' : 'Müsait'}
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
                    <DropdownMenuItem
                      onClick={() => onDelete(slot.id)}
                      className="text-red-600"
                      disabled={slot.isBooked}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {timeSlots.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Henüz müsait zaman eklenmemiş
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
