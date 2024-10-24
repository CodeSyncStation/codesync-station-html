import { getOrders } from '@/lib/fetch/orders';
import OrderTable from './OrderTable';

export const metadata = {
  title: "Order History || CodeSync station",
  description: "Organize your orders here.",
  keywords: ["users", "management", "dashboard"],
}

const page = async () => {

  const orders = await getOrders()

  return (

    <div className="adminchat-wrapper">
      <OrderTable  orders={orders}/>
    </div>

  );
}

export default page