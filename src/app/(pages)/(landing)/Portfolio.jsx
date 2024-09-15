"use client"
import portfolio5 from "@/assets/images/portfolio/Home-Click-Jobs.png";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Portfolio() {

  const projects = [
    {
      id: 1,
      title: "Home Click Jobs",
      image: portfolio5,
      link: "project-details.html",
      category: "Web development"
    },
    {
      id: 2,
      title: "Eco-Friendly Cleaning Solutions",
      image: portfolio5,
      link: "project-details.html",
      category: "Cleaning"
    },
    {
      id: 3,
      title: "Green Energy Solutions",
      image: portfolio5,
      link: "project-details.html",
      category: "Energy"
    }
  ]

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
          <Swiper
            modules={[Pagination]}
            className="project-swiper"
            pagination={{clickable: true}}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              1200: {
                slidesPerView: 3,
              },
            }}
          >

            {
              projects.map(project => (
                <SwiperSlide key={project.id}>
                  <div className="success-storie-card" >
                    <div className="success-img">
                      <div className="magnetic-wrap">
                        <Image className="img-fluid magnetic-item" src={portfolio5} alt="" style="" />
                      </div>
                    </div>
                    <div className="success-content" >
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                      <div className="view-btn">
                        <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                          </svg>
                        </a>

                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>

        </div>
      </div>
    </section>
  )
}