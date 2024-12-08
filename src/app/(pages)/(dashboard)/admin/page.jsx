import { API_URL } from '@/lib/fetch/config';
import AdminDashboardPage from './AdminDashboardPage';

export const metadata = {
  title: "Dashboard || CodeSync Station",
  description: "Learn to code and collaborate with your team",
}
const page = async () => {
  const response = await fetch(`${API_URL}/api/statistics`, {
    cache: "no-cache"
  });
  const statistics = await response.json()
  return  <AdminDashboardPage statistics={statistics}/>
}

export default page