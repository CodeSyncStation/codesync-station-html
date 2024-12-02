import Link from "next/link";

export default function page({ params }) {
  const services = {
    "Web Apps Development": {
      name: "Web Development",
      subServices: [
        {
          title: "E-commerce Website Development",
          description:
            "Develop user-friendly and scalable e-commerce platforms for businesses of all sizes.",
        },
        {
          title: "Content Management Systems (CMS)",
          description:
            "Custom CMS solutions to manage content efficiently and effortlessly.",
        },
        {
          title: "Custom Website Development",
          description:
            "Tailored website solutions built to meet unique business requirements.",
        },
        {
          title: "SEO-Friendly Websites",
          description:
            "Optimize websites to rank higher on search engines and drive more organic traffic.",
        },
        {
          title: "Web Maintenance and Support",
          description:
            "Ongoing website support to ensure peak performance and security.",
        },
      ],
      steps: [
        {
          title: "Gather Requirements",
          description:
            "Understand the client's goals, target audience, and website functionality needs.",
        },
        {
          title: "Plan Structure and Features",
          description:
            "Create a comprehensive plan for the website's layout, features, and tech stack.",
        },
        {
          title: "Design Wireframes",
          description:
            "Design mockups and prototypes to visualize the final product.",
        },
        {
          title: "Develop Frontend and Backend",
          description:
            "Code the website using modern tools and frameworks, ensuring responsiveness.",
        },
        {
          title: "Test and Deploy",
          description:
            "Test thoroughly for bugs and deploy the website on a live server.",
        },
      ],
    },
    "Mobile Apps Development": {
      name: "Mobile Apps Development",
      subServices: [
        {
          title: "iOS App Development",
          description:
            "Develop high-quality apps for Apple's ecosystem using Swift and Objective-C.",
        },
        {
          title: "Android App Development",
          description:
            "Create user-friendly Android applications with Java and Kotlin.",
        },
        {
          title: "Cross-Platform Development",
          description:
            "Build apps that work seamlessly on both iOS and Android using React Native or Flutter.",
        },
        {
          title: "App Maintenance and Updates",
          description:
            "Ensure apps stay updated with regular maintenance and feature enhancements.",
        },
        {
          title: "App Store Deployment",
          description:
            "Handle submission and publishing of apps on Google Play and Apple App Store.",
        },
      ],
      steps: [
        {
          title: "Analyze Requirements",
          description:
            "Understand the app's functionality, target audience, and core objectives.",
        },
        {
          title: "Create Wireframes",
          description:
            "Visualize user flows and interface design through detailed wireframes.",
        },
        {
          title: "Develop App",
          description:
            "Implement front-end and back-end functionality using the appropriate tech stack.",
        },
        {
          title: "Perform Testing",
          description:
            "Conduct rigorous testing to ensure the app performs well across all devices.",
        },
        {
          title: "Publish App",
          description:
            "Deploy the app on respective app stores and provide post-launch support.",
        },
      ],
    },
    "Web and App UI UX Design": {
      name: "Web and App UI/UX Design",
      subServices: [
        {
          title: "Wireframe Design",
          description:
            "Create blueprint layouts to visualize the app or website's structure.",
        },
        {
          title: "Interactive Prototyping",
          description:
            "Develop interactive prototypes to simulate user interactions.",
        },
        {
          title: "UX Research",
          description:
            "Conduct research to understand user behavior and improve usability.",
        },
        {
          title: "UI Design",
          description:
            "Design visually appealing interfaces that align with the brand's identity.",
        },
        {
          title: "Redesign Existing Platforms",
          description:
            "Enhance outdated platforms with a modern, user-centric design approach.",
        },
      ],
      steps: [
        {
          title: "Research and Analysis",
          description:
            "Understand the target audience and gather insights on user behavior.",
        },
        {
          title: "Create Wireframes",
          description:
            "Design initial wireframes to define structure and navigation.",
        },
        {
          title: "Develop Prototypes",
          description:
            "Build interactive prototypes for user testing and feedback.",
        },
        {
          title: "Refine Design",
          description:
            "Incorporate feedback and finalize high-fidelity designs.",
        },
        {
          title: "Deliver Assets",
          description:
            "Provide design assets and guidelines to the development team.",
        },
      ],
    },
    "Graphic Design": {
      name: "Graphic Design",
      subServices: [
        {
          title: "Logo and Branding",
          description:
            "Design professional logos and branding materials to represent your business.",
        },
        {
          title: "Marketing Materials",
          description:
            "Create brochures, flyers, and posters for impactful marketing campaigns.",
        },
        {
          title: "Social Media Graphics",
          description: "Design engaging visuals for social media platforms.",
        },
        {
          title: "Packaging Design",
          description: "Design creative and functional packaging solutions.",
        },
        {
          title: "Illustrations",
          description:
            "Create custom illustrations and iconography to enhance brand storytelling.",
        },
      ],
      steps: [
        {
          title: "Understand Requirements",
          description:
            "Discuss design goals and branding preferences with the client.",
        },
        {
          title: "Create Initial Concepts",
          description: "Develop rough concepts for review and feedback.",
        },
        {
          title: "Refine Designs",
          description: "Iterate on designs based on client feedback.",
        },
        {
          title: "Finalize Assets",
          description: "Prepare print-ready or digital assets as needed.",
        },
        {
          title: "Deliver Final Files",
          description:
            "Hand over all assets with required formats and guidelines.",
        },
      ],
    },
    "Web Apps Bug Fixing": {
      name: "Graphic Design",
      subServices: [
        {
          title: "Logo and Branding",
          description:
            "Design professional logos and branding materials to represent your business.",
        },
        {
          title: "Marketing Materials",
          description:
            "Create brochures, flyers, and posters for impactful marketing campaigns.",
        },
        {
          title: "Social Media Graphics",
          description: "Design engaging visuals for social media platforms.",
        },
        {
          title: "Packaging Design",
          description: "Design creative and functional packaging solutions.",
        },
        {
          title: "Illustrations",
          description:
            "Create custom illustrations and iconography to enhance brand storytelling.",
        },
      ],
      steps: [
        {
          title: "Understand Requirements",
          description:
            "Discuss design goals and branding preferences with the client.",
        },
        {
          title: "Create Initial Concepts",
          description: "Develop rough concepts for review and feedback.",
        },
        {
          title: "Refine Designs",
          description: "Iterate on designs based on client feedback.",
        },
        {
          title: "Finalize Assets",
          description: "Prepare print-ready or digital assets as needed.",
        },
        {
          title: "Deliver Final Files",
          description:
            "Hand over all assets with required formats and guidelines.",
        },
      ],
    },
    APIDesign: {
      name: "API Design",
      subServices: [
        {
          title: "RESTful API Development",
          description:
            "Design and develop RESTful APIs for seamless communication.",
        },
        {
          title: "GraphQL API Development",
          description: "Create GraphQL APIs for optimized data fetching.",
        },
        {
          title: "Third-Party Integration",
          description: "Integrate external APIs to enhance app functionality.",
        },
        {
          title: "API Documentation",
          description: "Provide clear and detailed API documentation.",
        },
        {
          title: "API Testing and Optimization",
          description: "Ensure APIs are secure and perform well under load.",
        },
      ],
      steps: [
        {
          title: "Requirement Gathering",
          description: "Understand the API's purpose and data flow.",
        },
        {
          title: "Endpoint Design",
          description: "Plan and structure API endpoints.",
        },
        {
          title: "Implementation",
          description: "Develop and test API functionalities.",
        },
        {
          title: "Documentation",
          description: "Write comprehensive API usage guides.",
        },
        {
          title: "Optimization",
          description: "Ensure the API is secure and performs efficiently.",
        },
      ],
    },
  };

  const activeService = params?.service[1]?.replace(/-/g, " ");

  console.log(activeService);

  const service = services[activeService];

  return (
    <div className="service-page">
      <div className="banner">
        <div className="container">
          <div className="content">
            <h1>{services[activeService]?.name}</h1>
            <p>
              Welcome to our platform, where you can create, manage, and
              collaborate on your projects with ease.
            </p>
          </div>
        </div>
      </div>
      <div className="container pt-4">
        <div className="row">
          <div className="col-xl-9">
            <div className="unique-services-section">
              <h3>{services[activeService]?.name}</h3>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
              <div className="services-container">
                {service?.subServices?.map((service, index) => (
                  <div key={index} className="service-card">
                    <div className="service-title">{service.title}</div>
                    <div className="service-description">
                      {service.description}
                    </div>
                  </div>
                ))}
              </div>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
            </div>
            <div className="steps-section" style={{ flex: "1" }}>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
              <h3>
                {services[activeService]?.steps.length} Simple Steps to Process
              </h3>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
              <div className="steps-container">
                {service?.steps?.map((step, index) => (
                  <div key={index} className="step-card">
                    <div className="step-number">{"0" + (index + 1)}</div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="services-section">
              <h2>Services</h2>
              <ul className="service-list">
                {Object.keys(services).map((service, index) => (
                  <li
                    key={index}
                    className={`service-item ${
                      activeService === service ? "active" : ""
                    }`}
                  >
                    <Link href={`/service/${service?.replace(/[\s/]+/g, "-")}`}>
                      {service}
                    </Link>
                    <span className="arrow">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
