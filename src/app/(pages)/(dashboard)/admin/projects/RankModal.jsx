import Spinner from "@/Components/ui/Spinner";
import axiosInstance from "@/lib/axios";
import { useGetAllRanksQuery } from "@/redux/api/ranks/rankSlice";
import getId from "@/utils/getId";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export default function RankModal({ show, setShow, course, setIri }) {
  const { isLoading, data } = useGetAllRanksQuery({
    page: 1,
    course
  }, {
    skip: !show
  })
  const [estimatedCount, setEstimatedCount] = useState("")

  const estimateMaxPoint = async (iri) => {
    try {
      const response = await axiosInstance.get(`/points/estimate/${getId(iri)}`);
      setEstimatedCount(response.data?.points)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (course) {
      estimateMaxPoint(course)
    }
  }, [course])

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

    const headers = "fullname,email,phone,points\n";
    const rows = data
      .map((user) => `"${user.fullname}","${user.email}","${user.phone}","${user.points}"`)
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
      const response = await axiosInstance.get(`/user/export/${splitedId}?rank=true`);
      const parsedData = parseCSV(response.data);
      const csvContent = convertToCSV(parsedData);
      downloadCSV(csvContent, "rankingUser.csv");
    } catch (error) {
      console.error("Error fetching export:", error);
    }
  };

  const handleDiscard = () => {
    setShow(false)
    setIri("")
  }

  let content = null;
  if (isLoading) {
    content = <tr>
      <td colSpan="5" className="text-center">
        <Spinner />
      </td>
    </tr>
  }
  if (!isLoading && data && data["hydra:member"].length === 0) {

    content = <tr>
      <td colSpan="5" className=" fw-bold text-center bg-white">
        There is No Ranks!
      </td>
    </tr>

  }
  if (!isLoading && data && data["hydra:member"].length > 0) {
    content = data["hydra:member"].map((rank, ind) => {
      const { student, course, points } = rank;
      return (
        <tr key={rank["@id"]}>
          <td>{ind + 1}</td>
          <td>{student?.fullName}</td>
          <td>{student?.email}</td>
          <td>{course?.title}</td>
          <td>{points}</td>
        </tr>
      )
    })
  }
  return (

    <Modal
      show={show}
      onHide={handleDiscard}
      animation
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <div className="flex-1">
          <h1 className="modal-title fs-5 ">All Ranking users</h1>
          {estimatedCount && <span className="fs-6 text-black-50">Estimated max points: {estimatedCount}</span>}
        </div>
        {
          course && !isLoading && data && data["hydra:member"].length > 0 && <button
            className="btn-dashboard me-3"
            onClick={() => handleExport(course)}
          >
            <span className="icon me-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 6C7.44975 6 8.625 4.82475 8.625 3.375C8.625 1.92525 7.44975 0.75 6 0.75C4.55025 0.75 3.375 1.92525 3.375 3.375C3.375 4.82475 4.55025 6 6 6ZM7.75 3.375C7.75 4.3415 6.9665 5.125 6 5.125C5.0335 5.125 4.25 4.3415 4.25 3.375C4.25 2.4085 5.0335 1.625 6 1.625C6.9665 1.625 7.75 2.4085 7.75 3.375Z"
                  fill="#fff"
                />
                <path
                  d="M11.25 10.375C11.25 11.25 10.375 11.25 10.375 11.25H1.625C1.625 11.25 0.75 11.25 0.75 10.375C0.75 9.5 1.625 6.875 6 6.875C10.375 6.875 11.25 9.5 11.25 10.375ZM10.375 10.372C10.3737 10.156 10.2404 9.50914 9.6469 8.91559C9.07617 8.34487 8.00296 7.75 5.99999 7.75C3.99702 7.75 2.92381 8.34487 2.35308 8.91559C1.75954 9.50914 1.62625 10.156 1.625 10.372H10.375Z"
                  fill="#fff"
                />
              </svg>
            </span>
            Export User Data
          </button>
        }
      </Modal.Header>
      <Modal.Body>
        <table className="admin-table d-table overflow-x-auto">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {content}
          </tbody>
        </table>
      </Modal.Body>


    </Modal>
  )
}