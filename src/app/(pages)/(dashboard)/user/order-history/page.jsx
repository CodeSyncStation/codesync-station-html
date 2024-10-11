import OrderHistory from "@/Components/dashboard/OrderHistory";
export const metadata = {
  title: "Order History || Digital Dropouts",
  description: "",
};

const page = () => {
  return (
    <>
      <div className="main-aside-wrapper">
        <OrderHistory />
        <aside>
         {/* <RecommendedCourses /> */}
        </aside>
      </div>
    </>
  );
};

export default page;
