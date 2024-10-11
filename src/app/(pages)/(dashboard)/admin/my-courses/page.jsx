"use client";
import Pagination from "@/Components/ui/Pagination";
import Spinner from "@/Components/ui/Spinner";
import WarningModal from "@/Components/ui/WarningModal";
import axiosInstance from "@/lib/axios";
import {
  useDeleteCourseMutation,
  useGetAdminSingleCourseQuery,
  useGetAllCoursesQuery,
  usePostCourseMutation,
} from "@/redux/api/courses/coursesSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RankModal from "./RankModal";
const baseUrl = process.env.NEXT_PUBLIC_APIHOST;
const page = () => {
  const [page, setPage] = useState(1);
  const [visibility, setVisibility] = useState(["public", "private"]);
  const [order, setOrder] = useState("desc");
  const [title, setTitle] = useState("");
  const {
    isLoading,
    isError,
    error,
    data: courses,
  } = useGetAllCoursesQuery({
    page,
    title,
    visibility,
    order,
  });
  const [createCourse] = usePostCourseMutation();
  const [show, setShow] = useState(false);
  const [iri, setIri] = useState("");
  const [isSkip, setIsSkip] = useState(true);
  const [showRank, setShowRank] = useState(false)

  const { isLoading: isLoadingSingleCourse, data: course } =
    useGetAdminSingleCourseQuery(
      { iri },
      {
        skip: isSkip,
      }
    );
  const [deleteCourse] = useDeleteCourseMutation();

  useEffect(() => {
    if (!isLoadingSingleCourse && course) {
      // Clone the course object and update the title
      const updatedCourse = { ...course, title: course.title + " Copy" }; // Change this to your desired title
  
      const coursePromise = createCourse({ data: updatedCourse }).unwrap();
      coursePromise.finally(() => {
        setIsSkip(true);
      });
      toast.promise(coursePromise, {
        loading: "Duplicating course...",
        success: "Course name Copied!",
        error: (err) =>
          err["hydra:description"] ? err["hydra:description"] : "Unexpected error!",
      });
    }
  }, [course]);

  const handleDelete = (iri) => {
    setIri(iri);
    setShow(true);
  };

  const handleSearch = (e) => {
    setTitle(e.target.value);
  };

  const handleDuplicate = (course) => {
    setIri(course["@id"]);
    setIsSkip(false);
  };
  const parseCSV = (csvString) => {
    const lines = csvString.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((object, header, index) => {
        object[header] = values[index].replace(/^"|"$/g, "");
        return object;
      }, {});
    });
  };

  const convertToCSV = (data) => {
    if (!Array.isArray(data)) {
      throw new TypeError("Expected an array of objects.");
    }

    const headers = "fullname,email,phone\n";

    const rows = data
      .map((user) => `"${user.fullname}","${user.email}","${user.phone}"`)
      .join("\n");

    return headers + rows;
  };

  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExport = async (id) => {
    const splitedId = id.split("/").pop();
    try {
      const response = await axiosInstance.get(`/user/export/${splitedId}`);
      const parsedData = parseCSV(response.data);
      const csvContent = convertToCSV(parsedData);
      downloadCSV(csvContent, "users.csv");
    } catch (error) {
      console.error("Error fetching export:", error);
    }
  };


  const handleRemove = () => {
    const deletePromise = deleteCourse({ iri })
      .unwrap()
      .finally(() => {
        setShow(false);
      });
    toast.promise(deletePromise, {
      loading: "Deleting course...",
      success: "Deleted course successfully!",
      error: (err) => (err.message ? err.message : "Un expected error!"),
    });
  };
 

  const handleUserRank = (course) => {
    setShowRank(true)
    setIri(course["@id"]);
  }

  let content = null;
  let pagination = null;

  if (isLoading && !isError) {
    content = (
      <tr>
        <td colSpan="6" className=" fw-bold text-center bg-white">
          <Spinner />
        </td>
      </tr>
    );
  } else if (isError && !isLoading) {
    content = (
      <tr>
        <td
          colSpan="6"
          style={{ height: "50vh" }}
          className="text-danger fs-4 text-center bg-white"
        >
          {error.message || "Something went wrong"}
        </td>
      </tr>
    );
  } else if (!isLoading && !isError && courses && courses["hydra:member"]?.length === 0) {
    content = (
      <tr>
        <td colSpan="6" className=" fw-bold text-center bg-white">
          There is No courses!
        </td>
      </tr>
    );
  } else {
    pagination = (
      <Pagination
        page={page}
        setPage={setPage}
        totalItemCount={courses["hydra:totalItems"]}
      />
    );
    content = courses["hydra:member"].map((course) => {
      const { id, title, thumbnail, modules, lessonCount, watchtime, type } = course;
      return (
        <tr key={course["@id"]}>
          <td>
            <div className="course-image-container">
              <figure>
                <Image
                  src={baseUrl + thumbnail}
                  alt="thumbnail"
                  loading="lazy"
                  fill
                />
              </figure>
              <div>
                <h3 className="course-name">{title}</h3>
                <div className="d-flex align-items-center gap-3 summery mt-2">
                  {watchtime && (
                    <span className="d-flex align-items-center gap-1 summery">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 2.625C6 2.41789 5.83211 2.25 5.625 2.25C5.41789 2.25 5.25 2.41789 5.25 2.625V6.75C5.25 6.88457 5.32211 7.00883 5.43895 7.07559L8.06395 8.57559C8.24377 8.67834 8.47284 8.61587 8.57559 8.43605C8.67834 8.25623 8.61587 8.02716 8.43605 7.92441L6 6.53238V2.625Z"
                          fill="#64748B"
                        />
                        <path
                          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM11.25 6C11.25 8.8995 8.8995 11.25 6 11.25C3.1005 11.25 0.75 8.8995 0.75 6C0.75 3.1005 3.1005 0.75 6 0.75C8.8995 0.75 11.25 3.1005 11.25 6Z"
                          fill="#64748B"
                        />
                      </svg>
                      {watchtime} min
                    </span>
                  )}
                  <span className="d-flex align-items-center gap-1 summery">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 11.25C3.10051 11.25 0.75 8.8995 0.75 6C0.75 3.10051 3.10051 0.75 6 0.75C8.8995 0.75 11.25 3.10051 11.25 6C11.25 8.8995 8.8995 11.25 6 11.25ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
                        fill="#64748B"
                      />
                      <path
                        d="M4.70341 3.79156C4.82831 3.72729 4.97866 3.7382 5.09296 3.81985L7.71796 5.69485C7.81651 5.76524 7.875 5.87889 7.875 6C7.875 6.12111 7.81651 6.23476 7.71796 6.30515L5.09296 8.18015C4.97866 8.2618 4.82831 8.27272 4.70341 8.20844C4.57851 8.14416 4.5 8.01547 4.5 7.875V4.125C4.5 3.98453 4.57851 3.85584 4.70341 3.79156Z"
                        fill="#64748B"
                      />
                    </svg>
                    {lessonCount} classes
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <span className="muted">{modules.length}</span>
          </td>
          <td>
            <span className="muted">{lessonCount}</span>
          </td>
          <td className="p-0">
            <span className="pill text-capitalize">{type}</span>
          </td>
          <td>
            <div className="dropdown">
              <button data-bs-toggle="dropdown" aria-expanded="false">
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                  >
                    <path
                      d="M8.72168 7.28711C8.72168 7.61523 8.60775 7.89323 8.37988 8.12109C8.15202 8.34896 7.87858 8.46289 7.55957 8.46289C7.24056 8.46289 6.96712 8.34896 6.73926 8.12109C6.51139 7.89323 6.39746 7.61523 6.39746 7.28711C6.39746 6.9681 6.51139 6.69466 6.73926 6.4668C6.96712 6.23893 7.24056 6.125 7.55957 6.125C7.87858 6.125 8.15202 6.23893 8.37988 6.4668C8.60775 6.69466 8.72168 6.9681 8.72168 7.28711ZM8.72168 3.21289C8.72168 3.5319 8.60775 3.80534 8.37988 4.0332C8.15202 4.26107 7.87858 4.375 7.55957 4.375C7.24056 4.375 6.96712 4.26107 6.73926 4.0332C6.51139 3.80534 6.39746 3.5319 6.39746 3.21289C6.39746 2.88477 6.51139 2.60677 6.73926 2.37891C6.96712 2.15104 7.24056 2.03711 7.55957 2.03711C7.87858 2.03711 8.15202 2.15104 8.37988 2.37891C8.60775 2.60677 8.72168 2.88477 8.72168 3.21289ZM8.72168 11.375C8.72168 11.694 8.60775 11.9674 8.37988 12.1953C8.15202 12.4232 7.87858 12.5371 7.55957 12.5371C7.24056 12.5371 6.96712 12.4232 6.73926 12.1953C6.51139 11.9674 6.39746 11.694 6.39746 11.375C6.39746 11.056 6.51139 10.7826 6.73926 10.5547C6.96712 10.3268 7.24056 10.2129 7.55957 10.2129C7.87858 10.2129 8.15202 10.3268 8.37988 10.5547C8.60775 10.7826 8.72168 11.056 8.72168 11.375Z"
                      fill="#64748B"
                    />
                  </svg>
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-start z-3">
                <li>
                  <Link className="dropdown-item" href={`/course/edit/${id}`}>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M11.6621 0.875H3.78711C3.24023 0.875 2.764 1.0778 2.3584 1.4834C1.9528 1.889 1.75 2.36523 1.75 2.91211V11.6621C1.75 12.2181 1.9528 12.6989 2.3584 13.1045C2.764 13.5101 3.24023 13.7129 3.78711 13.7129H11.6621C11.8444 13.7129 11.988 13.6582 12.0928 13.5488C12.1976 13.4395 12.25 13.2982 12.25 13.125V1.46289C12.25 1.2806 12.1976 1.13704 12.0928 1.03223C11.988 0.927409 11.8444 0.875 11.6621 0.875ZM3.78711 2.03711H11.0879V9.625H3.78711C3.64128 9.625 3.49544 9.64095 3.34961 9.67285C3.20378 9.70475 3.05794 9.76628 2.91211 9.85742V2.91211C2.91211 2.68425 3.00098 2.48145 3.17871 2.30371C3.35645 2.12598 3.55924 2.03711 3.78711 2.03711ZM3.78711 12.5371C3.55924 12.5371 3.35645 12.4505 3.17871 12.2773C3.00098 12.1042 2.91211 11.8991 2.91211 11.6621C2.91211 11.4342 3.00098 11.2314 3.17871 11.0537C3.35645 10.876 3.55924 10.7871 3.78711 10.7871H11.0879V12.5371H3.78711Z"
                          fill="#1E293B"
                        />
                      </svg>
                    </span>
                    Edit course
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleExport(course["@id"])}
                  >
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 6C7.44975 6 8.625 4.82475 8.625 3.375C8.625 1.92525 7.44975 0.75 6 0.75C4.55025 0.75 3.375 1.92525 3.375 3.375C3.375 4.82475 4.55025 6 6 6ZM7.75 3.375C7.75 4.3415 6.9665 5.125 6 5.125C5.0335 5.125 4.25 4.3415 4.25 3.375C4.25 2.4085 5.0335 1.625 6 1.625C6.9665 1.625 7.75 2.4085 7.75 3.375Z"
                          fill="#1E293B"
                        />
                        <path
                          d="M11.25 10.375C11.25 11.25 10.375 11.25 10.375 11.25H1.625C1.625 11.25 0.75 11.25 0.75 10.375C0.75 9.5 1.625 6.875 6 6.875C10.375 6.875 11.25 9.5 11.25 10.375ZM10.375 10.372C10.3737 10.156 10.2404 9.50914 9.6469 8.91559C9.07617 8.34487 8.00296 7.75 5.99999 7.75C3.99702 7.75 2.92381 8.34487 2.35308 8.91559C1.75954 9.50914 1.62625 10.156 1.625 10.372H10.375Z"
                          fill="#1E293B"
                        />
                      </svg>
                    </span>
                    Export User Data
                  </button>
                </li>
                
                <li>
                  <button
                    onClick={() => handleDuplicate(course)}
                    className="dropdown-item"
                    href="#"
                  >
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M0 1.75C0 0.783502 0.783502 0 1.75 0H8.75C9.7165 0 10.5 0.783502 10.5 1.75V3.5H12.25C13.2165 3.5 14 4.2835 14 5.25V12.25C14 13.2165 13.2165 14 12.25 14H5.25C4.2835 14 3.5 13.2165 3.5 12.25V10.5H1.75C0.783502 10.5 0 9.7165 0 8.75V1.75ZM1.75 0.875C1.26675 0.875 0.875 1.26675 0.875 1.75V8.75C0.875 9.23325 1.26675 9.625 1.75 9.625H8.75C9.23325 9.625 9.625 9.23325 9.625 8.75V1.75C9.625 1.26675 9.23325 0.875 8.75 0.875H1.75Z"
                          fill="#1E293B"
                        />
                      </svg>
                    </span>
                    Duplicate Course
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleUserRank(course)}
                    className="dropdown-item"
                    href="#"
                  >
                    <span className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2" />
                      </svg>
                    </span>
                    User rank
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDelete(course["@id"])}
                    className="dropdown-item danger"
                  >
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.6875 0.875H8.3125C8.55413 0.875 8.75 1.07088 8.75 1.3125V2.1875H5.25V1.3125C5.25 1.07088 5.44588 0.875 5.6875 0.875ZM9.625 2.1875V1.3125C9.625 0.587626 9.03737 0 8.3125 0H5.6875C4.96263 0 4.375 0.587626 4.375 1.3125V2.1875H2.19245C2.18947 2.18747 2.1865 2.18747 2.18351 2.1875H1.3125C1.07088 2.1875 0.875 2.38338 0.875 2.625C0.875 2.86662 1.07088 3.0625 1.3125 3.0625H1.7836L2.52977 12.3896C2.60252 13.299 3.36181 14 4.27419 14H9.72581C10.6382 14 11.3975 13.299 11.4702 12.3896L12.2164 3.0625H12.6875C12.9291 3.0625 13.125 2.86662 13.125 2.625C13.125 2.38338 12.9291 2.1875 12.6875 2.1875H11.8165C11.8135 2.18747 11.8105 2.18747 11.8076 2.1875H9.625ZM11.3386 3.0625L10.598 12.3198C10.5616 12.7745 10.182 13.125 9.72581 13.125H4.27419C3.818 13.125 3.43836 12.7745 3.40198 12.3198L2.6614 3.0625H11.3386ZM4.78681 3.93825C5.02802 3.92407 5.23506 4.1081 5.24925 4.34931L5.68675 11.7868C5.70093 12.028 5.5169 12.2351 5.27569 12.2492C5.03448 12.2634 4.82744 12.0794 4.81325 11.8382L4.37576 4.40069C4.36157 4.15948 4.5456 3.95244 4.78681 3.93825ZM9.21319 3.93825C9.4544 3.95244 9.63843 4.15948 9.62424 4.40069L9.18674 11.8382C9.17256 12.0794 8.96552 12.2634 8.72431 12.2492C8.4831 12.2351 8.29907 12.028 8.31326 11.7868L8.75076 4.34931C8.76494 4.1081 8.97198 3.92407 9.21319 3.93825ZM7 3.9375C7.24162 3.9375 7.4375 4.13338 7.4375 4.375V11.8125C7.4375 12.0541 7.24162 12.25 7 12.25C6.75838 12.25 6.5625 12.0541 6.5625 11.8125V4.375C6.5625 4.13338 6.75838 3.9375 7 3.9375Z"
                          fill="#FF4141"
                        />
                      </svg>
                    </span>
                    Remove course
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <section className="best-selling-courses">
      <WarningModal
        show={show}
        setShow={setShow}
        handleConfirm={handleRemove}
        title="Remove Course"
      >
        Are you still sure you want to delete the{" "}
        <strong>Diving Deep into Color Grading and Correction</strong> course?
        All the details including course media and students will be deleted from
        the database.
      </WarningModal>
      <RankModal
        show={showRank}
        setShow={setShowRank}
        course={iri}
        setIri={setIri}
      />
      <div className="table-wrapper" style={{overflow: "visible"}}>
        <div className="section-top">
          <h3 className="title-main">Courses</h3>
          <p className="des">
            Manage your courses and its update like live, draft and insight.
          </p>
          {/* <!-- tab --> */}
          <div className="tab-search-wrapper settings-tab courses-tab">
            <nav className="courses-pill">
              <div className="nav nav-tabs" id="courseTab" role="tablist">
                <button
                  className="nav-link fs-18 fw-500 active"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#published_courses"
                  type="button"
                  role="tab"
                  aria-controls="published_courses"
                  aria-selected="true"
                  onClick={(e) => setVisibility(["public", "private"])}
                  style={{ fontSize: "14px" }}
                >
                  Published Courses
                </button>
                <button
                  className="nav-link fs-18 fw-500"
                  id="nav-password-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#draft_courses"
                  type="button"
                  role="tab"
                  aria-controls="draft_courses"
                  aria-selected="false"
                  onClick={(e) => setVisibility("draft")}
                  style={{ fontSize: "14px" }}
                >
                  Draft courses
                </button>
              </div>
            </nav>
          </div>
          {/* <!-- search  --> */}
          <div className="flex-between gap-2 pb-3">
            <div className="input-box mt-3 flex-1">
              <input
                id="email"
                type="search"
                placeholder="Search your courses"
                className="form-control shadow-none w-100 course-search"
                onChange={handleSearch}
                value={title}
                style={{ fontSize: "14px" }}
              />
            </div>
            <div className="input-box mt-3">
              <select
                className="form-select shadow-none fz-14"
                style={{ height: "2.9rem", color: "#8F95B2" }}
                onChange={(e) => setOrder(e.target.value)}
                value={order}
              >
                <option value="desc">Recently Created</option>
                <option value="asc">Show old first</option>
              </select>
            </div>
          </div>
        </div>
        <div className="tab-content" id="courseTab">
          <div className="tab-pane fade show active" id="published_courses">
            <table className="admin-table d-table overflow-x-auto">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>Courses</th>
                  <th>Module</th>
                  <th>Lesson</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {content}
              </tbody>
              <tfoot>
                <td colSpan={5}>{pagination}</td>
              </tfoot>
            </table>
          </div>
          <div className="tab-pane fade" id="draft_courses">
            <table className="admin-table d-table overflow-x-auto">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>Courses</th>
                  <th>Module</th>
                  <th>Lesson</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {content}
              </tbody>
              <tfoot>
                <td colSpan={5}>{pagination}</td>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
