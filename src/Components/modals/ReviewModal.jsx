import { getReviews, postReviews } from "@/lib/fetch/reviews";
import uploadImage from "@/utilities/func/uploadImage";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const ReviewModal = ({ show, setShow, setReviews }) => {
  const [session, setSession] = useState("")
  const [formData, setFormData] = useState({
    platform: "",
    stars: "",
    text: "",
    name: "",
    position: "",
    avatar: "",
  });

  useEffect(() => {
    (async function () {
      const session = await getSession()
      setSession(session)
    })()
  }, [])

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending your review...");
    try {
      const resImg = await uploadImage(formData.avatar)
      const reviewInfo = { ...formData, email: session?.user?.email }
      if (resImg) {
        reviewInfo.avatar = resImg.secure_url
      }
      // Save reviewInfo to your server
      const res = await postReviews(reviewInfo)
      if (res?.status === 201) {
        handleClose()
        toast.success("Reviews sended successfully!")
        toast.dismiss(toastId)
        const response = await getReviews({})
        if(setReviews){
          setReviews(response)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to send review!")
    }
    setFormData({
      platform: "",
      stars: "",
      text: "",
      name: "",
      position: "",
      avatar: "",
    });
    toast.dismiss(toastId)
    handleClose();
  };

  return (
    <>
      <Toaster />
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
