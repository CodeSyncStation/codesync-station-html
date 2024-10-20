import { useGetMyCoursesQuery, useToggleAccessMutation } from "@/redux/api/courses/coursesSlice";
import moment from "moment";
import { useState } from "react";
import AddCourseModal from "./AddCourseModal";
import ProgressDetailsModal from "./ProgressDetailsModal";

export default function CourseDetailsInfo({ params }) {

  const { isLoading, data: myCourses, isError } = useGetMyCoursesQuery({
    ownerId: params.studentId
  })
  const [show, setShow] = useState(false)
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [iri, setIri] = useState("")

  const [toggleAccess] = useToggleAccessMutation()

const handleAddCourse = ()=> {
  setShowAddCourse(true)
}

  const handleRevoke = (courseId, isRevoked, e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleAccess({ courseId, isRevoked })
  }

  let content = null;
  
  if (!isLoading && myCourses && myCourses["hydra:member"].length === 0) {
    content =
      <tr>
        <td colSpan={7}>
          <p className="fw-bold text-center">Course not found!</p>
        </td>
      </tr>

  }
  if (!isLoading && myCourses && myCourses["hydra:member"].length > 0) {
    content = myCourses["hydra:member"].map(cou => {
      const { course, status, owner, revoked, createdAt, lessonStats } = cou;
      return <tr key={course["@id"]}>
        <td className="pe-1">
          <h3 className="course-name">
            {course?.title}
          </h3>
        </td>
        <td>
          <span className="muted">{moment(createdAt).format("MMM D, YYYY")}</span>
        </td>
        <td>
          <span className="muted">{lessonStats?.completedLessonCount}/{lessonStats?.lessonCount}</span>
        </td>
        <td>
          <span className="muted">{lessonStats?.completedQuizCount}/{lessonStats?.quizCount}</span>
        </td>
        <td>
          <span className="muted"> {lessonStats?.completedAssignmentCount}/{lessonStats?.assignmentCount} </span>
        </td>
        <td className="ps-0">
          <span className="muted">{lessonStats?.totalWatchTime} </span>

        </td>
        <td className="ps-0">
          <button onClick={(e) => handleRevoke(cou["@id"], revoked, e)} className="btn btn-secondary btn-sm" style={{ borderRadius: "20px" }}>{revoked ? "Invoke Access" : "Revoke Access"}</button>
        </td>
      </tr>
    })
  }

  return isLoading && !isError ? null : (
    <div className="table-wrapper">
      <AddCourseModal show={showAddCourse} setShow={setShowAddCourse} userId={params?.studentId}/>
      <ProgressDetailsModal show={show} setShow={setShow} iri={iri} />
      <div className="section-top flex-between">
        <h3 className="title-main">Courses</h3>
        <button onClick={handleAddCourse} className="btn-seepreview fxwidth">Add Course</button>
      </div>

      <table className="admin-table student-details-table overflow-x-auto d-lg-table">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Course Name</th>
            <th className="pe-0">Enroll Date</th>
            <th>Lessons</th>
            <th>Quiz</th>
            <th>Assignment</th>
            <th className="p-0">Watch Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {content}
        </tbody>

      </table>
    </div>
  )
}