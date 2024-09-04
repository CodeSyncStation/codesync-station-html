import bannerImg1 from "@/assets/images/hero/1.png";
import bannerImg2 from "@/assets/images/hero/2.png";
import bannerImg3 from "@/assets/images/hero/3.png";
import bannerImg4 from "@/assets/images/hero/4.png";
import bannerImg5 from "@/assets/images/hero/5.png";
import heroBg from "@/assets/images/hero/8.png";
import videoIcon from "@/assets/images/icons/video.svg";
import Image from "next/image";

export default function Hero() {
  return (
    <div
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
                Your Vision, Our Code Creating Future-Ready
                <span className="text-primary">Websites</span> That Inspire
              </h2>
              <p className="desc">
                Crafting innovative, brand-aligned websites that drive your
                success. Let’s bring your ideas to life and elevate your online
                presence.
              </p>
              <div className="btn-wrapper">
                <button className="animated-btn">Order Now</button>
                <div className="our-services">
                  <Image src={videoIcon} alt="video icon" />
                  Our services
                </div>
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
                <Image
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
                <Image className="main-img" src={bannerImg1} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
