"use client"

import lottieJson from "@/assets/animated_JSON/love.json"
import Lottie from "react-lottie-player"

export default function LoveLottie() {

  return (
    <div className="mb-4 text-center position-relative">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "350px", height: "auto", margin: "auto" }}
      />
      <div style={{position: "absolute", bottom: "3rem", width: "100%"}}>
        <h3>Thank you for your feedback!</h3>
      </div>
    </div>
  )
}