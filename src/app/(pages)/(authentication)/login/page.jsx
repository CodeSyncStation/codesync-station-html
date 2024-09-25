"use client";
import image from "@/assets/images/authentications/jose-vazquez-Q5RBHz9cu1A-unsplash.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
const Login = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("kawsarbinjahangir@gmail.com");
  const [password, setPassword] = useState("111111");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Define the validatePassword function
  function validatePassword(password) {
    return password.length >= 6;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Logging in ...");
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      toast.dismiss(loadingToastId);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      toast.dismiss(loadingToastId);
      return;
    }

    try {
      // const response = await axiosInstance.post("/authentication_token", {
      //   email,
      //   password,
      // });
      // localStorage.setItem("token", response.data.token);
      toast.dismiss(loadingToastId);
      toast.success("Login Successful");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToastId);

      if (error.response) {
        if (error.response.status === 404) {
          // If the status code is 404, show a specific toast message
          toast.error(error.message);
        } else {
          // For other status codes, show the error message from the server
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="authentication">
      <div className="row h-100 g-0 m-0  p-0  ">
        <div className="col-lg-6 d-none  d-lg-block ">
          <div className="left-part">
            <Image src={image} alt=" not fo" />
          </div>
        </div>
        <div className="col-12 col-lg-6 p-0 ">
          <div className="login-right">
            <div className="login-wrapper">
              <figure className="logo-wrapper">
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  height={52}
                  width={146}
                />
              </figure>
              <form action="" className="authform">
                <h2 className="form-title">Hi, Welcome Back!</h2>
                <div className="input-box mt-3">
                  <label htmlFor="email" className="input-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email address "
                  />
                </div>
                <div className="input-box mt-3">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter password here "
                  />
                  <span className="eye" onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20.9483 12.2437C20.9483 12.2437 20.7807 12.6207 20.439 13.1634C20.439 13.1634 19.7656 14.2329 18.8743 15.1243C18.8743 15.1243 15.9985 18 12 18C12 18 8.00147 18 5.12574 15.1243C5.12574 15.1243 4.23438 14.2329 3.56101 13.1634C3.56101 13.1634 3.21925 12.6206 3.05171 12.2437C2.98276 12.0885 2.98276 11.9115 3.05171 11.7563C3.05171 11.7563 3.21925 11.3794 3.56101 10.8366C3.56101 10.8366 4.23438 9.76709 5.12574 8.87574C5.12574 8.87574 8.00148 6 12 6C12 6 15.9985 6 18.8743 8.87574C18.8743 8.87574 19.7656 9.76709 20.439 10.8366C20.439 10.8366 20.7807 11.3793 20.9483 11.7563C21.0172 11.9115 21.0172 12.0885 20.9483 12.2437ZM19.4235 12.5241C19.4235 12.5241 19.61 12.2279 19.7315 12C19.7315 12 19.61 11.7721 19.4235 11.4759C19.4235 11.4759 18.8219 10.5204 18.0257 9.72426C18.0257 9.72426 15.5015 7.2 12 7.2C12 7.2 8.49853 7.2 5.97426 9.72426C5.97426 9.72426 5.17812 10.5204 4.57649 11.4759C4.57649 11.4759 4.39002 11.7721 4.26847 12C4.26847 12 4.39002 12.2279 4.57649 12.5241C4.57649 12.5241 5.17812 13.4796 5.97426 14.2757C5.97426 14.2757 8.49853 16.8 12 16.8C12 16.8 15.5015 16.8 18.0257 14.2757C18.0257 14.2757 18.8219 13.4796 19.4235 12.5241Z"
                          fill="#8F95B2"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 8.4C12 8.4 13.4912 8.4 14.5456 9.45442C14.5456 9.45442 15.6 10.5088 15.6 12C15.6 12 15.6 13.4912 14.5456 14.5456C14.5456 14.5456 13.4912 15.6 12 15.6C12 15.6 10.5088 15.6 9.45442 14.5456C9.45442 14.5456 8.4 13.4912 8.4 12C8.4 12 8.4 10.5088 9.45442 9.45442C9.45442 9.45442 10.5088 8.4 12 8.4ZM12 9.6C12 9.6 11.0059 9.6 10.3029 10.3029C10.3029 10.3029 9.6 11.0059 9.6 12C9.6 12 9.6 12.9941 10.3029 13.6971C10.3029 13.6971 11.0059 14.4 12 14.4C12 14.4 12.9941 14.4 13.6971 13.6971C13.6971 13.6971 14.4 12.9941 14.4 12C14.4 12 14.4 11.0059 13.6971 10.3029C13.6971 10.3029 12.9941 9.6 12 9.6Z"
                          fill="#8F95B2"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-end mt-3 ">
                  <Link href="/forgot-password" className="forgot">
                    Forgot password?
                  </Link>
                </div>
                <button
                  className="btn-signin w-100 mt-3"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
                <p className="dont mt-3">
                  Don’t have an account? <Link href="/register">Register</Link>
                </p>
              </form>
            </div>
            <figure class="topicon">
              <svg
                width="129"
                height="235"
                viewBox="0 0 129 235"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 -305H400L451 235H51L0 -305Z" fill="#EAECF0" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M49.3168 28.8885C49.2576 27.8289 48.3811 27 47.3199 27H25.1133C23.9649 27 23.0524 27.9649 23.1165 29.1115L24.5561 54.8885C24.6202 56.0351 23.7076 57 22.5592 57H3.11335C1.96494 57 1.05242 57.9649 1.11646 59.1115L2.68029 87.1115C2.73947 88.1711 3.61594 89 4.67718 89H26.8837C28.0321 89 28.9446 88.0351 28.8806 86.8885L27.4409 61.1115C27.3769 59.9649 28.2894 59 29.4378 59H48.8837C50.0321 59 50.9446 58.0351 50.8806 56.8885L49.3168 28.8885Z"
                  fill="#EA7462"
                />
              </svg>
            </figure>
            <figure class="bottomicon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="125"
                height="242"
                viewBox="0 0 125 242"
                fill="none"
              >
                <path d="M-339 17H61L112 557H-288L-339 17Z" fill="#EAECF0" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M122.462 3.78076C122.346 1.65999 120.592 0 118.468 0H86.2249C83.9296 0 82.1051 1.9274 82.2309 4.21925L84.2379 40.7808C84.3637 43.0726 82.5392 45 80.2439 45H34.2267C31.9307 45 30.106 46.9285 30.2328 49.2209L33.9392 116.221C34.0565 118.341 35.8098 120 37.9331 120H90.7719C93.0679 120 94.8926 118.072 94.7658 115.779L91.3605 54.2209C91.2336 51.9285 93.0584 50 95.3543 50H120.774C123.069 50 124.893 48.0726 124.768 45.7808L122.462 3.78076Z"
                  fill="#93DCDA"
                />
              </svg>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
