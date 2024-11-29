"use client"

import ReviewModal from "@/Components/modals/ReviewModal";
import Avatar from "@/Components/ui/Avater";
import { deleteReview, getReviews, putReview } from "@/lib/fetch/reviews";
import debounce from "@/utilities/func/debaunce";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDone } from "react-icons/md";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_APIHOST;


const ReviewPage = () => {
  const [show, setShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("all")
  const [review, setReview] = useState(null)
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async function () {
      setLoading(true)
      const filter = {};
      if (status !== "all") {
        filter.status = status;
      }
      if(email){
        filter.email = email;
      }
      const reviews = await getReviews(filter);
      setReviews(reviews)
      setLoading(false)
    })()
  }, [status, email])

  const handleAccept = async (id) => {
    const toastId = toast.loading("Loading..")
    try {
      const response = await putReview(id, "approved")
      if (response.status === 200) {
        const reviews = await getReviews({})
        setReviews(reviews)
        setIsEdit(false)
        toast.success("Review status updated successfully!")
        toast.dismiss(toastId)
      } else {
        toast.error("Failed to update review status!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update review status!")
    }
    toast.dismiss(toastId)
  }

  const handleDelete = async iri => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting user...")
        try {
          const response = await deleteReview(iri)
          if (response?.status === 200) {
            const reviews = await getReviews({})
            setReviews(reviews)
            toast.success("User deleted successfully!")
            toast.dismiss(toastId)
          } else {
            toast.error("Failed to delete review!")
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error("An unexpected error occurred. Please try again later.");
          toast.dismiss(toastId)
        }
        toast.dismiss(toastId)
      }
    });


  }

  const handleEmail = debounce((value)=> setEmail(value), 500)

  const handleEdit = review => {
    setShow(true)
    setIsEdit(true)
    setReview(review)
  }

  let userRow = null;
  if (loading && !reviews) {
    userRow = <tr>
      <td colSpan="6" className="text-center">
        Loading...
      </td>
    </tr>
  }
  if (!loading && reviews?.length === 0) {
    userRow = <tr>
      <td colSpan="6" className="text-center fw-bold">No reviews found.</td>
    </tr>
  }
  if (!loading && reviews?.length) {
    userRow = reviews?.map(user => (
      <tr key={user?._id} >
        <td>
          <div className="course-image-container">
            <figure className="author-img">
              <Avatar url={user?.avatar} />
            </figure>
            <div>
              <h3 className="course-name w-auto">
                {user?.name ?? "----"}
              </h3>

            </div>
          </div>
        </td>
        <td>
          <span className="muted">{user?.email ?? "----"}</span>
        </td>
        <td>
          <span className="muted">{user?.position}</span>
        </td>
        <td>
          <span className="muted">{user?.text}</span>
        </td>
        <td>
          <span className={`pill`} style={{ "backgroundColor": user?.status === "pending" ? "#3498db" : "#2ecc71", }}>{user?.status}</span>
        </td>
        <td>
          <div className="d-flex gap-2">
            {
              user?.status === "pending" && <button
                className="pill text-black"
                style={{ "backgroundColor": "#2ecc71", padding: "4px" }}
                onClick={() => handleAccept(user?._id)}
              >
                <span className="icon">
                  <MdDone />
                </span>

              </button>
            }
            <button className="pill text-black" style={{ "backgroundColor": "#E2E8F0" }} onClick={() => handleEdit(user)}>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.5594 4.30936L7.30936 9.55936C7.22731 9.64141 7.11603 9.6875 7 9.6875H5.25C5.00838 9.6875 4.8125 9.49162 4.8125 9.25V7.5C4.8125 7.38397 4.85859 7.27269 4.94064 7.19064L10.1906 1.94064C10.2727 1.85859 10.384 1.8125 10.5 1.8125C10.616 1.8125 10.7273 1.85859 10.8094 1.94064L12.5594 3.69064C12.7302 3.8615 12.7302 4.1385 12.5594 4.30936ZM10.5 2.86872L11.6313 4L6.81878 8.8125H5.6875V7.68122L10.5 2.86872Z" fill="#1E293B" />
                  <path d="M10.628 5.62172C10.7101 5.70377 10.8215 5.75 10.9375 5.75C10.945 5.75 10.9526 5.7498 10.9601 5.74941C11.0682 5.74382 11.1703 5.69837 11.2469 5.62186C11.3289 5.53981 11.375 5.42853 11.375 5.3125C11.375 5.19647 11.3289 5.08519 11.2469 5.00314L9.49686 3.25314C9.41481 3.17109 9.30353 3.125 9.1875 3.125C9.07147 3.125 8.96019 3.17109 8.87814 3.25314C8.79609 3.33519 8.75 3.44647 8.75 3.5625C8.75 3.67853 8.79609 3.78981 8.87814 3.87186L10.628 5.62172Z" fill="#1E293B" />
                  <path d="M2.625 3.125H7.4375C7.67912 3.125 7.875 2.92912 7.875 2.6875C7.875 2.44588 7.67912 2.25 7.4375 2.25H2.625C2.26256 2.25 2.00628 2.50628 2.00628 2.50628C1.75 2.76256 1.75 3.125 1.75 3.125V11.875C1.75 12.2374 2.00628 12.4937 2.00628 12.4937C2.26256 12.75 2.625 12.75 2.625 12.75H11.375C11.7374 12.75 11.9937 12.4937 11.9937 12.4937C12.25 12.2374 12.25 11.875 12.25 11.875V7.0625C12.25 6.82088 12.0541 6.625 11.8125 6.625C11.5709 6.625 11.375 6.82088 11.375 7.0625V11.875H2.625V3.125Z" fill="#1E293B" />
                </svg>
              </span>

            </button>
            <button className="pill bg-danger" onClick={() => handleDelete(user?._id)}>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                  <path d="M1.87814 2.99686C1.70729 2.826 1.70729 2.549 1.87814 2.37814C2.049 2.20729 2.32601 2.20729 2.49686 2.37814L7 6.88128L11.5031 2.37814C11.674 2.20729 11.951 2.20729 12.1219 2.37814C12.2927 2.549 12.2927 2.826 12.1219 2.99686L7.61872 7.5L12.1219 12.0031C12.2927 12.174 12.2927 12.451 12.1219 12.6219C11.951 12.7927 11.674 12.7927 11.5031 12.6219L7 8.11872L2.49686 12.6219C2.32601 12.7927 2.049 12.7927 1.87814 12.6219C1.70729 12.451 1.70729 12.174 1.87814 12.0031L6.38128 7.5L1.87814 2.99686Z" fill="white" />
                </svg>
              </span>
            </button>
          </div>
        </td>
      </tr>
    ))
  }

  return (
    <>
      <ReviewModal show={show} setShow={setShow} setReviews={setReviews} isEdit={isEdit} setIsEdit={setIsEdit} review={review} />
      <section className="user-container">
        <div className="section-top d-flex justify-content-between">
          <div>
            <h3 className="title">Reviews</h3>
            <p className="des">
              Organize your user&apos;s  feedback here.
            </p>
          </div>
          <div>
            <form className="d-flex justify-content-between gap-2 px-4 mb-3">
              <div className="input-box mt-3 flex-1">
                <input
                  id="email"
                  type="search"
                  placeholder="Search by Email"
                  className="form-control shadow-none w-100 shadow-none px-3"
                  onChange={(e) => handleEmail(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between gap-2">
                <div className="input-box mt-3">
                  <select
                    name="date"
                    id=""
                    className="form-select shadow-none fz-14"
                    style={{ height: "2.9rem" }}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>

                  </select>
                </div>

              </div>
            </form>
          </div>
          <button className="btn-addmoderator fxwidth"
            onClick={() => setShow(true)}
          >
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 2.5C8.27614 2.5 8.5 2.72386 8.5 3V8H13.5C13.7761 8 14 8.22386 14 8.5C14 8.77614 13.7761 9 13.5 9H8.5V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V9H2.5C2.22386 9 2 8.77614 2 8.5C2 8.22386 2.22386 8 2.5 8H7.5V3C7.5 2.72386 7.72386 2.5 8 2.5Z" fill="#1E293B" />
              </svg>
            </span>
            Add Review
          </button>
        </div>


        <div className="section-body">
          <table className="admin-table d-xxl-table overflow-x-auto">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Occupation</th>
                <th>Review</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {
                userRow
              }
            </tbody>
          </table>
        </div>
      </section>
    </>

  )
}

export default ReviewPage;