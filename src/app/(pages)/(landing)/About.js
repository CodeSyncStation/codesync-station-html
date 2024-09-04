import aboutImg10 from "@/assets/images/about/10.png";
import Image from "next/image";

export default function About() {
  return (
    <div className="about-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 mb-4 mb-lg-0 "
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="1500"
          >
            <div className="about-thumb-inner">
              <Image className="main-img" src={aboutImg10} alt="img" />
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="section-title mb-0">
              <h6 className="sub-title">ABOUT US</h6>
              <h2 className="title">
                Empowering businesses with SaaS technology
              </h2>
              <p className="content mb-4">
                You can access SaaS applications through a web browser or mobile
                app, as long as you have an internet connection.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <ul className="single-list-inner mb-3">
                    <li>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                      </svg>{" "}
                      Mistakes To Avoid to the
                    </li>
                    <li>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                      </svg>{" "}
                      Your Startup industry stan
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="single-list-inner mb-3">
                    <li>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                      </svg>{" "}
                      Mistakes To Avoid to the
                    </li>
                    <li>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                      </svg>{" "}
                      Your Startup industry stan
                    </li>
                  </ul>
                </div>
              </div>
              <p className="content">
                SaaS providers typically invest heavily in security measures to
                protect customer data, such as encryption and multi-factor
                authentication. However, it is important to research and choose
                a reputable provider and also to ensure that
              </p>
              <div className="mt-4">
                <button className="animated-btn">Discover More </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
