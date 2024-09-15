// components/TeamSection.js
import m1 from "@/assets/images/team/1.jpg";
import m2 from "@/assets/images/team/2.webp";
import m3 from "@/assets/images/team/3.webp";

const TeamSection = () => {
  return (
    <section id="team" className="team-section">
      <div className="container text-center">
      <div className="section-title">
        <h6 className="sub-title">Our Expert Team</h6>
        <h2 className="title">
        Skilled professionals bringing your vision to life
        </h2>
      </div>
      

        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={m1.src} className="card-img-top" alt="Darrell Steward" />
              <div className="card-body">
                <h5 className="card-title">Darrell Steward</h5>
                <p className="card-text">Web & App Developer</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={m2.src} className="card-img-top" alt="Courtney Henry" />
              <div className="card-body">
                <h5 className="card-title">Courtney Henry</h5>
                <p className="card-text">Web & App Developer</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src={m3.src} className="card-img-top" alt="Kathryn Murphy" />
              <div className="card-body">
                <h5 className="card-title">Kathryn Murphy</h5>
                <p className="card-text">Mobile App Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
