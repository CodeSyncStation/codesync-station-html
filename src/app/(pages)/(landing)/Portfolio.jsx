"use client"
import { HiOutlineArrowRight } from "react-icons/hi";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { getProjects } from "@/lib/fetch/project";
import getAnimation from "@/utilities/func/getAnimation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';

export default function Portfolio() {

  const [projects, setProjects] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async function(){
      const data = await getProjects()
      setProjects(data)
      setLoading(false)
    })()
  }, [])

  
  let content = null;

  if (loading && projects.length === 0) {
    content = <div className="text-center" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  }

  if (!loading && projects.length === 0) {
    content = <div className="text-center">
      <p>Project not found.</p>
    </div>
  }

  if (!loading && projects.length > 0) {
    content =<Swiper
    modules={[Pagination, Autoplay]}
    className="project-swiper"
    pagination={{ clickable: true }}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={true}
    loop={true}
    breakpoints={{
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    }}
  >

    {
      projects.map((project, i) => (
        <SwiperSlide key={project._id} >
          <div className="portfolio-card" data-aos={getAnimation(i)}>
            <div className="success-img ">
              <div className="magnetic-wrap ">
                <Image fill className="img-fluid magnetic-item" src={project?.image} alt={project?.title}/>
              </div>
            </div>
            <div className="success-content" >
              <span>{project.projectType}</span>
              <h3>{project.title}</h3>
              <div className="view-btn">
                <Link href={project?.liveLink} target="_blank">
                  <HiOutlineArrowRight />
                </Link>

              </div>
            </div>
          </div>
        </SwiperSlide>
      ))
    }
  </Swiper>
  }


  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-title">
          <h6 className="sub-title">Portfolio</h6>
          <h2 className="title">
            Completed {" "}
            Projects
          </h2>
        </div>

        <div className="section-body">
          {content}

        </div>
      </div>
    </section>
  )
}