"use client"

import lottieJson from "@/assets/animated_JSON/testing.json"
import Lottie from "react-lottie-player"

export default function TestingLottie() {

  return (
    <div className="mb-4 text-center">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "auto", margin: "auto" }}
      />
      <div className="pt-3">
        <h3>Your project is  under testing!</h3>
      </div>
    </div>
  )
}