"use client";
// import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      // Retrieve user data from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.id;

      if (userId) {
        // Construct the URL with the user ID
        const url = `/orders?page=1&customer.id=${userId}`;
        const responseObject = await axiosInstance.get(url);
        const totalOrders = responseObject.data["hydra:member"];
        setOrders(totalOrders);
      } else {
        console.error("User ID not found in localStorage");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

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
                <th scope="col">TransactionId </th>
                <th scope="col">Course Name</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                orders.length ? orders.sort().map((order, index) => (
                  <tr key={index}>
                    <td>10</td>
                    <td >{order?.course?.map(course => course.title).join(",")}</td>
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
