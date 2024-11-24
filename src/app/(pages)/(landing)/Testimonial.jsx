// components/TestimonialSlider.js
"use client"

// Import Swiper styles
import { getReviews } from '@/lib/fetch/reviews';
import getAnimation from '@/utilities/func/getAnimation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';

// const testimonials = [
//   {
//     platform: 'Trustpilot',
//     stars: 5,
//     text: '“Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Praesent nec neque at dolor venenatis consectetur.”',
//     name: 'Mateo Daniel',
//     position: 'CEO at atlantis.com',
//     date: 'May 9, 2023',
//     time: '10:30 PM',
//     avatar: '/path-to-avatar1.png',
//   },
//   {
//     platform: 'Google',
//     stars: 5,
//     text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.”',
//     name: 'Sarah Williams',
//     position: 'Founder at google.com',
//     date: 'April 18, 2023',
//     time: '9:00 PM',
//     avatar: '/path-to-avatar2.png',
//   },
//   {
//     platform: 'Trustpilot',
//     stars: 5,
//     text: '“Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Praesent nec neque at dolor venenatis consectetur.”',
//     name: 'Mateo Daniel',
//     position: 'CEO at atlantis.com',
//     date: 'May 9, 2023',
//     time: '10:30 PM',
//     avatar: '/path-to-avatar1.png',
//   },
//   {
//     platform: 'Google',
//     stars: 5,
//     text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.”',
//     name: 'Sarah Williams',
//     position: 'Founder at google.com',
//     date: 'April 18, 2023',
//     time: '9:00 PM',
//     avatar: '/path-to-avatar2.png',
//   },
//   // Add more testimonials here
// ];

const TestimonialSlider = () => {

  const [testimonials, setTestimonial] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async function () {
      const data = await getReviews({ status: "approved" })
      setTestimonial(data)
      setLoading(false)
    })()
  }, [])

  let content = null;

  if (loading && testimonials.length === 0) {
    content = <div className="text-center" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  }

  if (!loading && testimonials.length === 0) {
    content = <div className="text-center">
      <p>No reviews found.</p>
    </div>
  }

  if (!loading && testimonials.length > 0) {
    content = <Swiper
      modules={[Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      // centeredSlides={true}
      autoplay
      className="testimonial-slider"
      breakpoints={{
        992: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index} >
          <div className="testimonial-card" data-aos={getAnimation(index)} data-aos-delay={index + "00"}>
            <div className="testimonial-header">
              <span className="platform">{testimonial.platform}</span>
              <div className="stars">{'⭐'.repeat(testimonial.stars)}</div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-footer">
              <div className="author-info position-relative">
                {
                  testimonial.avatar && <Image src={testimonial.avatar} alt={testimonial.name} className="avatar" fill />
                }
                
                <div>
                  <strong>{testimonial.name}</strong>
                  <p>{testimonial.position}</p>
                </div>
              </div>
              <p className="testimonial-date">
                {new Date(testimonial.date).toLocaleDateString()} <br /> {testimonial.time}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  }

  return (
    <section id='testimonials' className="testimonial-section">
      <div className="container">
        <div className="section-title">
          <h6 className="sub-title">Feedback</h6>
          <h2 className="title">
            What Our Clients Say
          </h2>
        </div>
        {content}

      </div>
    </section>
  );
};

export default TestimonialSlider;
