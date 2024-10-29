"use client"
import { default as portfolio5 } from "@/assets/images/portfolio/Home-Click-Jobs.png";
import { getProjects } from "@/lib/fetch/project";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [show, setShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [projects, setProjects] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async function () {
      setLoading(true)
      const projects = await getProjects()
      setProjects(projects)
      setLoading(false)
    })()
  }, [])

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
                  <button className="edit-btn btn">
                    <MdModeEditOutline />
                  </button>
                  <button className="delete-btn btn">
                    <MdDelete />
                  </button>
                </div>

                <div className="success-img">
                  <div className="magnetic-wrap">
                    <Image className="img-fluid magnetic-item" src={portfolio5} alt="" style="" />
                  </div>
                </div>
                <div className="success-content" >
                  <span>Web development</span>
                  <h3>Code sync station</h3>
                  <div className="view-btn">
                    <a href="#">
                      <HiOutlineArrowRight />
                    </a>

                  </div>
                </div>
              </div>
            </div>
          ))
        }
        <div className="col-md-6 col-xl-4 mt-3">
          <div className="portfolio-card add-card" onClick={() => setShow(true)}>
            <div className="plus-icon">
              <MdAdd />
            </div>
          </div>
        </div>
      </>




  }

  return (
    <>
      <ProjectModal show={show} setShow={setShow} isEdit={isEdit} setIsEdit={setIsEdit} setProjects={setProjects} />
      <div className="row mt-3 px-4">
        {content}

      </div>
    </>

  )
}