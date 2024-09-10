
const IndustriesSection = () => {
  return (
    <section className="industriesSection">
      <h2 className="heading">Custom Software Solutions for Diverse Industries</h2>
      <div className="industryIcons">
        <div className="icon" style={{backgroundImage: 'url(transportation-icon.png)'}}>Transportation</div>
        <div className="icon" style={{backgroundImage: 'url(healthcare-icon.png)'}}>Healthcare</div>
        {/* Add more icons and labels here */}
      </div>
      <button className="viewMoreButton">View More Industries</button>
    </section>
  );
};

export default IndustriesSection;