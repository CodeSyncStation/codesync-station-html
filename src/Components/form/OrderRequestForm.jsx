"use client"

import { useState } from 'react';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Request Submitted:", formData);
    // You can add logic here to send the form data to your backend or API
  };

  return (
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
          <label htmlFor="details">Project Details</label>
          <textarea
            className="form-control"
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
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
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="deadline">Project Deadline</label>
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

        <button type="submit" className="animated-btn mt-3">Send Order Request</button>
      </form>
  );
}
