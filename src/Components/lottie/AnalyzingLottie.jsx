"use client"

import lottieJson from "@/assets/animated_JSON/analyzing.json"
import Lottie from "react-lottie-player"

export default function AnalyzingLottie() {

  return (
    <div className="mb-4 text-center">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "250px", margin: "auto" }}
      />
      <div>
        <h3>Your project is analyzing!</h3>
      </div>
    </div>
  )
}