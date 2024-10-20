"use client";
import Pagination from "@/Components/ui/Pagination";
import { useState } from "react";

const orders = [
  {
    orderId: "123456",
    user: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    amount: "$100",
    status: "Completed"
  },
  {
    orderId: "123457",
    user: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+987654321",
    amount: "$150",
    status: "Pending"
  },
  {
    orderId: "123458",
    user: "Alice Brown",
    email: "alicebrown@example.com",
    phone: "+456789123",
    amount: "$200",
    status: "Shipped"
  }
];



const OrderTable = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalItemCount, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)

 const handleStatusChange =() => {

 }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  return (
    <div className="wrapper w-100">
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
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) :
            <table className="admin-table  w-100 d-table">
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
                        <span className="muted">{order?.orderId}</span>
                      </td>
                      <td>
                        <span className="muted">{order?.user?.name}</span>
                      </td>
                      <td>
                        <span className="muted">{order?.user?.email}</span>
                      </td>
                      {/* <td>
                          <span className="muted">{order?.customer?.phone}</span>
                        </td> */}

                      <td>
                        <span className="muted">{order?.price}</span>
                      </td>
                      <td>
                        <span className="muted">
                        
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
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
                        </div>
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


          }
        </div>
      </section>
    </div>
  );
};

export default OrderTable;
