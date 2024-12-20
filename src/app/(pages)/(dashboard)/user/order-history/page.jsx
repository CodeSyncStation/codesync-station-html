import OrderHistory from "@/Components/dashboard/OrderHistory";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "Order History || codesync stations",
  description: "",
};

const page = () => {
  return (
    <SessionProvider>
      <div className="main-aside-wrapper">
        <OrderHistory />
      </div>
    </SessionProvider>

  );
};

export default page;
