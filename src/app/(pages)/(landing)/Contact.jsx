import ContactForm from "@/Components/form/ContactForm";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { PiBuildingOffice } from "react-icons/pi";
export default function Contact() {

  return (
    <section
      className="contactus"
      id="contact"
    >

      <div className="container">
        <div className="section-title">
          <h6 className="sub-title">Get in Touch</h6>
          <h2 className="title">
            We’re here to answer your questions and bring your ideas to life
          </h2>
        </div>

        <div className="row g-4">
          <div className="col-lg-4" data-aos="fade-right">
            <div className="left-info">
              <h4 className="title">CALL US</h4>
              <p className="des">
              Whether you have a project in mind, need support, or just want to learn more about our services, feel free to reach out. We&apos;re ready to collaborate and turn your ideas into reality.
              </p>
              <ul className="locations">
                <li>
                  <div className="icon">
                    <PiBuildingOffice />
                  </div>
                  <span>
                    Address:  House No. 38, Road No. 3, Block-D/2, Section-10, Mirpur, Dhaka
                  </span>
                </li>
                <li>
                  <div className="icon">
                    <FaPhone />
                  </div>
                  <a href="tel:+447738940597">
                    <span> Phone : +447738940597 </span>
                  </a>
                </li>

                <li>
                  <div className="icon">
                    <FaEnvelope />
                  </div>
                  <a href="mailto:Info@codesync.co.uk"
                  ><span> Email : Info@codesync.co.uk </span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8" data-aos="fade-left">
            <ContactForm/>
          </div>
        </div>
      </div>
    </section>
  )
}