"use client"
import { useGetFlaggedUsersQuery } from "@/redux/api/flaggedUser/flaggedSlice"
import moment from "moment"

export default function FlagHistory({ params }) {

  // const [flagHistory, setFlagHistory] = useState(null)
  const {isLoading, data:flagHistory} = useGetFlaggedUsersQuery({
    student: `/api/users/${params?.studentId}`,
    status: false
  }, {
    skip: !params
  })
  return flagHistory && flagHistory["hydra:member"].length > 0 && <div className="table-wrapper mt-2">

    <div className="section-top flex-between">
      <h3 className="title-main">Flag history</h3>
    </div>

    <table className="admin-table student-details-table overflow-x-auto d-lg-table">
      {/* <!-- head --> */}
      <thead>
        <tr>
          {/* <th>Course Name</th> */}
          <th className="pe-0">Flag Date</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* <!-- row 1 --> */}
        {
          flagHistory["hydra:member"].map(flag => (
            <tr key={flag.id}>
              {/* <td>{flag?.course?.title}</td> */}
              <td>{moment(flag?.createdAt).format("MMM DD, YYYY")}</td>
              <td>{flag.reason}</td>
              <td>{flag.status ? "Flagged": "UnFlagged"}</td>
            </tr>
          ))
        }
      </tbody>

    </table>
  </div>
}