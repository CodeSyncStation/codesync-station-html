import Projects from "./Projects";

const baseUrl = process.env.NEXT_PUBLIC_APIHOST;

export const metadata = {
  title: "Projects || CodeSync station",
  description: "Manage your projects and its update like Add, Edit and Delete.",
}

const page = () => {


  return (
    <section className="best-selling-courses overflow-visible">
      <div className="table-wrapper" style={{ overflow: "visible" }}>
        <div className="section-top">
          <h3 className="title-main">Projects</h3>
          <p className="des">
            Manage your projects and its update like Add, Edit and Delete.
          </p>
        </div>

        <Projects />

      </div>
    </section>
  );
};

export default page;
