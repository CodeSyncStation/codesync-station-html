"use client"

import { getProjects, postProject } from "@/lib/fetch/project";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_APIHOST;
export default function ProjectModal({ show, setShow = true, isEdit, setIsEdit, iri, setProjects }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [encodedUrl, setEncodedUrl] = useState("")
  const [liveLink, setLiveLink] = useState("")
  const [category, setCategory] = useState("")

  const handleFile = (e) => {
    setProfileImage(e.target.files[0])
    const reader = new FileReader()
    reader.onloadend = function (e) {
      setEncodedUrl(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const reset = () => {
    setTitle("")
    setDescription("")
    setProfileImage("")
    setEncodedUrl("")
    setLiveLink("")
    setCategory("")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(!title || !description || !liveLink || !category) return toast.error("Please fill all the fields!")
      const toastId = toast.loading("Saving project information...") // Show loading toast
      const projectInfo = {
        title,
        description,
        liveLink,
        image: "image",
        category,
      }

      try {
        const project = await postProject(projectInfo)
        console.log(project)
        if (project._id) {
          const projects = await getProjects()
          setProjects(projects)
          setShow(false)
          reset()
          toast.success("Added project successfully!")
          toast.dismiss(toastId)
        }

      } catch (error) {
        toast.error(error?.message || "Un expected error!")
      }
      toast.dismiss(toastId)

  }

  const handleUpdate = async e => {
    e.preventDefault()

  }

  const handleDiscard = () => {
    setShow(false)
    setIsEdit(false)
    reset()
  }

  return (
    <Modal
      className="modal fade"
      show={show}
      size="lg"
      animation
    >
      <Modal.Header>
        <h1 className="modal-title fs-5" >
          {!isEdit ? " Add Project" : " Edit Project"}
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="project-upload-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required />
            </div>

            <div className="form-group">
              <label htmlFor="title">Thumbnail</label>
              <input type="file" name="image" accept="image/*" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="link">Project Link</label>
              <input
                type="url"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                required />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectDetails">Project Details</label>
              <textarea value={description} onChange={(e)=> setDescription(e.target.value)} required></textarea>
            </div>


          </form>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <button
          className="outline-secondary add-employee fz-12"
          onClick={handleDiscard}
        >
          Discard
        </button>
        {isEdit ? (
          <button className="btn-dashboard  fz-12 py-2" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="btn-dashboard fz-12 py-2" onClick={handleSubmit}>
            Save
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}