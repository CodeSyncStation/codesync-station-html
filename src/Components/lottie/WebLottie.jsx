"use client"

import lottieJson from "@/assets/animated_JSON/web.json"
import Lottie from "react-lottie-player"

export default function WebLottie() {

  return (
    <div>
      <Lottie
        loop
        animationData={lottieJson}
        play
        // style={{ width: "70%", height: "100%" }}
      />
    </div>
  )
}