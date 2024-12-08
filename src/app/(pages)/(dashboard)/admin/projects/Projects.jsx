"use client"
import { deleteProject, getProjects } from "@/lib/fetch/project";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [show, setShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [projects, setProjects] = useState(null)
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState(null)
  useEffect(() => {
    (async function () {
      setLoading(true)
      const projects = await getProjects()
      setProjects(projects)
      setLoading(false)
    })()
  }, [])

  const handleEdit = (project) => {
    setShow(true)
    setIsEdit(true)
    setProject(project)
  }

  const handleDelete = async id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting project...")
        try {
          deleteProject(id).then((data) => {
            if (data.status === 200) {
              getProjects().then(projects => {
                setProjects(projects)
              })
              toast.success("Deleted project successfully!")
              toast.dismiss(toastId)
            }

          })


        } catch (error) {
          toast.error(error?.message || "Un expected error!")
        }
        toast.dismiss(toastId)
      }
    });

  }

  let content = null;
  if (loading && !projects) {
    content = <p>Loading...</p>
  }

  if (!loading && projects && projects.length > 0) {
    content =
      <>
        {
          projects?.map((project) => (
            <div key={project?._id} className="col-md-6 col-xl-4 mt-3">
              <div className="portfolio-card" >
                <div className="action-btn">
                  <button className="edit-btn btn" onClick={() => handleEdit(project)}>
                    <MdModeEditOutline />
                  </button>
                  <button className="delete-btn btn" onClick={() => handleDelete(project?._id)}>
                    <MdDelete />
                  </button>
                </div>

                <div className="success-img">
                  <div className="magnetic-wrap">
                    <Image className="img-fluid magnetic-item" src={project?.image} alt={project?.title} fill />
                  </div>
                </div>
                <div className="success-content" >
                  <span>{project?.category}</span>
                  <h3>{project?.title}</h3>
                  <div className="view-btn">
                    <Link href={project?.liveLink} target="_blank">
                      <HiOutlineArrowRight />
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </>
  }

  return (
    <>
      <ProjectModal show={show} setShow={setShow} isEdit={isEdit} setIsEdit={setIsEdit} setProjects={setProjects} project={project} setProject={setProject} />
      <div className="row mt-3 px-4">
        {content}
        {
          !loading && <div className="col-md-6 col-xl-4 mt-3">
            <div className="portfolio-card add-card" onClick={() => setShow(true)}>
              <div className="plus-icon">
                <MdAdd />
              </div>
            </div>
          </div>
        }

      </div>
    </>

  )
}