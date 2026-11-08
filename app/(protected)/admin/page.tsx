import { getDashboardData } from '@/actions/dashboard-actions';
import { DashboardView } from '@/components/admin/dashboard-view';

export default async function AdminHomePage() {
  const data = await getDashboardData();
  return <DashboardView data={data} />;
}
