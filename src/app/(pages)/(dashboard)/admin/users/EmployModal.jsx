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

  const handlePermission = str => {
    if (permission.includes(str)) {
      setPermission(permission.filter(p => p !== str))
    } else {
      setPermission([...permission, str])
    }
  }


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
                  First name
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
            </div>
          </div>
          <div className="section-footer">
            <h3 className="footer-title">Permissions</h3>
            <div className="permission-option">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M6.125 12.25C6.125 12.25 5.25 12.25 5.25 11.375C5.25 10.5 6.125 7.875 9.625 7.875C13.125 7.875 14 10.5 14 11.375C14 12.25 13.125 12.25 13.125 12.25H6.125Z"
                    fill="#1E293B"
                  />
                  <path
                    d="M9.625 7C11.0747 7 12.25 5.82475 12.25 4.375C12.25 2.92525 11.0747 1.75 9.625 1.75C8.17525 1.75 7 2.92525 7 4.375C7 5.82475 8.17525 7 9.625 7Z"
                    fill="#1E293B"
                  />
                  <path
                    d="M4.56432 12.25C4.44112 12.0014 4.375 11.7067 4.375 11.375C4.375 10.189 4.96917 8.96923 6.06894 8.11997C5.58783 7.96608 5.02696 7.875 4.375 7.875C0.875 7.875 0 10.5 0 11.375C0 12.25 0.875 12.25 0.875 12.25H4.56432Z"
                    fill="#1E293B"
                  />
                  <path
                    d="M3.9375 7C5.14562 7 6.125 6.02062 6.125 4.8125C6.125 3.60438 5.14562 2.625 3.9375 2.625C2.72938 2.625 1.75 3.60438 1.75 4.8125C1.75 6.02062 2.72938 7 3.9375 7Z"
                    fill="#1E293B"
                  />
                </svg>
              </span>
              <div className="flex-lg-1">
                <h4 className="footer-subtitle">Moderator</h4>
                <p className="des">
                  Manage course materials, such as uploading files, creating
                  assignments, and organizing content.
                </p>
              </div>
              <div className="form-check form-switch">
                <label class="switch">
                  <input
                    type="checkbox"
                    class="checkbox"
                    onChange={() => handlePermission("ROLE_MODERATOR")}
                    checked={permission.includes("ROLE_MODERATOR")}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div className="permission-option">
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </span>
              <div className="flex-lg-1">
                <h4 className="footer-subtitle">Editor</h4>
                <p className="des">
                  Monitor user activity and progress within courses.
                </p>
              </div>
              <div className="form-check form-switch">
                <label class="switch">
                  <input
                    type="checkbox"
                    class="checkbox"
                    role="switch"
                    onChange={() => handlePermission("ROLE_EDITOR")}
                    checked={permission.includes("ROLE_EDITOR")}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            {/* <div className="permission-option">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.1875 3.0625C1.94588 3.0625 1.75 2.86662 1.75 2.625C1.75 2.38338 1.94588 2.1875 2.1875 2.1875H11.8125C12.0541 2.1875 12.25 2.38338 12.25 2.625C12.25 2.86662 12.0541 3.0625 11.8125 3.0625H2.1875Z" fill="#1E293B" />
                  <path d="M3.9375 1.3125C3.69588 1.3125 3.5 1.11662 3.5 0.875C3.5 0.633375 3.69588 0.4375 3.9375 0.4375H10.0625C10.3041 0.4375 10.5 0.633375 10.5 0.875C10.5 1.11662 10.3041 1.3125 10.0625 1.3125H3.9375Z" fill="#1E293B" />
                  <path d="M0 11.375C0 12.0999 0.587626 12.6875 1.3125 12.6875H12.6875C13.4124 12.6875 14 12.0999 14 11.375V5.25C14 4.52513 13.4124 3.9375 12.6875 3.9375H1.3125C0.587626 3.9375 0 4.52513 0 5.25V11.375ZM5.47541 5.74234C5.61452 5.66525 5.78451 5.66971 5.91937 5.754L9.41937 7.9415C9.54729 8.02145 9.625 8.16165 9.625 8.3125C9.625 8.46335 9.54729 8.60355 9.41937 8.6835L5.91937 10.871C5.78451 10.9553 5.61452 10.9598 5.47541 10.8827C5.33631 10.8056 5.25 10.659 5.25 10.5V6.125C5.25 5.96596 5.33631 5.81944 5.47541 5.74234Z" fill="#1E293B" />
                </svg>
              </span>
              <div className="flex-lg-1">
                <h4 className="footer-subtitle">
                  Content Moderation
                </h4>
                <p className="des">
                  Review and approve user-generated content, such as forum posts, comments, or assignments.
                </p>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
              </div>
            </div>
            <div className="permission-option">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13.9866 7.43748H7.18122L2.36923 12.2495C3.60328 13.3389 5.22444 14 7 14C10.7191 14 13.7607 11.0997 13.9866 7.43748Z" fill="#1E293B" />
                  <path d="M1.75051 11.6307C0.66107 10.3967 0 8.77554 0 6.99998C0 3.28092 2.90031 0.239264 6.5625 0.0134277V6.81876L1.75051 11.6307Z" fill="#1E293B" />
                  <path d="M7.4375 0.0134277V6.56248H13.9866C13.7696 3.04497 10.955 0.230341 7.4375 0.0134277Z" fill="#1E293B" />
                </svg>
              </span>
              <div className="flex-lg-1">
                <h4 className="footer-subtitle">
                  Reporting and Analytics
                </h4>
                <p className="des">
                  Access reports on user activity, course completion rates, and performance metrics
                </p>
              </div>

              <div className="form-check form-switch">
                <input className="form-check-input" role="switch" id="flexSwitchCheckChecked" type="checkbox" checked="" />
              </div>
            </div>
            <div className="permission-option">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.22908 0.919088C7.86788 -0.306363 6.13212 -0.306362 5.77092 0.919088L5.68333 1.21628C5.45254 1.99929 4.55818 2.36974 3.84132 1.97926L3.56924 1.83106C2.44731 1.21994 1.21994 2.44731 1.83106 3.56924L1.97926 3.84132C2.36974 4.55819 1.99929 5.45254 1.21628 5.68333L0.919088 5.77092C-0.306363 6.13212 -0.306362 7.86788 0.919088 8.22908L1.21628 8.31668C1.99929 8.54747 2.36974 9.44182 1.97926 10.1587L1.83106 10.4308C1.21994 11.5527 2.44731 12.7801 3.56924 12.1689L3.84132 12.0207C4.55818 11.6303 5.45254 12.0007 5.68333 12.7837L5.77092 13.0809C6.13212 14.3064 7.86788 14.3064 8.22908 13.0809L8.31667 12.7837C8.54746 12.0007 9.44182 11.6303 10.1587 12.0207L10.4308 12.1689C11.5527 12.7801 12.7801 11.5527 12.1689 10.4308L12.0207 10.1587C11.6303 9.44182 12.0007 8.54747 12.7837 8.31668L13.0809 8.22908C14.3064 7.86788 14.3064 6.13212 13.0809 5.77092L12.7837 5.68333C12.0007 5.45254 11.6303 4.55818 12.0207 3.84132L12.1689 3.56924C12.7801 2.44731 11.5527 1.21994 10.4308 1.83106L10.1587 1.97926C9.44182 2.36974 8.54746 1.99929 8.31667 1.21628L8.22908 0.919088ZM7 9.56271C5.58465 9.56271 4.43729 8.41535 4.43729 7C4.43729 5.58465 5.58465 4.43729 7 4.43729C8.41535 4.43729 9.56271 5.58465 9.56271 7C9.56271 8.41535 8.41535 9.56271 7 9.56271Z" fill="#1E293B" />
                </svg>
              </span>
              <div className="flex-lg-1">
                <h4 className="footer-subtitle">
                  Technical Support
                </h4>
                <p className="des">
                  Coordinate with the LMS administrator for more complex technical issues.
                </p>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
              </div>
            </div> */}
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