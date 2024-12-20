import OrderTable from './OrderTable';

export const metadata = {
  title: "Order History || CodeSync station",
  description: "Organize your orders here.",
  keywords: ["users", "management", "dashboard"],
}

const page = () => {
  return (

    <div className="admin-main-conten">
      <OrderTable />
    </div>

  );
}

export default page