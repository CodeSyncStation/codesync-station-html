const baseUrl = process.env.NEXT_PUBLIC_APIHOST;

export const metadata = {
  title: "Projects || CodeSync station",
  description: "Manage your projects and its update like Add, Edit and Delete.",
}

const page = () => {

 
  return (
    <section className="best-selling-courses">
      <div className="table-wrapper" style={{overflow: "visible"}}>
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
        project
      </div>
    </section>
  );
};

export default page;
