"use client";
import Pagination from "@/Components/ui/Pagination";
import { putOrder } from "@/lib/fetch/orders";
import statusColors from "@/utilities/func/statusColors";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";



const OrderTable = ({ orders }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalItemCount, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)

  const handleStatusChange = async (status, orderId) => {
    console.log(status, orderId);
    // Handle status change logic here
    setLoading(true);
    const toastId = toast.loading("Updating status...");

    try {
      const data = await putOrder(orderId, status);
      if (data?._id) {
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
    finally{
      toast.dismiss(toastId);
      setLoading(false);  // Set loading to false after the API call completes
    }
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  return (
    <div className="wrapper w-100">
      <Toaster />
      <section className="best-selling-courses">
        <div className="table-wrapper">
          <div className="section-top">
            <div className="flex-between">
              <div>

                <h3 className="title-main">Orders</h3>
                <p className="des">
                  Order Dashboard is a quick overview of all current orders.
                </p>
              </div>
              <div>

              </div>
            </div>

            {/* <!-- search  --> */}
            <form className="flex-between gap-2 pb-3">
              <div className="input-box mt-3 flex-1">
                <input
                  id="email"
                  type="search"
                  placeholder="Search by order ID"
                  className="form-control shadow-none w-100 shadow-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="input-box mt-3">
                <select
                  name="date"
                  id=""
                  className="form-select shadow-none fz-14"
                  style={{ height: "2.9rem" }}
                  onChange={handleSortChange}
                >
                  <option value="asc">Amount low to high</option>
                  <option value="desc">Amount high to low</option>
                </select>
              </div>
            </form>
          </div>
          <table className="admin-table  w-100 d-table overflow-auto">
            {/* <!-- head --> */}
            <thead className="w-100">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="w-100">
              {/* <!-- row 1 --> */}
              {
                orders?.length ? orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <span className="muted">{order?._id}</span>
                    </td>
                    <td>
                      <span className="muted">{order?.name}</span>
                    </td>
                    <td>
                      <span className="muted">{order?.email}</span>
                    </td>
                    <td>
                      <span className="muted">{order?.phone}</span>
                    </td>

                    <td>
                      <span className="muted">{order?.budget}</span>
                    </td>

                    <td>
                      {/* <div className="btn-group dropdown">
                        <button
                          className={`dropdown-toggle pill ${order.status === "Completed"
                            ? "bg-success"
                            : order.status === "pending"
                              ? "bg-warning"
                              : "bg-danger"
                            }`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {order?.status}
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item text-warning status-failed"
                              onClick={() =>
                                handleStatusChange("pending", order.id)
                              }
                              disabled={
                                loading || order.status === "pending"
                              }
                            >
                              Pending
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-warning status-failed"
                              onClick={() =>
                                handleStatusChange("pending", order.id)
                              }
                              disabled={
                                loading || order.status === "accepted"
                              }
                            >
                              Accepted
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-success"
                              onClick={() =>
                                handleStatusChange("paid", order.id)
                              }
                              disabled={loading || order.status === "paid"}
                            >
                              Paid
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-success"
                              onClick={() =>
                                handleStatusChange("enrolled", order.id)
                              }
                              disabled={
                                loading || order.status === "enrolled"
                              }
                            >
                              Enrolled
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() =>
                                handleStatusChange("canceled", order.id)
                              }
                              disabled={
                                loading || order.status === "canceled"
                              }
                            >
                              Canceled
                            </button>
                          </li>
                        </ul>
                      </div> */}
                      <Dropdown>
                        <Dropdown.Toggle
                          as="button"
                          className="pill gap-0"
                          style={{ textTransform: "capitalize", backgroundColor: statusColors[order?.status] }}
                        >
                          {
                            order?.status?.split("_").join(" ")
                          }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                          {Object.keys(statusColors).map((status, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => handleStatusChange(status, order._id)}
                              style={{ textTransform: "capitalize", color: statusColors[status], fontWeight: "normal", margin: "4px 0px" }}
                            >
                              {status.replace(/_/g, ' ')}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>

                    </td>
                  </tr>
                )) : <tr>
                  <td colSpan="5" className="text-center fw-bold">No orders found.</td>
                </tr>
              }

            </tbody>
            <tfoot>
              <tr>
                <td colspan="5">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalItemCount={totalItemCount}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrderTable;
