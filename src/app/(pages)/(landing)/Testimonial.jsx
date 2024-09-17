// components/TestimonialSlider.js
"use client"
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import Image from 'next/image';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/swiper-bundle.min.css';

const testimonials = [
  {
    platform: 'Trustpilot',
    stars: 5,
    text: '“Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Praesent nec neque at dolor venenatis consectetur.”',
    name: 'Mateo Daniel',
    position: 'CEO at atlantis.com',
    date: 'May 9, 2023',
    time: '10:30 PM',
    avatar: '/path-to-avatar1.png',
  },
  {
    platform: 'Google',
    stars: 5,
    text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.”',
    name: 'Sarah Williams',
    position: 'Founder at google.com',
    date: 'April 18, 2023',
    time: '9:00 PM',
    avatar: '/path-to-avatar2.png',
  },
  {
    platform: 'Trustpilot',
    stars: 5,
    text: '“Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Praesent nec neque at dolor venenatis consectetur.”',
    name: 'Mateo Daniel',
    position: 'CEO at atlantis.com',
    date: 'May 9, 2023',
    time: '10:30 PM',
    avatar: '/path-to-avatar1.png',
  },
  {
    platform: 'Google',
    stars: 5,
    text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.”',
    name: 'Sarah Williams',
    position: 'Founder at google.com',
    date: 'April 18, 2023',
    time: '9:00 PM',
    avatar: '/path-to-avatar2.png',
  },
  // Add more testimonials here
];

const TestimonialSlider = () => {
  return (
    <section id='review' className="testimonial-section">
      <div className="container">
      <div className="section-title">
        <h6 className="sub-title">Feedback</h6>
        <h2 className="title">
          What Our Clients Say
        </h2>
      </div>
    
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          autoplay
          className="testimonial-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <span className="platform">{testimonial.platform}</span>
                  <div className="stars">{'⭐'.repeat(testimonial.stars)}</div>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-footer">
                  <div className="author-info position-relative">
                    <Image src={testimonial.avatar} alt={testimonial.name} className="avatar"  fill/>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <p>{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="testimonial-date">
                    {testimonial.date} <br /> {testimonial.time}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSlider;
