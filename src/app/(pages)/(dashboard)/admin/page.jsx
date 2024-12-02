import { API_URL } from '@/lib/fetch/config';
import AdminDashboardPage from './AdminDashboardPage';

const page = async () => {
  const response = await fetch(`${API_URL}/api/statistics`);
  const statistics = await response.json()
  return  <AdminDashboardPage statistics={statistics}/>
}

export default page