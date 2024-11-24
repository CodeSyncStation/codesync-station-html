"use client"

import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";


export default function ContactForm() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const subject = e.target.subject.value;

    const formData = { name, email, message, subject }

    const response = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Message sent successfully",
        showConfirmButton: false,
        timer: 1500
      });
      e.target.reset()
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  return (
    <div className="contact-form">
      <h3 className="form-title">GET IN TOUCH WITH US</h3>
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-6">
          <input type="text" placeholder="Name *" name="name" required />
        </div>
        <div className="col-lg-6">
          <input type="email" placeholder="E-mail*" name="email" required/>
        </div>
        <div className="col-lg-6">
          <input type="number" placeholder="Phone Number" name="number" />
        </div>
        <div className="col-lg-6">
          <input type="text" placeholder="Subject *" name="subject" required/>
        </div>
        <div className="col-12">
          <textarea
            name="message"
            cols="30"
            rows="5"
            placeholder="Message"
            required
          ></textarea>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-end w-100">
            <button
              className="animated-btn  d-flex justify-content-between align-items-center gap-3"
              type="submit"
            >
              SEND
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}