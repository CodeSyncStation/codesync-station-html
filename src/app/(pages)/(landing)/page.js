import About from "./About";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      {/* <IndustriesSection /> */}
      <WhyChooseUs />
      <Portfolio />
    </>
  );
}
