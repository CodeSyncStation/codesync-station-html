import { FaEnvelope, FaPaperPlane, FaPhone } from "react-icons/fa";
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
                    Address: Hatch Gate Inn,The Hatch, Burghfield, Reading,
                    Berkshire, RG30 3TH.
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
                  <a href="mailto:Info@zarasproperties.co.uk"
                  ><span> Email : Info@zarasproperties.co.uk </span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8" data-aos="fade-left">
            <div className="contact-form">
              <h3 className="form-title">GET IN TOUCH WITH US</h3>
              <div className="row g-4">
                <div className="col-lg-6">
                  <input type="text" placeholder="Name *" />
                </div>
                <div className="col-lg-6">
                  <input type="email" placeholder="E-mail*" />
                </div>
                <div className="col-lg-6">
                  <input type="email" placeholder="Phone Number" />
                </div>
                <div className="col-lg-6">
                  <input type="email" placeholder="Subject *" />
                </div>
                <div className="col-12">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-end w-100">
                    <button
                      className="animated-btn  d-flex justify-content-between align-items-center gap-3"
                    >
                      SEND
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}