import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Hero from "./Hero";
import IndustriesCovered from "./IndustriesCovered";
import Portfolio from "./Portfolio";
import Services from "./Services";
import TeamSection from "./TeamSection";
import TestimonialSlider from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <IndustriesCovered />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <TeamSection />
      <TestimonialSlider />
      <Contact />
      <FAQ />
    </>
  );
}
