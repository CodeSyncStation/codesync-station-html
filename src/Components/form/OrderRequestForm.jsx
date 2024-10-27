"use client"

import Spinner from '@/Components/ui/MySpinner';
import { postOrders } from '@/lib/fetch/orders';
import { useState } from 'react';
import toast from 'react-hot-toast';
export default function OrderRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    details: '',
    budget: '',
    deadline: '',
    communication: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Saving order request...'); // Show loading toast
    setLoading(true);

    // Basic form validation (example: check if required fields are filled)
    if (!formData.name || !formData.email || !formData.projectType) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      toast.dismiss(toastId);
      return;
    }

    try {
      // Send request to the server
      const data = await postOrders(formData);
      console.log("Order response:", data); // Log the response

      if (data?._id) {
        toast.success("Order request sent successfully!");

        // Optionally, reset the form or redirect user
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          details: '',
          budget: '',
          deadline: '',
          communication: '',
          notes: ''
        });
      } else {
        toast.error("Failed to send order request.");
      }
    } catch (error) {
      // Log the full error message for better debugging
      console.error("Error saving order request:", error);
      // Show error notification
      toast.error(error?.response?.data?.message || "Error saving order request");
    } finally {
      // Reset loading state and remove loading toast
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        {/* First row with two columns */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                placeholder='Write your name here...'
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Write your email here...'
                required
              />
            </div>
          </div>
        </div>

        {/* Second row with two columns */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='Put your Phone number here...'
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="projectType">Project Type</label>
              <select
                className="form-control"
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="">Select Project Type</option>
                <option value="web-development">Web Development</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="seo">SEO & Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="form-group">
          <label htmlFor="details">Tell me about your project</label>
          <textarea
            className="form-control"
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            placeholder='Ex. title, description, deadline, etc.'
          />
        </div>

        {/* Fourth row with two columns */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                className="form-control"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder='Write your budget here...'
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="deadline">When do you need to deliver the project?</label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Fifth row */}
        <div className="form-group">
          <label htmlFor="communication">Preferred Communication Method</label>
          <select
            className="form-control"
            id="communication"
            name="communication"
            value={formData.communication}
            onChange={handleChange}
            required
          >
            <option value="">Select Communication Method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>

        {/* Sixth row */}
        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="animated-btn mt-3">
          {loading ? <Spinner /> : ""} <span className='ms-3'>Send Order Request</span>
        </button>
      </form>
    </>

  );
}
