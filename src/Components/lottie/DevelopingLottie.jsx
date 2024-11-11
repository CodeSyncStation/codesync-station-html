"use client"

import lottieJson from "@/assets/animated_JSON/developing.json"
import Lottie from "react-lottie-player"

export default function DevelopingLottie() {

  return (
    <div className="mb-4 text-center">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "250px", margin: "auto" }}
      />
      <div>
        <h3>Your project is under developing!</h3>
      </div>
    </div>
  )
}