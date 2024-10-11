"use client"
import { useGetSingleCourseQuery } from "@/redux/api/courses/coursesSlice";
import { Card, Modal } from "react-bootstrap";

export default function ProgressDetailsModal({ show, setShow, iri = "/api/courses/1" }) {

  const { isLoading, data: course } = useGetSingleCourseQuery({ iri }, {
    skip: !iri
  })

  const handleClose = () => {
    setShow(false);
  }

  return (
    <Modal show={show} onHide={handleClose} animation centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">{course?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {
            course?.modules?.map((module, index) => {
              return (
                <div key={module["@id"]} className="col-lg-6">
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <h3 className="progress_title">{module?.title}</h3>
                    <Card.Text>
                      Ss
                    </Card.Text>
                 
                  </Card.Body>
                </Card>
              </div>
              )
            })
          }
        </div>
      </Modal.Body>

    </Modal>
  )
}