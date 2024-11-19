"use client"

import lottieJson from "@/assets/animated_JSON/testingCompleted.json";
import { useState } from "react";
import Lottie from "react-lottie-player";
import ReviewModal from "../modals/ReviewModal";

export default function TestCompletedLottie() {
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(true);

  return (
    <>
    <ReviewModal show={show} setShow={setShow}/>
    <div className="mb-4 text-center">
      <Lottie
        loop={true}
        animationData={lottieJson}
        play
        style={{ width: "250px", height: "auto", margin: "auto" }}
      />
      <div className="pt-3">
        <h3>
          Your project has been tested and all issues have been resolved! Please <button className="feedbackBtn"  onClick={handleShow}>Give Feedback</button>
        </h3>
      </div>
    </div>
    </>
  )
}