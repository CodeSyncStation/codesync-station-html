"use client";
import { useSession } from "next-auth/react";
// import axiosInstance from "@/lib/axios";
import { getOrders as getAllOrders } from "@/lib/fetch/orders";
import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data } = useSession()

  const getOrders = async (email) => {
    try {
      const orders = await getAllOrders({ email });
      console.log(orders, "orders")
      setOrders(orders)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      getOrders(data.user.email);
    }
  }, [data]);

  return (
    <div className="orderhistory-wrapper allcontent-wrapper">
      <h4 className="mb-14">Order History</h4>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table order-history-table">
            <thead>
              <tr>
                <th scope="col">Order ID </th>
                <th scope="col">Project Name</th>
                <th scope="col">Delivery date</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                orders.length ? orders.sort().map((order, index) => (
                  <tr key={index}>
                    <td>{order?.orderId}</td>
                    <td >{order?.title}</td>
                    <td >90</td>
                    <td>20</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        Pending
                      </span>
                    </td>

                  </tr>
                ))
                  : <tr>
                    <td colSpan={8} className="text-center fw-bold">No orders found.</td>
                  </tr>
              }

            </tbody>
          </table>



        </div>
      )}
    </div>
  );
}

export default OrderHistory;
