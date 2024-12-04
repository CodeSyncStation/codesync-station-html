import bugFixing from "@/assets/images/icons/bugFixing.svg";
import mobileAppDev from "@/assets/images/icons/mobile-app-dev-icon.svg";
import penIcon from "@/assets/images/icons/pen-tool-icon.svg";
import apiDesign from "@/assets/images/icons/rest-api-icon.svg";
import getAnimation from "@/utilities/func/getAnimation";
import Link from "next/link";

function Service(props) {
  const { service } = props || {};
  const { title, description, icon } = service || {};
  return (
    <div className="service-item">
      <div className="service-icon m-auto">
        <div className="circle"></div>
        <div className="service-img">{icon}</div>
      </div>
      <div className="service-body">
        <h2 className="my-3 text-capitalize">{title}</h2>
        <p>{description}</p>
        <Link
          href={`/service/${title?.replace(/[\s/]+/g, "-")}`}
          className="animated-btn m-auto"
        >
          Touch more
        </Link>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Web Apps Development",
      description:
        "Building responsive, high-performance web applications tailored to your business needs, optimized for mobile, tablet, and desktop.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 380.24"
        >
          <path d="M34.66 0h442.68C496.4 0 512 15.6 512 34.66v310.92c0 19.06-15.6 34.66-34.66 34.66H34.66C15.6 380.24 0 364.64 0 345.58V34.66C0 15.6 15.6 0 34.66 0zm173.92 264.36c5.76 5.04 6.34 13.81 1.3 19.57-5.05 5.76-13.81 6.35-19.57 1.3l-52.73-46.19c-5.76-5.05-6.35-13.81-1.3-19.58.43-.49.89-.94 1.37-1.36l52.66-46.14c5.76-5.04 14.52-4.46 19.57 1.31 5.04 5.76 4.46 14.52-1.3 19.57l-40.82 35.76 40.82 35.76zm113.11 20.87c-5.76 5.05-14.52 4.46-19.57-1.3-5.04-5.76-4.46-14.53 1.3-19.57l40.82-35.76-40.82-35.76c-5.76-5.05-6.34-13.81-1.3-19.57 5.05-5.77 13.81-6.35 19.57-1.31l52.66 46.14c.48.42.94.87 1.37 1.36 5.05 5.77 4.46 14.53-1.3 19.58l-52.73 46.19zm-65.95-124.31c1.74-7.47 9.22-12.12 16.69-10.38 7.47 1.74 12.12 9.22 10.38 16.69l-30.13 129.04c-1.74 7.48-9.22 12.13-16.69 10.39-7.47-1.74-12.12-9.22-10.38-16.69l30.13-129.05zM22.03 97.05v251.91a9.56 9.56 0 0 0 9.59 9.59H481.8a9.56 9.56 0 0 0 9.59-9.59V97.05H22.03zm422.32-58.09c9.46 0 17.12 7.67 17.12 17.12 0 9.46-7.66 17.12-17.12 17.12-9.45 0-17.12-7.66-17.12-17.12 0-9.45 7.67-17.12 17.12-17.12zm-116.03 0c9.46 0 17.12 7.67 17.12 17.12 0 9.46-7.66 17.12-17.12 17.12-9.45 0-17.11-7.66-17.11-17.12 0-9.45 7.66-17.12 17.11-17.12zm58.02 0c9.45 0 17.12 7.67 17.12 17.12 0 9.46-7.67 17.12-17.12 17.12-9.45 0-17.12-7.66-17.12-17.12 0-9.45 7.67-17.12 17.12-17.12z"></path>
        </svg>
      ),
    },
    {
      title: "API Design",
      description:
        "Designing and developing scalable and efficient APIs to power dynamic and feature-rich applications.",
      icon: <img src={apiDesign.src} alt="icon" />,
    },
    {
      title: "Mobile Apps Development",
      description:
        "Creating user-friendly and robust mobile applications for Android and iOS platforms, ensuring seamless performance.",
      icon: (
        <img src={mobileAppDev.src} alt="icon" width={30} className="m-auto" />
      ),
    },
    {
      title: "Web Apps Bug Fixing",
      description:
        "Identifying and resolving bugs in web applications to enhance performance, security, and user experience.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 399.22"
        >
          <path d="M14.83 0h482.35C505.34 0 512 6.66 512 14.83v288.61c0 8.17-6.66 14.83-14.82 14.83H14.83C6.66 318.27 0 311.61 0 303.44V14.83C0 6.66 6.66 0 14.83 0zm284.26 147.4c.17 4.15.03 20.16-.41 24.29l19.46 9.87a7.19 7.19 0 0 1 3.82 5.06l8.29 31.98c.88 3.87-1.56 7.72-5.44 8.6a7.19 7.19 0 0 1-8.59-5.44l-7.59-28.89-12.88-6.53c-6.09 20.2-19.69 30.67-35.81 31.9V133.5h35.41l15.91-5.5 6.89-22.82c1.13-3.81 5.15-5.99 8.96-4.85 3.81 1.14 5.98 5.15 4.84 8.96l-7.94 26.35-.02-.01a7.227 7.227 0 0 1-4.55 4.75l-20.35 7.02zm-45.57 70.84c-16.26-1.2-29.98-11.84-36.01-32.29l-14.09 6.4-6.45 29.18c-.74 3.91-4.52 6.47-8.43 5.72-3.9-.75-6.46-4.52-5.71-8.42l7.13-32.71a7.16 7.16 0 0 1 4.14-5.35l20.56-9.34c-.41-4.06-.55-19.99-.39-24.07l-21.71-7.5c-2.27-.78-3.9-2.6-4.55-4.73h-.02l-7.94-26.34a7.207 7.207 0 0 1 4.84-8.97c3.81-1.13 7.83 1.03 8.96 4.85l6.89 22.82 17.38 6 35.4.01v84.74zm2.71-127.37c2.71 0 5.33.5 7.85 1.45.93-2.06 1.77-3.97 2.54-5.72 8.06-18.32 9.1-20.71 36.87-28.84 2.6-.78 5.32.71 6.08 3.3.77 2.6-.72 5.33-3.32 6.1-23.37 6.85-24.21 8.75-30.64 23.4-.9 2.04-1.89 4.29-3.07 6.88 7.32 6.31 13.06 16.74 16.02 29.35h-64.67c2.96-12.61 8.7-23.04 16.03-29.35a378.14 378.14 0 0 1-3.07-6.88c-6.44-14.65-7.28-16.55-30.65-23.4-2.6-.77-4.09-3.5-3.33-6.09.78-2.6 3.49-4.09 6.09-3.31 27.76 8.13 28.82 10.52 36.87 28.85.77 1.75 1.61 3.66 2.54 5.71a22.14 22.14 0 0 1 7.85-1.44l.01-.01zm12.17 14.41c3.61 0 6.55 2.93 6.55 6.54 0 3.62-2.94 6.54-6.55 6.54s-6.54-2.92-6.54-6.54c0-3.61 2.93-6.54 6.54-6.54zm-24.35 0c3.61 0 6.54 2.93 6.54 6.54 0 3.62-2.93 6.54-6.54 6.54a6.53 6.53 0 0 1-6.54-6.54c0-3.61 2.92-6.54 6.54-6.54zm79.19 233.45c.35 23.25 9.94 44.11 35.9 60.49H152.86c20.91-15.15 36-33.45 35.91-60.49h134.47zM28.36 17h455.32c7.24 0 13.1 5.91 13.1 13.09v222.67c0 7.19-5.91 13.09-13.1 13.09H28.36c-7.19 0-13.09-5.9-13.09-13.09V30.09C15.22 22.87 21.16 17 28.36 17z"></path>
        </svg>
      ),
    },
    {
      title: "Web and App UI/UX Design",
      description:
        "Designing intuitive and visually appealing interfaces that provide a seamless user experience across web and mobile platforms.",
      icon: <img src={bugFixing.src} alt="icon" />,
    },
    {
      title: "Graphic Design",
      description:
        "Creating visually stunning graphics and designs that effectively communicate your brand's message.",
      icon: <img src={penIcon.src} alt="icon" className="m-auto" />,
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title">
          <h6 className="sub-title">Our Services</h6>
          <h2 className="title">
            Tailored Solutions to Elevate Your{" "}
            <span className="text-primary">Digital Presence</span>
          </h2>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos={getAnimation(index)}
              className="col-12 col-md-6 col-xl-4"
              // data-aos-delay={index + "00"}
              data-aos-duration="1000"
            >
              <Service service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
