export interface DashboardAppointment {
  id: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

export interface DashboardQuestion {
  id: string;
  name: string | null;
  questionText: string;
}

export interface DashboardTopPost {
  title: string;
  slug: string;
  views: number;
}

export interface DashboardData {
  greeting: string;
  todayAppointments: DashboardAppointment[];
  /** Bugün yoksa gösterilen en yakın randevu */
  nextAppointment: DashboardAppointment | null;
  pendingAppointments: DashboardAppointment[];
  pendingQuestions: DashboardQuestion[];
  pendingQuestionCount: number;
  messagesLast7Days: number;
  totalViews: number;
  topPosts: DashboardTopPost[];
}

export interface AdminBadgeCounts {
  appointments: number;
  questions: number;
}
