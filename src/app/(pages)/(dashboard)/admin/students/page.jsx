"use client"
import Pagination from "@/Components/ui/Pagination";
import Spinner from "@/Components/ui/Spinner";
import axiosInstance from "@/lib/axios";
import { usePostChatBoxMutation } from "@/redux/api/chat/chatSlice";
import { useGetAllUsersQuery, useGetInactiveStudentsQuery } from "@/redux/api/user/userSlice";
import getId from "@/utils/getId";
import getUser from "@/utils/getUser";
import { PDFDownloadLink } from '@react-pdf/renderer';
import debounce from "lodash.debounce";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddStudentModal from "./AddStudentModal";
import StudentDocument from "./StudentDocument";


const baseUrl = process.env.NEXT_PUBLIC_APIHOST;

const page = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [user, setUser] = useState({})
  const [show, setShow] = useState(false)
  const { isLoading, isError, error, data: students } = useGetAllUsersQuery({ page, isMod: false, user: search, flagged: false })
  const { isLoading: loadingFlagged, data: flaggedStudents } = useGetAllUsersQuery({ page, isMod: false, user: search, flagged: true })
  const { isLoading: loadingInactiveUser, data: inActiveStudents } = useGetInactiveStudentsQuery()
  const [postChatbox, { isPostingChat }] = usePostChatBoxMutation()
  const calculateLessonProgress = (lessonStatus) => {
    const { lessonCount, lessonFinished } = lessonStatus;
    if (lessonCount === 0) return 0;
    return (lessonFinished / lessonCount) * 100;
  };
  const [pdfData, setPdfData] = useState([])
  const [activeKey, setActiveKey] = useState("students")

  const router = useRouter()

  const handleMessage = async student => {
    if (!student || !user["@id"]) return;
    const chatBoxInfo = {
      student: student["@id"],
      instructor: user["@id"]
    }
    const toastId = toast.loading(`Loading...`)
    try {
      const fondedChatBox = await axiosInstance.get(`/chat_boxes?page=1&student.email=${student?.email}`)
      if (fondedChatBox.data["hydra:member"].length > 0) {
        router.push(`/admin/chat/${getId(fondedChatBox.data["hydra:member"][0]["@id"])}`)
      } else {
        const res = await postChatbox(chatBoxInfo).unwrap()
        router.push(`/admin/chat/${getId(res["@id"])}`)
      }
    } catch (error) {
      toast.error(error.message || "There was an error")
    }
    toast.dismiss(toastId)
  }
  const handleSearch = debounce((e) => {
    setSearch(e.target.value)
  }, 500)

  useEffect(() => {
    if (!isLoading && students && students["hydra:member"].length > 0) {
      let studentData = [];
      if (activeKey == "students") {
        studentData = students["hydra:member"]
      }
      if (activeKey == "inactive") {
        studentData = inActiveStudents?.members
      }
      if (activeKey == "flagged") {
        studentData = flaggedStudents["hydra:member"]
      }
      const data = studentData?.map(student => {
        const { fullName, email, phone, courses, registeredAt } = student
        const obj = { fullName, email, enrollDate: registeredAt }
        if (phone) {
          obj.phone = phone;
        }
        if (courses) {
          obj.courses = courses
        }
        return obj;
      })
      setPdfData(data)
    }

  }, [isLoading, students, activeKey])

  useEffect(() => {
    setUser(getUser())
  }, [])

  let content = null;
  let flaggedStudentsContent = null;
  let inActiveStudentContent = null;
  let flaggedPagination = null;
  let inActivePagination = null;
  let pagination = null;

  if (isLoading && !isError) {
    content = <td colSpan="6" className=" fw-bold text-center bg-white">
      <Spinner />
    </td>
  } else if (isError && !isLoading) {
    content = <p className="text-warning">{error.message}</p>
  } else if (!isLoading && !isError && students["hydra:member"]?.length === 0) {
    content = <td colSpan="6" className=" fw-bold text-center bg-white">There is No Students!</td>
  } else if (!isLoading && !isError && students["hydra:member"]?.length > 0) {
    pagination = <tr>
      <td colSpan={6}>
        <Pagination page={page} setPage={setPage} totalItemCount={students["hydra:member"].length} />
      </td>
    </tr>
    content = students["hydra:member"].map(student => {
      const {
        fullName,
        phone,
        email,
        roles,
        registeredAt,
        course,
        profileImage,
        social,
        occupation,
        bio,
        isMod,
        takenCourses,
        lessonStatus
      } = student;
      const progress = calculateLessonProgress(lessonStatus);
      return (
        <tr key={student["@id"]}>
          <td className="pe-0">
            <div className="course-image-container">
              <figure className="author-img">
                <img src={baseUrl + profileImage} alt="" />
              </figure>
              <div>
                <h3 className="course-name w-auto">{fullName}</h3>
                <div className="d-flex align-items-center gap-3 summery mt-2">
                  <span className="d-flex align-items-center gap-1 summery">
                    {email}
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td className="p-0 ps-2">
            <span className="muted">{moment(registeredAt).format("l")}</span>
          </td>
          <td className="text-center">
            <span className="muted">{takenCourses}</span>
          </td>
          <td>
            <span className="muted">
              {lessonStatus?.lessonFinished}/{lessonStatus?.lessonCount}
            </span>
          </td>
          <td>
            <div className="d-flex gap-3 align-items-center">
              <span className="muted" style={{ width: "6rem" }}>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: "3px" }}
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
          </td>
          <td>
            <div className="d-flex gap-2">
              <button
                onClick={() => handleMessage(student)}
                className="pill bg-secondary"
              >
                {isPostingChat ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Message"
                )}
              </button>
              <Link href={`/admin/students/${getId(student["@id"])}`}>
                <button className="pill">Details</button>
              </Link>
            </div>

          </td>
        </tr>
      );
    })
  }

  if (!loadingFlagged && flaggedStudents["hydra:member"].length === 0) {
    flaggedStudentsContent = <tr>
      <td colSpan="6" className=" fw-bold text-center bg-white">
        There is No Flagged Students!
      </td>
    </tr>
  }

  if (!loadingFlagged && flaggedStudents["hydra:member"].length > 0) {
    flaggedPagination = <tr>
      <td colSpan={6}>
        <Pagination
          page={page}
          setPage={setPage}
          totalItemCount={flaggedStudents["hydra:member"].length}
        />
      </td>
    </tr>
    flaggedStudentsContent = flaggedStudents["hydra:member"].map(student => {
      const {
        fullName,
        phone,
        email,
        roles,
        registeredAt,
        course,
        profileImage,
        social,
        occupation,
        bio,
        isMod,
        takenCourses,
        lessonStatus,
      } = student;
      const progress = calculateLessonProgress(lessonStatus);
      return (
        <tr key={student["@id"]}>
          <td className="pe-0">
            <div className="course-image-container position-relative">
              <figure className="author-img overflow-visible">
                <span className="flag-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M7.97603 0.945218C8.05365 0.975591 8.11102 1.04264 8.12902 1.12402L8.93917 4.78546C8.96126 4.88527 8.92035 4.98847 8.83588 5.04605L8.69508 4.83947C8.83588 5.04605 8.83588 5.04605 8.83588 5.04605L8.83473 5.04683L8.83198 5.04869L8.8218 5.05555C8.81299 5.06148 8.80016 5.07005 8.78369 5.08093C8.75076 5.10269 8.70322 5.13375 8.64399 5.17142C8.52568 5.24668 8.36005 5.34879 8.17072 5.45626C7.79977 5.66682 7.31026 5.91402 6.90434 6.00384C6.49098 6.0953 6.11812 6.03403 5.79423 5.98081L5.77943 5.97838C5.44249 5.92306 5.15616 5.87855 4.84355 5.94772C4.50174 6.02335 4.06845 6.23663 3.70518 6.44412C3.52704 6.54588 3.37185 6.64265 3.26126 6.71395C3.24888 6.72194 3.23706 6.7296 3.22584 6.7369L3.89102 9.74314C3.92085 9.87795 3.83574 10.0114 3.70093 10.0412C3.56612 10.0711 3.43265 9.98597 3.40282 9.85116L1.78253 2.52828C1.7527 2.39347 1.8378 2.26 1.97261 2.23017C2.10742 2.20034 2.24089 2.28545 2.27072 2.42026L2.30121 2.55805C2.40304 2.495 2.52509 2.42167 2.659 2.34566C3.02995 2.13511 3.51946 1.88791 3.92538 1.79809C4.33583 1.70727 4.69925 1.76867 5.01688 1.82234C5.02461 1.82364 5.03232 1.82494 5.03999 1.82624C5.37055 1.88199 5.65801 1.92681 5.98617 1.8542C6.32798 1.77857 6.76127 1.5653 7.12454 1.3578C7.30268 1.25605 7.45787 1.15928 7.56846 1.08798C7.62368 1.05237 7.66761 1.02323 7.69753 1.00313C7.71248 0.993085 7.72392 0.985308 7.7315 0.980125L7.73994 0.974338L7.7419 0.97298L7.74232 0.972688" fill="#FF0000" />
                  </svg>
                </span>
                <img className="author-img" src={baseUrl + profileImage} alt="" />
              </figure>
              <div>
                <h3 className="course-name w-auto">{fullName}</h3>
                <div className="d-flex align-items-center gap-3 summery mt-2">
                  <span className="d-flex align-items-center gap-1 summery">
                    {email}
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td className="p-0 ps-2">
            <span className="muted">{moment(registeredAt).format("l")}</span>
          </td>
          <td className="text-center">
            <span className="muted">{takenCourses}</span>
          </td>
          <td>
            <span className="muted">
              {lessonStatus.lessonFinished}/{lessonStatus.lessonCount}
            </span>
          </td>
          <td>
            <div className="d-flex gap-3 align-items-center">
              <span className="muted" style={{ width: "6rem" }}>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: "3px" }}
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </span>
              <span>{progress.toFixed(2)}%</span>
            </div>
          </td>
          <td>
            <div className="d-flex gap-2">
              <button
                onClick={() => handleMessage(student)}
                className="pill bg-secondary"
              >
                {isPostingChat ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Message"
                )}
              </button>
              <Link href={`/admin/students/${getId(student["@id"])}`}>
                <button className="pill">Details</button>
              </Link>
            </div>
          </td>
        </tr>
      );
    })
  }

  if (!loadingInactiveUser && inActiveStudents?.members.length === 0) {
    inActiveStudentContent = <tr>
      <td colSpan="5" className=" fw-bold text-center bg-white">
        There is No inactive Students!
      </td>
    </tr>
  }

  if (!loadingInactiveUser && inActiveStudents?.members.length > 0) {
    inActiveStudentContent = inActiveStudents?.members.map(student => {
      const { fullName, phone, email, roles, registeredAt, profileImage, social, mod, lastActivity } = student;
      // const progress = calculateLessonProgress(lessonStatus);
      return (
        <tr key={student["@id"]}>
          <td >
            <div className="course-image-container">
              <figure className="author-img">
                <img src={baseUrl + profileImage} alt="" />
              </figure>
              <div>
                <h3 className="course-name w-auto">{fullName}</h3>
                <div className="d-flex align-items-center gap-3 summery mt-2">
                  <span className="d-flex align-items-center gap-1 summery">
                    {email}
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <span className="muted">
              {phone}
            </span>
          </td>
          <td >
            <span className="muted">{moment(registeredAt).format("l")}</span>
          </td>
          <td >
            <span className="muted">{moment(lastActivity).format("l")}</span>
          </td>
          <td>
            <div className="d-flex gap-2">
              <button
                onClick={() => handleMessage(student)}
                className="pill bg-secondary"
              >
                {isPostingChat ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Message"
                )}
              </button>
              <Link href={`/admin/students/${getId(student["@id"])}`}>
                <button className="pill">Details</button>
              </Link>
            </div>
          </td>
        </tr>
      );
    })
    inActivePagination = <tr>
      <td colSpan={5}>
        <Pagination
          page={page}
          setPage={setPage}
          totalItemCount={inActiveStudents?.members.length}
        />
      </td>
    </tr>

  }

  return (
    <>
      <AddStudentModal show={show} setShow={setShow} />
      <section className="best-selling-courses">
        <div className="table-wrapper overflow-auto">
          <div className="section-top ">
            <div className="flex-between">
              <div>
                <h3 className="title-main">Students</h3>
                <p className="des">
                  Meet people taking your course.
                </p>
              </div>

              <div className="d-flex gap-2">
                {/* <button className="btn-addmoderator fxwidth"
                  onClick={() => setShow(true)}
                >
                  <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                      </svg>
                  </span>
                   Student List
                </button> */}
                <PDFDownloadLink
                  document={<StudentDocument data={pdfData} />}
                  fileName="student_list.pdf"
                  className="text-decoration-none"
                >
                  <button className="btn-addmoderator fxwidth"
                  >
                    <span className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                      </svg>
                    </span>
                    Student List
                  </button>
                </PDFDownloadLink>

                {
                  user?.roles?.includes("ROLE_SUPER_ADMIN") && <button className="btn-addmoderator fxwidth"
                    onClick={() => setShow(true)}
                  >
                    <span className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 2.5C8.27614 2.5 8.5 2.72386 8.5 3V8H13.5C13.7761 8 14 8.22386 14 8.5C14 8.77614 13.7761 9 13.5 9H8.5V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V9H2.5C2.22386 9 2 8.77614 2 8.5C2 8.22386 2.22386 8 2.5 8H7.5V3C7.5 2.72386 7.72386 2.5 8 2.5Z" fill="#1E293B" />
                      </svg>
                    </span>
                    Add student
                  </button>
                }

              </div>

            </div>
            {/* tab */}


            <div className="tab-search-wrapper settings-tab courses-tab">
              <nav className="courses-pill">
                <div className="nav nav-tabs" id="studentTab" role="tablist">
                  <button
                    className="nav-link fs-18 fw-500 active"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#students"
                    type="button"
                    role="tab"
                    aria-controls="students"
                    aria-selected="true"
                    onClick={() => setActiveKey("students")}
                  >
                    Students
                  </button>
                  <button
                    className="nav-link fs-18 fw-500"
                    data-bs-toggle="tab"
                    data-bs-target="#flaggedStudents"
                    type="button"
                    role="tab"
                    aria-controls="flaggedStudents"
                    aria-selected="false"
                    onClick={() => setActiveKey("flagged")}
                  >
                    Flagged Students
                  </button>
                  <button
                    className="nav-link fs-18 fw-500"
                    data-bs-toggle="tab"
                    data-bs-target="#inActiveStudent"
                    type="button"
                    role="tab"
                    aria-controls="inActiveStudent"
                    aria-selected="false"
                    onClick={() => setActiveKey("inactive")}
                  >
                    Inactive Students
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
                  placeholder="Search by name or email"
                  className="form-control shadow-none w-100"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="tab-content" id="studentTab">
            <div className="tab-pane fade show active" id="students">
              <table className="admin-table d-lg-table overflow-x-auto">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>Students</th>
                    <th className="pe-0 ps-2">Enroll Date</th>
                    <th >Course Taken</th>
                    <th>Lessons</th>
                    <th>Progress</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- row 1 --> */}
                  {content}
                </tbody>
                <tfoot>
                  {pagination}
                </tfoot>
              </table>
            </div>
            <div className="tab-pane fade" id="flaggedStudents">
              <table className="admin-table d-block d-lg-table overflow-x-auto">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>Students</th>
                    <th >Enroll Date</th>
                    <th >Course Taken</th>
                    <th>Lessons</th>
                    <th>Progress</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- row 1 --> */}
                  {flaggedStudentsContent}
                </tbody>
                <tfoot>
                  {flaggedPagination}
                </tfoot>
              </table>
            </div>
            <div className="tab-pane fade" id="inActiveStudent">
              <table className="admin-table d-block d-lg-table overflow-x-auto">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>Students</th>
                    <th>Phone</th>
                    <th >Enroll Date</th>
                    <th >Last Activity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- row 1 --> */}

                  {inActiveStudentContent}
                </tbody>
                <tfoot>
                  {inActivePagination}
                </tfoot>
              </table>

            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default page