'use client';

import { getAppointments, updateAppointmentStatus as updateStatus } from '@/actions/appointment-actions';
import { Appointment, AppointmentStatus } from '@/types/appointments';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error('Randevular yüklenirken bir hata oluştu');
      console.error('Randevular yüklenirken hata:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAppointmentStatus = useCallback(
    async (id: string, status: AppointmentStatus) => {
      // Optimistik güncelleme
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );

      try {
        await updateStatus(id, status);
        toast.success('Randevu durumu güncellendi');
      } catch (error) {
        // Hata durumunda orijinal listeyi geri yükle
        fetchAppointments();
        throw error;
      }
    },
    [fetchAppointments]
  );

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    updateAppointmentStatus,
    refreshAppointments: fetchAppointments
  };
} 