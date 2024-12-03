"use client";
import bgImage from "@/assets/images/authentications/jose-vazquez-Q5RBHz9cu1A-unsplash.jpg";
import logo from "@/assets/images/CS LOGO 1-05.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const loadingToastId = toast.loading("Sending reset link ...");
    // if (!validateEmail(email)) {
    //   toast.error("Invalid email address");
    //   toast.dismiss(loadingToastId);
    //   return;
    // }

   

    // try {
    //   const response = await axiosInstance.post(
    //     "/reset_password_request",
    //     {
    //       email
    //     }
    //   );
    //   toast.dismiss(loadingToastId);
    //   toast.success("Check your email for reset password url");
    // } catch (error) {
    //   console.log(error);
    //   toast.dismiss(loadingToastId);

    //   if (error.response) {
    //     if (error.response.status === 404) {
    //       toast.error(error.message);
    //     } else {
    //       if (error.response.data.error) {
    //         toast.error(error.response.data.error)
    //       } else {
    //       toast.error(error.response.data.message);
    //       }

    //     }
    //   } else {
    //     toast.error("An unexpected error occurred. Please try again later.");
    //   }
    // }
  };

  return (
    <div className="authentication">
      <div className="row h-100 g-0 m-0  p-0  ">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="left-part">
            <Image src={bgImage} alt=" not fo" />
          </div>
        </div>
        <div className="col-12 col-lg-6 p-0 ">
          <div className="login-right">
            <div className="login-wrapper">
              <figure className="logo-wrapper">
                <Image
                  src={logo}
                  alt="logo"
                  height={52}
                  width={146}
                />
              </figure>
              <form action="" className="authform">
                <h2 className="form-title">Lost your password?</h2>
                <p className="form-des py-3">
                  Please enter your email address. You will receive a link to
                  create a new password via email.
                </p>
                <div className="input-box mt-3">
                  <label htmlFor="email" className="input-label">
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    id="email"
                    type="email"
                    placeholder="Enter email address "
                  />
                </div>

               
                <button
                  className="animated-btn w-100 mt-3"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
                <div className="d-flex justify-content-center mt-5">
                <Link href="/login" className="backlogin d-flex gap-1">
                  <span className="icon">
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1875 9.5H2.8125" stroke="#090D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.875 4.4375L2.8125 9.5L7.875 14.5625" stroke="#090D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                  </span>
                  Back to log in
                </Link>
                </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
