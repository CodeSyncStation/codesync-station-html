"use client"

import lottieJson from "@/assets/animated_JSON/delivered.json"
import Lottie from "react-lottie-player"

export default function DeliveredLottie() {

  return (
    <div className="mb-4 text-center position-relative">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "350px", height: "auto", margin: "auto" }}
      />
      <div>
        <h3>Thank you for staying with us!</h3>
      </div>
    </div>
  )
}