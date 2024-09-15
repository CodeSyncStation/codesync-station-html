// components/WhyChooseUs.js

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us py-5">
      <div className="container">

        <div className="section-title">
          <h6 className="sub-title">Why Chose us</h6>
          <h2 className="title">
            Don’t just code your way forward, CodeSync your way to the top.
          </h2>
        </div>
        <div className="row mt-4">
          <div
            className="col-lg-3 col-md-6 text-center mb-4"
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease"
          >
            <div className="choose-card p-4">
              <div className="choose-number">1</div>
              <p>
                CodeSync utilizes the latest technology to keep you ahead in the industry. Benefit from solutions that streamline processes, driving your business to new heights.
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 text-center mb-4"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="1000"
            data-aos-easing="ease"
          >
            <div className="choose-card p-4">
              <div className="choose-number">2</div>
              <p>
                We understand every business is unique. Our solutions are customized to meet your specific needs, ensuring a perfect fit that addresses your unique challenges and goals.
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 text-center mb-4"
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="1000"
            data-aos-easing="ease"
            >
            <div className="choose-card p-4">
              <div className="choose-number">3</div>
              <p>
                Our team comprises seasoned professionals with deep industry knowledge and technical expertise. They are committed to delivering the best solutions that drive success.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center mb-4" data-aos="fade-left" data-aos-delay="700" data-aos-duration="1000" data-aos-easing="ease">
            <div className="choose-card p-4">
              <div className="choose-number">4</div>
              <p>
                With a portfolio of successful projects across various industries, CodeSync has a proven track record of delivering high-quality solutions that meet and exceed client expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
