"use client"

// import axiosInstance from "@/lib/axios";
// import { useGetSingleUserQuery, usePostUserMutation, useUpdateUserMutation } from "@/redux/api/user/userSlice";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_APIHOST;
export default function EmployModal({ show, setShow, isEdit, setIsEdit, iri }) {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [phone, setPhoneNumber] = useState("")
  const [encodedUrl, setEncodedUrl] = useState("")
  const [permission, setPermission] = useState([])
  const [role, setRole] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")



  const handleFile = (e) => {
    setProfileImage(e.target.files[0])
    const reader = new FileReader()
    reader.onloadend = function (e) {
      setEncodedUrl(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const reset = () => {
    setFullName("")
    setEmail("")
    setProfileImage("")
    setPassword("")
    setPhoneNumber("")
    setEncodedUrl("")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!fullName || !email || !password) return toast.error("Please fill all the fields!")
    const toastId = toast.loading("Saving user information...")
    const userInfo = {
      fullName,
      email,
      phone,
      isMod: true,
      roles: permission,
      plainPassword: password,
      profileImage,

    }

    try {
      if (typeof profileImage === "object") {
        const formData = new FormData()
        formData.append('file', profileImage)
        const res = await axiosInstance.post('/media_objects', formData,
          {
            headers: {
              "Content-Type": "multipart/formData"
            }
          }
        )
        userInfo.profileImage = res.data?.contentUrl;
      }
      await createUser({ data: userInfo }).unwrap()
      setShow(false)
      reset()
      toast.dismiss(toastId)
      toast.success("Added employ successfully!")
    } catch (error) {
      toast.error(error["hydra:title"] || "Un expected error!")
    }
    toast.dismiss(toastId)

  }

  const handleUpdate = async e => {
    e.preventDefault()
    if (!fullName || !email) return toast.error("Please fill all the fields!")
    const toastId = toast.loading("Updating user info...")
    const userInfo = {
      fullName,
      email,
      phone,
      isMod: true,
      roles: permission,
      plainPassword: password,
      profileImage,
    }

    try {
      if (typeof profileImage === "object") {
        const formData = new FormData()
        formData.append('file', profileImage)
        const res = await axiosInstance.post('/media_objects', formData, {
          headers: {
            "Content-Type": "multipart/formData"
          }
        })
        userInfo.profileImage = res.data?.contentUrl;

      }
      await updateUserInfo({ iri, data: userInfo }).unwrap()
      setShow(false)
      reset()
      toast.dismiss(toastId)
      toast.success("Updated user Info successfully!")
    } catch (error) {
      toast.error(error["hydra:title"] || "Un expected error!")
    }
    toast.dismiss(toastId)
  }

  const handleDiscard = () => {
    setShow(false)
    setIsEdit(false)
    reset()
  }

  return (
    <Modal
      className="modal fade"
      show={show}
      aria-labelledby="addModeratorModalLabel"
      size="lg"
      animation
    >
      <Modal.Header>
        <h1 className="modal-title fs-5" id="addModeratorModalLabel">
          {!isEdit ? " Add Employee" : " Edit Employee"}
        </h1>
      </Modal.Header>
      <Modal.Body>
        <div className="add-employee-container">
          <div className="section-header">
            <div>
              <label
                htmlFor="upload-employee-image"
                className="upload-employee-image position-relative"
              >
                {encodedUrl ? (
                  <img
                    src={encodedUrl}
                    className="position-absolute w-100 h-100"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.00195 8.25C9.00195 9.49264 7.99459 10.5 6.75195 10.5C5.50931 10.5 4.50195 9.49264 4.50195 8.25C4.50195 7.00736 5.50931 6 6.75195 6C7.99459 6 9.00195 7.00736 9.00195 8.25Z"
                      fill="#8F95B2"
                    />
                    <path
                      d="M3.00195 1.5C1.3451 1.5 0.00195312 2.84315 0.00195312 4.5V19.5C0.00195312 21.1569 1.3451 22.5 3.00195 22.5H21.002C22.6588 22.5 24.002 21.1569 24.002 19.5V4.5C24.002 2.84315 22.6588 1.5 21.002 1.5H3.00195ZM21.002 3C21.8304 3 22.502 3.67157 22.502 4.5V14.25L16.8374 11.3292C16.5486 11.1848 16.1999 11.2414 15.9716 11.4697L10.4064 17.0349L6.41798 14.376C6.12051 14.1777 5.72442 14.2169 5.47162 14.4697L1.50195 18V4.5C1.50195 3.67157 2.17353 3 3.00195 3H21.002Z"
                      fill="#8F95B2"
                    />
                  </svg>
                )}
              </label>
              <input
                type="file"
                name="upload-employee-image"
                id="upload-employee-image"
                accept=".jpg, .png, .jpeg"
                onChange={handleFile}
                hidden
              />
            </div>
            <div className="info">
              <span className="icon pe-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 6.5C0 10.0874 2.912 13 6.5 13C10.0945 13 13 10.0874 13 6.5C13 2.91135 10.0945 0 6.5 0C2.912 0 0 2.91135 0 6.5ZM5.92858 8.96418C5.92858 9.27553 6.18858 9.53618 6.50058 9.53618C6.81258 9.53618 7.06608 9.27553 7.06608 8.96418V6.09118C7.06608 5.77853 6.81258 5.52568 6.50058 5.52568C6.18858 5.52568 5.92858 5.77853 5.92858 6.09118V8.96418ZM6.50699 3.45633C6.18849 3.45633 5.93499 3.71633 5.93499 4.02833C5.93499 4.34033 6.18849 4.59383 6.50049 4.59383C6.81899 4.59383 7.07249 4.34033 7.07249 4.02833C7.07249 3.71633 6.81899 3.45633 6.50699 3.45633Z"
                    fill="#8F95B2"
                  />
                </svg>
              </span>
              Please upload an image of 200 x 200 pixels
            </div>
          </div>
          <div className="section-body">
            <div className="add-employee-form">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Enter full name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control shadow-none"
                  placeholder="Enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="number" className="form-label">
                  Phone number
                </label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  placeholder="Enter phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phone}
                />
              </div>

              {/* role */}
              <div className="mb-3">
                <label htmlFor="number" className="form-label">
                  Role
                </label>
                <select
                  className="form-control shadow-none shadow-none"
                  value={role}
                  onChange={()=> setRole(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {/* password */}
              <div className="mb-3">
                <label htmlhtmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password here "
                    value={password}
                    className="form-control shadow-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="eye"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.44397 0.190941C3.43757 0.184094 3.431 0.177397 3.42427 0.170854C3.31872 0.0682436 3.17763 0.00756262 3.02854 0.00066027L3.02675 0.000579953C3.01784 0.000193387 3.00892 0 3 0C2.85074 0 2.70684 0.0540877 2.5964 0.151702C2.58936 0.157926 2.58247 0.164312 2.57574 0.170854C2.4702 0.273465 2.40778 0.410638 2.40068 0.555587L2.4006 0.557328C2.4002 0.565991 2.4 0.574662 2.4 0.583333C2.4 0.728447 2.45564 0.868351 2.55604 0.975726L4.01005 2.53071C3.28618 2.98233 2.10759 3.82867 1.15113 5.04297C1.15113 5.04297 0.402839 5.99298 0.0514802 6.76357C-0.0172411 6.91428 -0.0171565 7.08623 0.0517131 7.23688C0.0517131 7.23688 0.219253 7.60338 0.561011 8.13109C0.561011 8.13109 1.23438 9.17086 2.12574 10.0375C2.12574 10.0375 5.00148 12.8333 8.99512 12.8333C8.99512 12.8333 10.9809 12.849 12.9032 12.0414L14.556 13.8091C14.6698 13.9307 14.831 14 15 14L15.0025 14C15.1509 13.9994 15.2938 13.9453 15.4036 13.8483C15.5287 13.7377 15.6 13.581 15.6 13.4167L15.6 13.4142C15.5994 13.27 15.5438 13.131 15.444 13.0243L7.44245 4.46709C7.44148 4.46596 7.4405 4.46484 7.43952 4.46372C7.43527 4.45886 7.43094 4.45407 7.42652 4.44934C7.42104 4.44348 7.41545 4.43775 7.40976 4.43214L3.44397 0.190941ZM4.82373 3.4009C3.23798 4.31245 2.10387 5.75229 2.10387 5.75229C1.56187 6.4404 1.26681 6.99695 1.26681 6.99695C1.38875 7.21958 1.57649 7.50947 1.57649 7.50947C2.17812 8.43847 2.97427 9.21249 2.97427 9.21249C5.49853 11.6666 9.0049 11.6667 9.0049 11.6667C10.2067 11.6762 11.3312 11.3632 12.035 11.1129L10.9328 9.93418C10.4997 10.1933 9.8116 10.503 8.99995 10.5C8.99995 10.5 7.88449 10.4999 6.96451 9.88663C6.96451 9.88663 6.04454 9.27335 5.64241 8.2618C5.64241 8.2618 5.24028 7.25024 5.49689 6.19485C5.49689 6.19485 5.66651 5.49727 6.17351 4.8444L4.82373 3.4009ZM6.66471 6.46324C6.73452 6.17612 6.86749 5.92518 7.00041 5.72873L10.1146 9.05921C9.54986 9.33539 9.00008 9.33336 9.00008 9.33336C8.25644 9.33329 7.64312 8.92443 7.64312 8.92443C7.02981 8.51558 6.76172 7.84121 6.76172 7.84121C6.49363 7.16684 6.66471 6.46324 6.66471 6.46324Z"
                          fill="#8F95B2"
                        />
                        <path
                          d="M7.34843 1.29865C7.19149 1.32419 7.0514 1.4093 6.959 1.53526C6.88647 1.63413 6.84749 1.75254 6.84749 1.87398L6.84751 1.8788C6.84777 1.90946 6.85052 1.94005 6.85572 1.97028C6.882 2.12287 6.96954 2.25906 7.09909 2.34889C7.20079 2.41941 7.32258 2.45731 7.44749 2.45731L7.45246 2.45729C7.48399 2.45704 7.51545 2.45437 7.54655 2.4493C8.26766 2.33195 8.99881 2.33335 8.99881 2.33335C12.5015 2.33335 15.0257 4.7875 15.0257 4.7875C15.8219 5.56153 16.4235 6.49051 16.4235 6.49051C16.6102 6.77885 16.7319 7.00064 16.7319 7.00064C16.5793 7.28056 16.3335 7.646 16.3335 7.646C15.6083 8.72412 14.646 9.56126 14.646 9.56126L14.6454 9.56173C14.5182 9.6724 14.445 9.83091 14.445 9.99689C14.445 10.0039 14.4451 10.0108 14.4454 10.0178L14.4455 10.0213L14.4457 10.0248C14.4523 10.1585 14.506 10.286 14.5978 10.3858C14.7116 10.5095 14.8743 10.5802 15.045 10.5802C15.0546 10.5802 15.0641 10.58 15.0737 10.5796C15.2113 10.5732 15.3424 10.5209 15.445 10.4317C16.5256 9.49186 17.3378 8.2845 17.3378 8.2845C17.7486 7.67365 17.9483 7.23693 17.9483 7.23693C18.0172 7.0861 18.0172 6.91393 17.9483 6.76311C17.7807 6.3966 17.439 5.8689 17.439 5.8689C16.7656 4.82913 15.8743 3.96254 15.8743 3.96254C12.9985 1.16668 9.00118 1.16669 9.00118 1.16669C8.16926 1.16509 7.34843 1.29865 7.34843 1.29865Z"
                          fill="#8F95B2"
                        />
                        <path
                          d="M11.3876 6.77699C11.3876 6.77699 11.3134 6.00267 10.7751 5.42745C10.7751 5.42745 10.2367 4.85223 9.45081 4.70745C9.29446 4.67865 9.15629 4.59065 9.06668 4.4628C8.99963 4.36714 8.96338 4.25426 8.96252 4.13851L8.96251 4.13432C8.96251 4.09788 8.96602 4.06152 8.973 4.02572C9.02285 3.76993 9.24102 3.57721 9.50768 3.55343C9.52591 3.5518 9.5442 3.55098 9.56251 3.55098C9.59999 3.55098 9.63738 3.5544 9.6742 3.56118C9.6742 3.56118 10.8543 3.77857 11.6626 4.6423C11.6626 4.6423 12.4709 5.50624 12.5824 6.66873C12.5841 6.68615 12.585 6.70364 12.585 6.72114L12.585 6.72286C12.585 7.02405 12.3491 7.27573 12.0407 7.30368C12.0228 7.3053 12.0048 7.30614 11.9868 7.30619L11.985 7.30619C11.6752 7.30619 11.4163 7.07688 11.3876 6.77699Z"
                          fill="#8F95B2"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.9483 12.2437C20.9483 12.2437 20.7807 12.6207 20.439 13.1634C20.439 13.1634 19.7656 14.2329 18.8743 15.1243C18.8743 15.1243 15.9985 18 12 18C12 18 8.00147 18 5.12574 15.1243C5.12574 15.1243 4.23438 14.2329 3.56101 13.1634C3.56101 13.1634 3.21925 12.6206 3.05171 12.2437C2.98276 12.0885 2.98276 11.9115 3.05171 11.7563C3.05171 11.7563 3.21925 11.3794 3.56101 10.8366C3.56101 10.8366 4.23438 9.76709 5.12574 8.87574C5.12574 8.87574 8.00148 6 12 6C12 6 15.9985 6 18.8743 8.87574C18.8743 8.87574 19.7656 9.76709 20.439 10.8366C20.439 10.8366 20.7807 11.3793 20.9483 11.7563C21.0172 11.9115 21.0172 12.0885 20.9483 12.2437ZM19.4235 12.5241C19.4235 12.5241 19.61 12.2279 19.7315 12C19.7315 12 19.61 11.7721 19.4235 11.4759C19.4235 11.4759 18.8219 10.5204 18.0257 9.72426C18.0257 9.72426 15.5015 7.2 12 7.2C12 7.2 8.49853 7.2 5.97426 9.72426C5.97426 9.72426 5.17812 10.5204 4.57649 11.4759C4.57649 11.4759 4.39002 11.7721 4.26847 12C4.26847 12 4.39002 12.2279 4.57649 12.5241C4.57649 12.5241 5.17812 13.4796 5.97426 14.2757C5.97426 14.2757 8.49853 16.8 12 16.8C12 16.8 15.5015 16.8 18.0257 14.2757C18.0257 14.2757 18.8219 13.4796 19.4235 12.5241Z"
                          fill="#8F95B2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 8.4C12 8.4 13.4912 8.4 14.5456 9.45442C14.5456 9.45442 15.6 10.5088 15.6 12C15.6 12 15.6 13.4912 14.5456 14.5456C14.5456 14.5456 13.4912 15.6 12 15.6C12 15.6 10.5088 15.6 9.45442 14.5456C9.45442 14.5456 8.4 13.4912 8.4 12C8.4 12 8.4 10.5088 9.45442 9.45442C9.45442 9.45442 10.5088 8.4 12 8.4ZM12 9.6C12 9.6 11.0059 9.6 10.3029 10.3029C10.3029 10.3029 9.6 11.0059 9.6 12C9.6 12 9.6 12.9941 10.3029 13.6971C10.3029 13.6971 11.0059 14.4 12 14.4C12 14.4 12.9941 14.4 13.6971 13.6971C13.6971 13.6971 14.4 12.9941 14.4 12C14.4 12 14.4 11.0059 13.6971 10.3029C13.6971 10.3029 12.9941 9.6 12 9.6Z"
                          fill="#8F95B2"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              {/*confirm password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                 Confirm Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter confirm password here "
                    value={confirmPassword}
                    className="form-control shadow-none"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="eye"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.44397 0.190941C3.43757 0.184094 3.431 0.177397 3.42427 0.170854C3.31872 0.0682436 3.17763 0.00756262 3.02854 0.00066027L3.02675 0.000579953C3.01784 0.000193387 3.00892 0 3 0C2.85074 0 2.70684 0.0540877 2.5964 0.151702C2.58936 0.157926 2.58247 0.164312 2.57574 0.170854C2.4702 0.273465 2.40778 0.410638 2.40068 0.555587L2.4006 0.557328C2.4002 0.565991 2.4 0.574662 2.4 0.583333C2.4 0.728447 2.45564 0.868351 2.55604 0.975726L4.01005 2.53071C3.28618 2.98233 2.10759 3.82867 1.15113 5.04297C1.15113 5.04297 0.402839 5.99298 0.0514802 6.76357C-0.0172411 6.91428 -0.0171565 7.08623 0.0517131 7.23688C0.0517131 7.23688 0.219253 7.60338 0.561011 8.13109C0.561011 8.13109 1.23438 9.17086 2.12574 10.0375C2.12574 10.0375 5.00148 12.8333 8.99512 12.8333C8.99512 12.8333 10.9809 12.849 12.9032 12.0414L14.556 13.8091C14.6698 13.9307 14.831 14 15 14L15.0025 14C15.1509 13.9994 15.2938 13.9453 15.4036 13.8483C15.5287 13.7377 15.6 13.581 15.6 13.4167L15.6 13.4142C15.5994 13.27 15.5438 13.131 15.444 13.0243L7.44245 4.46709C7.44148 4.46596 7.4405 4.46484 7.43952 4.46372C7.43527 4.45886 7.43094 4.45407 7.42652 4.44934C7.42104 4.44348 7.41545 4.43775 7.40976 4.43214L3.44397 0.190941ZM4.82373 3.4009C3.23798 4.31245 2.10387 5.75229 2.10387 5.75229C1.56187 6.4404 1.26681 6.99695 1.26681 6.99695C1.38875 7.21958 1.57649 7.50947 1.57649 7.50947C2.17812 8.43847 2.97427 9.21249 2.97427 9.21249C5.49853 11.6666 9.0049 11.6667 9.0049 11.6667C10.2067 11.6762 11.3312 11.3632 12.035 11.1129L10.9328 9.93418C10.4997 10.1933 9.8116 10.503 8.99995 10.5C8.99995 10.5 7.88449 10.4999 6.96451 9.88663C6.96451 9.88663 6.04454 9.27335 5.64241 8.2618C5.64241 8.2618 5.24028 7.25024 5.49689 6.19485C5.49689 6.19485 5.66651 5.49727 6.17351 4.8444L4.82373 3.4009ZM6.66471 6.46324C6.73452 6.17612 6.86749 5.92518 7.00041 5.72873L10.1146 9.05921C9.54986 9.33539 9.00008 9.33336 9.00008 9.33336C8.25644 9.33329 7.64312 8.92443 7.64312 8.92443C7.02981 8.51558 6.76172 7.84121 6.76172 7.84121C6.49363 7.16684 6.66471 6.46324 6.66471 6.46324Z"
                          fill="#8F95B2"
                        />
                        <path
                          d="M7.34843 1.29865C7.19149 1.32419 7.0514 1.4093 6.959 1.53526C6.88647 1.63413 6.84749 1.75254 6.84749 1.87398L6.84751 1.8788C6.84777 1.90946 6.85052 1.94005 6.85572 1.97028C6.882 2.12287 6.96954 2.25906 7.09909 2.34889C7.20079 2.41941 7.32258 2.45731 7.44749 2.45731L7.45246 2.45729C7.48399 2.45704 7.51545 2.45437 7.54655 2.4493C8.26766 2.33195 8.99881 2.33335 8.99881 2.33335C12.5015 2.33335 15.0257 4.7875 15.0257 4.7875C15.8219 5.56153 16.4235 6.49051 16.4235 6.49051C16.6102 6.77885 16.7319 7.00064 16.7319 7.00064C16.5793 7.28056 16.3335 7.646 16.3335 7.646C15.6083 8.72412 14.646 9.56126 14.646 9.56126L14.6454 9.56173C14.5182 9.6724 14.445 9.83091 14.445 9.99689C14.445 10.0039 14.4451 10.0108 14.4454 10.0178L14.4455 10.0213L14.4457 10.0248C14.4523 10.1585 14.506 10.286 14.5978 10.3858C14.7116 10.5095 14.8743 10.5802 15.045 10.5802C15.0546 10.5802 15.0641 10.58 15.0737 10.5796C15.2113 10.5732 15.3424 10.5209 15.445 10.4317C16.5256 9.49186 17.3378 8.2845 17.3378 8.2845C17.7486 7.67365 17.9483 7.23693 17.9483 7.23693C18.0172 7.0861 18.0172 6.91393 17.9483 6.76311C17.7807 6.3966 17.439 5.8689 17.439 5.8689C16.7656 4.82913 15.8743 3.96254 15.8743 3.96254C12.9985 1.16668 9.00118 1.16669 9.00118 1.16669C8.16926 1.16509 7.34843 1.29865 7.34843 1.29865Z"
                          fill="#8F95B2"
                        />
                        <path
                          d="M11.3876 6.77699C11.3876 6.77699 11.3134 6.00267 10.7751 5.42745C10.7751 5.42745 10.2367 4.85223 9.45081 4.70745C9.29446 4.67865 9.15629 4.59065 9.06668 4.4628C8.99963 4.36714 8.96338 4.25426 8.96252 4.13851L8.96251 4.13432C8.96251 4.09788 8.96602 4.06152 8.973 4.02572C9.02285 3.76993 9.24102 3.57721 9.50768 3.55343C9.52591 3.5518 9.5442 3.55098 9.56251 3.55098C9.59999 3.55098 9.63738 3.5544 9.6742 3.56118C9.6742 3.56118 10.8543 3.77857 11.6626 4.6423C11.6626 4.6423 12.4709 5.50624 12.5824 6.66873C12.5841 6.68615 12.585 6.70364 12.585 6.72114L12.585 6.72286C12.585 7.02405 12.3491 7.27573 12.0407 7.30368C12.0228 7.3053 12.0048 7.30614 11.9868 7.30619L11.985 7.30619C11.6752 7.30619 11.4163 7.07688 11.3876 6.77699Z"
                          fill="#8F95B2"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.9483 12.2437C20.9483 12.2437 20.7807 12.6207 20.439 13.1634C20.439 13.1634 19.7656 14.2329 18.8743 15.1243C18.8743 15.1243 15.9985 18 12 18C12 18 8.00147 18 5.12574 15.1243C5.12574 15.1243 4.23438 14.2329 3.56101 13.1634C3.56101 13.1634 3.21925 12.6206 3.05171 12.2437C2.98276 12.0885 2.98276 11.9115 3.05171 11.7563C3.05171 11.7563 3.21925 11.3794 3.56101 10.8366C3.56101 10.8366 4.23438 9.76709 5.12574 8.87574C5.12574 8.87574 8.00148 6 12 6C12 6 15.9985 6 18.8743 8.87574C18.8743 8.87574 19.7656 9.76709 20.439 10.8366C20.439 10.8366 20.7807 11.3793 20.9483 11.7563C21.0172 11.9115 21.0172 12.0885 20.9483 12.2437ZM19.4235 12.5241C19.4235 12.5241 19.61 12.2279 19.7315 12C19.7315 12 19.61 11.7721 19.4235 11.4759C19.4235 11.4759 18.8219 10.5204 18.0257 9.72426C18.0257 9.72426 15.5015 7.2 12 7.2C12 7.2 8.49853 7.2 5.97426 9.72426C5.97426 9.72426 5.17812 10.5204 4.57649 11.4759C4.57649 11.4759 4.39002 11.7721 4.26847 12C4.26847 12 4.39002 12.2279 4.57649 12.5241C4.57649 12.5241 5.17812 13.4796 5.97426 14.2757C5.97426 14.2757 8.49853 16.8 12 16.8C12 16.8 15.5015 16.8 18.0257 14.2757C18.0257 14.2757 18.8219 13.4796 19.4235 12.5241Z"
                          fill="#8F95B2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 8.4C12 8.4 13.4912 8.4 14.5456 9.45442C14.5456 9.45442 15.6 10.5088 15.6 12C15.6 12 15.6 13.4912 14.5456 14.5456C14.5456 14.5456 13.4912 15.6 12 15.6C12 15.6 10.5088 15.6 9.45442 14.5456C9.45442 14.5456 8.4 13.4912 8.4 12C8.4 12 8.4 10.5088 9.45442 9.45442C9.45442 9.45442 10.5088 8.4 12 8.4ZM12 9.6C12 9.6 11.0059 9.6 10.3029 10.3029C10.3029 10.3029 9.6 11.0059 9.6 12C9.6 12 9.6 12.9941 10.3029 13.6971C10.3029 13.6971 11.0059 14.4 12 14.4C12 14.4 12.9941 14.4 13.6971 13.6971C13.6971 13.6971 14.4 12.9941 14.4 12C14.4 12 14.4 11.0059 13.6971 10.3029C13.6971 10.3029 12.9941 9.6 12 9.6Z"
                          fill="#8F95B2"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="outline-secondary add-employee fz-12"
          onClick={handleDiscard}
        >
          Discard
        </button>
        {isEdit ? (
          <button className="btn-dashboard  fz-12 py-2" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="btn-dashboard fz-12 py-2" onClick={handleSubmit}>
            Save
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}