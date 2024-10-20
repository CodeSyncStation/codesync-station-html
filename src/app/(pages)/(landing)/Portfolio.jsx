"use client"
import portfolio3 from "@/assets/images/portfolio/Cooking-Station-On-Demand-Home-Cooked-Food-Delivery.png";
import { default as portfolio2, default as portfolio4, default as portfolio5 } from "@/assets/images/portfolio/Home-Click-Jobs.png";
import portfolio1 from "@/assets/images/portfolio/ZARAS-PROPERTY-Quality-Homes-for-Future-Generations-.png";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import getAnimation from "@/utilities/func/getAnimation";
import 'swiper/css';
import 'swiper/css/pagination';

export default function Portfolio() {

  const projects = [
    {
      id: 1,
      title: "Home Click Jobs",
      image: portfolio1,
      link: "project-details.html",
      category: "Web development"
    },
    {
      id: 2,
      title: "Eco-Friendly Cleaning Solutions",
      image: portfolio2,
      link: "project-details.html",
      category: "Cleaning"
    },
    {
      id: 3,
      title: "Green Energy Solutions",
      image: portfolio3,
      link: "project-details.html",
      category: "Energy"
    },
    {
      id: 4,
      title: "Green Energy Solutions",
      image: portfolio4,
      link: "project-details.html",
      category: "Energy"
    },
    {
      id: 5,
      title: "Green Energy Solutions",
      image: portfolio5,
      link: "project-details.html",
      category: "Energy"
    },
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
                <SwiperSlide key={project.id} >
                  <div className="portfolio-card" data-aos={getAnimation(i)}>
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
                          <HiOutlineArrowRight />
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