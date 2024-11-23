"use client"

import lottieJson from "@/assets/animated_JSON/notFound.json"
import Lottie from "react-lottie-player"

export default function NofoundLottie() {

  return (
    <div className="mb-4 text-center position-relative">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "350px", height: "auto", margin: "auto" }}
      />
      <div>
        <h3>No recent orders</h3>
      </div>
    </div>
  )
}