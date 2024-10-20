"use client"

import lottieJson from "@/assets/animated_JSON/Hello.json"; // Replace with your Lottie file path.
import Lottie from "react-lottie-player";

export default function AboutLottie() {

  return (
    <div>
      <Lottie
        animationData={lottieJson}
        play
        className="w-lg-75"
      />
    </div>
  )
}