"use client";
import Pagination from "@/Components/ui/Pagination";
import { getOrders, putOrder } from "@/lib/fetch/orders";
import statusColors from "@/utilities/func/statusColors";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";



const OrderTable = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalItemCount, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [orders, setOrders] = useState([])
  const [query, setQuery] = useState({
    status: "",
    page: 1,
  })

  useEffect(() => {
    (async function () {
      setLoading(true)
      const orders = await getOrders(query)
      setOrders(orders)
      setLoading(false)
    })()
  }, [query])

  const handleStatusChange = async (status, orderId) => {
    console.log(status, orderId);
    // Handle status change logic here
    const toastId = toast.loading("Updating status...");

    try {
      const data = await putOrder(orderId, status);
      const orders = await getOrders(query)
      setOrders(orders)
      toast.success("Status updated successfully!");
    } catch (error) {
      console.log(error);
      // toast.error("An unexpected error occurred. Please try again later.");
    }
    finally {
      toast.dismiss(toastId);
    }
  }
  const handleFilter= (key, value)=> {
    setQuery((prev) => ({ ...prev, [key]: value }))
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  let content = null;
  if (loading && orders.length === 0) {
    content = <tr>
    <td colSpan="6" className="text-center fw-bold">Loading...</td>
  </tr>
  }
  if (!loading && orders.length === 0) {
    content = <tr>
      <td colSpan="6" className="text-center fw-bold">No orders found.</td>
    </tr>
  }
  if (!loading && orders.length > 0) {
    content = orders.map((order, index) => (
      <tr key={index}>
        <td>
          <span className="muted">{order?.orderId}</span>
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
    ))
  }
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
            <form className="d-flex justify-content-between gap-2 pb-3">
              <div className="input-box mt-3 flex-1">
                <input
                  id="email"
                  type="search"
                  placeholder="Search by order ID"
                  className="form-control shadow-none w-100 shadow-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between gap-2">
              <div className="input-box mt-3">
                <select
                  name="date"
                  id=""
                  className="form-select shadow-none fz-14"
                  style={{ height: "2.9rem" }}
                  onChange={(e)=> setQuery((prev) => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All</option>
                  {
                    Object.keys(statusColors).map((status, index) => <option 
                    key={index} 
                    value={status}
                    style={{color: statusColors[status], textTransform: "capitalize"}}>{status.replace(/_/g, ' ')}
                    </option>)
                  }
                </select>
              </div>
              {/* <div className="input-box mt-3">
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
              </div> */}
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
                content
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
