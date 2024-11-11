"use client"

import lottieJson from "@/assets/animated_JSON/designing.json"
import Lottie from "react-lottie-player"

export default function DesigningLottie() {

  return (
    <div className="mb-4 text-center">
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "250px", margin: "auto" }}
      />
      <div>
        <h3>Your project is under Designing!</h3>
      </div>
    </div>
  )
}