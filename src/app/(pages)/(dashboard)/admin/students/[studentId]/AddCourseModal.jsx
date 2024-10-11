"use client"
import { useGetAllCoursesQuery, usePostMyCourseMutation } from "@/redux/api/courses/coursesSlice"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import toast from "react-hot-toast"

export default function AddCourseModal({ show, setShow, userId }) {
  const [course, setCourse] = useState("")
  const { isLoading:isLoadingCourses, data, isError  } = useGetAllCoursesQuery({})
  const [postMyCourse, {isLoading}]= usePostMyCourseMutation()

  const handleAdd = async (e) => {
    e.preventDefault()
    if(!course) return toast.error("please select a course")
      const courseInfo = {
        "course": course,
        "owner": `/api/users/${userId}`,
        "revoked": false
    }
    const toastId = toast.loading("Adding...")
    try {
     await postMyCourse({data: courseInfo}).unwrap()
     setShow(false)
     toast.success("Course added successfully!")
    } catch (error) {
      toast.error("Error occured")
    }
    toast.dismiss(toastId)
      
  }
  const handleDiscard = () => {
    setShow(false)
  }

  let content = null;

  if (!isLoadingCourses && !isError && data && data["hydra:member"]?.length > 0) {
    content = data["hydra:member"]?.map(courseObj => {
      
      return (
        <option key={courseObj["@id"]} value={courseObj["@id"]}>{courseObj?.title}</option>
      )
    })
  }
 
  return (
    <Modal
      show={show}
      onHide={handleDiscard}
      animation
      centered
    >
      <Modal.Header>
        <h1 className="modal-title fs-5">Add Course</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="row gap-3">
          <div className="col-12">
          <label htmlFor="course"
            >Course <span className="text-danger">*</span></label
            >
            <select
              className="form-select shadow-none"
              id="course"
              name="course"
              aria-label="Select your course"
              onChange={e => setCourse(e.target.value)}
              required
            >
              <option selected disabled hidden>Select your course</option>
              {
                content
              }
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDiscard} variant="outline-secondary">
          Discard
        </Button>
        <button onClick={handleAdd} disabled={isLoading} className="btn-dashboard">Add</button>
      </Modal.Footer>

    </Modal>
  )
}