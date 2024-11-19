import { postReviews } from "@/lib/fetch/reviews";
import uploadImage from "@/utilities/func/uploadImage";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const ReviewModal = ({ show, setShow }) => {
  const [formData, setFormData] = useState({
    platform: "",
    stars: "",
    text: "",
    name: "",
    position: "",
    avatar: "",
  });

  console.log(formData)

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.files[0])
    if(name === "avatar"){
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const resImg = await uploadImage(formData.avatar)
      const reviewInfo =  {...formData}
      if(resImg){
        reviewInfo.avatar = resImg.secure_url
      }
      // Save reviewInfo to your server
      const res = await postReviews(reviewInfo)
      if(res?.status === 200){
        handleClose()
        toast.success()
      }
    } catch (error) {

    }
    setFormData({
      platform: "",
      stars: "",
      text: "",
      name: "",
      position: "",
      avatar: "",
    });
    handleClose();
  };

  return (
    <>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="platform">
              <Form.Label>Platform</Form.Label>
              <Form.Select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
              >
                <option value="">Select a platform</option>
                <option value="Trustpilot">Trustpilot</option>
                <option value="Google">Google</option>
                <option value="Yelp">Yelp</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="stars">
              <Form.Label>Stars</Form.Label>
              <Form.Control
                type="number"
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                min="1"
                max="5"
                placeholder="1-5"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Review Text</Form.Label>
              <Form.Control
                as="textarea"
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows={3}
                placeholder="Write your review here..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g., CEO at Example.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
              <Form.Label>Avatar URL (optional)</Form.Label>
              <input className="form-control" type="file" id="formFile" name="avatar" onChange={handleChange} />

            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
              </Button>
              <button className="btn-dashboard" type="submit">
                Submit Review
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewModal;
