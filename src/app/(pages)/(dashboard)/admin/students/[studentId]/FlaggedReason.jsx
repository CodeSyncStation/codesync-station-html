"use client"
import { useGetSingleUserQuery } from "@/redux/api/user/userSlice"
import { useState } from "react"
import FlagModal from "./FlagModal"

export default function FlaggedReason({ params }) {
  const { isLoading, isError, error, data: student, refetch } = useGetSingleUserQuery({ iri: params.studentId })
  const [flagModal, setFlagModal] = useState(false);
  if (isLoading) return
  if (!student) return
  if (!student.flagged) return

  const handleRemoveFlagModal = () => {
    setFlagModal(true);
  }

  return (
    <>
      <FlagModal show={flagModal} setShow={setFlagModal} refetch={refetch} student={student} />
      <div className="flagged-msg-container">
        <div className="header-top">
          <h3 className="title-main">Flagged Reason</h3>
          <div className="line"></div>
        </div>
        <div className="reason">
          <div className="alert alert-warning d-flex gap-3">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.845 13.5L15.855 13.49L8.85935 1.49L8.84935 1.5C8.67946 1.2 8.36965 1 7.99989 1C7.63012 1 7.3303 1.2 7.15042 1.5L7.14042 1.49L0.144795 13.49L0.154789 13.5C0.0648453 13.65 0.00488281 13.81 0.00488281 14C0.00488281 14.55 0.454602 15 1.00426 15H14.9955C15.5452 15 15.9949 14.55 15.9949 14C15.9949 13.81 15.9349 13.65 15.845 13.5ZM8.99926 12.99H7.00051V10.99H8.99926V12.99ZM7.00051 9.99H8.99926V4.99H7.00051V9.99Z" fill="#FFB020" />
              </svg>
            </div>
            <div className="flex-1">
              <h5 className="warning-title">
                Warning Message.
              </h5>
              <p className="muted">
                {student?.flaggedUser?.reason}
              </p>
            </div>
            <div className="">
              <button onClick={handleRemoveFlagModal} className="btn mt-4 btn-secondary btn-sm" style={{ borderRadius: "20px" }}>Unflag</button>
              {/* <select
              name="flagOptions"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "20px" }}
              onChange={handleFlag}
            >
              <option selected hidden>Select option</option>
              <option value="unflag">Unflag</option>
              <option value="gracePeriod">Grace period</option>
            </select> */}

            </div>
          </div>
        </div>
      </div>
    </>

  )
}