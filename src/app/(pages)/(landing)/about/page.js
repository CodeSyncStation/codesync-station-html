import target from "@/assets/images/about/target.jpg";
import value from "@/assets/images/about/value.jpg";
import vision from "@/assets/images/about/vission.jpg";
import Image from "next/image";

const About = () => {
  return (
    <div className={`container about`}>
      <div className="text-center py-5">
        <h1 className="title">About Us</h1>
        <p className="subtitle">
          Discover more about our mission, values, and services.
        </p>
      </div>

      <div className="row">
        {/* Mission Section */}
        <div className="col-md-6">
          <h2 className="heading">Our Mission</h2>
          <p>
            We aim to provide hassle-free and eco-friendly pooper scooper
            services to keep your surroundings clean and enjoyable for everyone.
          </p>
        </div>
        <div className="col-md-6">
          <Image
            src={target}
            alt="Mission Image"
            width={500}
            height={300}
            className="imag"
          />
        </div>
      </div>

      <div className="row">
        {/* Vision Section */}
        <div className="col-md-6 order-md-2">
          <h2 className="heading">Our Vision</h2>
          <p>
            Our vision is to be the go-to service for maintaining clean and
            healthy neighborhoods while promoting responsible pet ownership.
          </p>
        </div>
        <div className="col-md-6 order-md-1">
          <Image
            src={vision}
            alt="Vision Image"
            width={500}
            height={300}
            className="imag"
          />
        </div>
      </div>

      <div className="row">
        {/* Core Values Section */}
        <div className="col-12">
          <h2 className="heading">Our Core Values</h2>
          <ul className="valuesList">
            <li>
              Customer Satisfaction: Ensuring every client gets the best
              service.
            </li>
            <li>
              Eco-Friendly Solutions: Using environment-friendly techniques and
              materials.
            </li>
            <li>Reliability: Timely and dependable service.</li>
          </ul>
        </div>
      </div>

      <div className="row pb-5">
        {/* Story Section */}
        <div className="col-md-6">
          <h2 className="heading">Our Story</h2>
          <p>
            As pet owners ourselves, we noticed the lack of reliable pooper
            scooper services. We decided to start this company to make life
            easier for pet lovers and maintain cleaner surroundings.
          </p>
        </div>
        <div className="col-md-6">
          <Image
            src={value}
            alt="Story Image"
            width={500}
            height={300}
            className="imag"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
