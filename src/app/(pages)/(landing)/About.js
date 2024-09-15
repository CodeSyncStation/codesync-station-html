import AboutLottie from "@/Components/lottie/AboutLottie";

export default function About() {
  return (
    <section id="about" className="about-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="flip-container">
              <div className="flip-front-part">
                <AboutLottie />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-title mb-0">
              <h6 className="sub-title">ABOUT US</h6>
              <h2 className="title" data-aos="fade-left" data-aos-delay="100">
                Empowering businesses with SaaS technology
              </h2>
              <p
                className="content mb-4"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                You can access SaaS applications through a web browser or mobile
                app, as long as you have an internet connection.
              </p>
              <div className="row" data-aos="fade-left" data-aos-delay="300">
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
              <p className="content" data-aos="fade-left" data-aos-delay="400">
                SaaS providers typically invest heavily in security measures to
                protect customer data, such as encryption and multi-factor
                authentication. However, it is important to research and choose
                a reputable provider and also to ensure that
              </p>
              <div className="mt-4">
                <button
                  className="animated-btn"
                  data-aos="fade-left"
                  data-aos-delay="500"
                >
                  Discover More{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
