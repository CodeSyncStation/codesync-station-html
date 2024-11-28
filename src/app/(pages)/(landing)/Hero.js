import bannerImg3 from "@/assets/images/hero/3.png";
import heroBg from "@/assets/images/hero/8.png";
import videoIcon from "@/assets/images/icons/video.svg";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const WebLottie = dynamic(() => import("@/Components/lottie/WebLottie"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ backgroundImage: `url("${heroBg.src}")` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-content-center mb-3">
            <div className="content">
              <h3 className="subtitle">
                Transforming Ideas into Digital Masterpieces
              </h3>
              <h2 className="title">
                Your Vision, Our Code Creating Future-Ready&nbsp;
                <span className="text-primary">Solution</span> That Inspire
              </h2>
              <p className="desc">
                Crafting innovative, brand-aligned websites that drive your
                success. Let’s bring your ideas to life and elevate your online
                presence.
              </p>
              <div className="btn-wrapper">
                <Link href="/order" className="animated-btn">
                  Order Now
                </Link>
                <button className="our-services btn outline-0">
                  <Image src={videoIcon} alt="video icon" />
                  Our services
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-thumb-2 mt-4 mt-lg-0">
              <Image
                className="banner-animate-img banner-animate-img-4"
                src={bannerImg3}
                alt="img"
              />
              <div className="main-img-wrap">
                {/* <Image
                  className="banner-animate-img banner-animate-img-1 left_image_bounce"
                  src={bannerImg4}
                  alt="img"
                />
                <Image
                  className="banner-animate-img banner-animate-img-2 left_image_bounce"
                  src={bannerImg5}
                  alt="img"
                />
                <Image
                  className="banner-animate-img banner-animate-img-3 top_image_bounce"
                  src={bannerImg2}
                  alt="img"
                />
                <Image className="main-img" src={bannerImg1} alt="img" /> */}
                <WebLottie />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
