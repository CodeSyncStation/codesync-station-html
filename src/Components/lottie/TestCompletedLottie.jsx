"use client"

import lottieJson from "@/assets/animated_JSON/testingCompleted.json"
import Lottie from "react-lottie-player"

export default function TestCompletedLottie() {

  return (
    <div className="mb-4 text-center">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "auto", margin: "auto" }}
      />
      <div className="pt-3">
        <h3>
          Your project has been tested and all issues have been resolved! Please <button className="feedbackBtn">Give Feedback</button>
        </h3>
      </div>
    </div>
  )
}