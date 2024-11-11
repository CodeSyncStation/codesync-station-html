"use client"

import lottieJson from "@/assets/animated_JSON/accepted.json"
import Lottie from "react-lottie-player"

export default function AcceptedLottie() {

  return (
    <div className="mb-4 text-center">
      <Lottie
        loop={false}
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "250px", margin: "auto" }}
      />
      <div>
        <h3>Your project is accepted!</h3>
      </div>
    </div>
  )
}