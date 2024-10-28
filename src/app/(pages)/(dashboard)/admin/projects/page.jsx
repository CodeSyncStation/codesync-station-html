import { default as portfolio5 } from "@/assets/images/portfolio/Home-Click-Jobs.png";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";

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

          {/* <!-- search  --> */}
          {/* <div className="flex-between gap-2 pb-3">
            <div className="input-box mt-3 flex-1">
              <input
                id="email"
                type="search"
                placeholder="Search your courses"
                className="form-control shadow-none w-100 course-search"
            
              />
            </div>
            <div className="input-box mt-3">
              <select
                className="form-select shadow-none fz-14"
                style={{ height: "2.9rem", color: "#8F95B2" }}
                onChange={(e) => setOrder(e.target.value)}
                value={order}
              >
                <option value="desc">Recently Created</option>
                <option value="asc">Show old first</option>
              </select>
            </div>
          </div> */}

        </div>

        <div className="row mt-3 px-4">
          <div className="col-md-6 col-xl-4 mt-3">
            <div className="portfolio-card" >
              <div className="action-btn">
                <button className="edit-btn btn">
                  <MdModeEditOutline />
                </button>
                <button className="delete-btn btn">
                  <MdDelete />
                </button>
              </div>

              <div className="success-img">
                <div className="magnetic-wrap">
                  <Image className="img-fluid magnetic-item" src={portfolio5} alt="" style="" />
                </div>
              </div>
              <div className="success-content" >
                <span>Web development</span>
                <h3>Code sync station</h3>
                <div className="view-btn">
                  <a href="#">
                    <HiOutlineArrowRight />
                  </a>

                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-4 mt-3">
            <div className="portfolio-card add-card">
              <div className="plus-icon">
                <MdAdd />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default page;
