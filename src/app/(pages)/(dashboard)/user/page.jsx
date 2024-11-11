
import { auth } from "@/auth";
import AcceptedLottie from "@/Components/lottie/AcceptedLottie";
import AnalyzingLottie from "@/Components/lottie/AnalyzingLottie";
import DeliveredLottie from "@/Components/lottie/DeliveredLottie";
import DesigningLottie from "@/Components/lottie/DesingingLottie";
import DevelopingLottie from "@/Components/lottie/DevelopingLottie";
import LoveLottie from "@/Components/lottie/LoveLottie";
import TestCompletedLottie from "@/Components/lottie/TestCompletedLottie";
import TestingLottie from "@/Components/lottie/TestingLottie";

const page = async () => {

  const session = await auth();
  // console.log(session)
  const statuses = [
    "pending",
    "accepted",
    "payment_confirmed",
    "analyzing",
    "req_confirmed",
    "designing",
    "implementing",
    "testing",
    "test_done",
    "review_done",
    "delivered",
  ];

  // Current status from API or backend
  const currentStatus = "delivered"; // Example of current status

  const currentIndex = statuses.findIndex(status => status === currentStatus);

  return (
    <div>
      <div className="pt-4">
        {currentStatus === "accepted" && <AcceptedLottie />}
        {currentStatus === "analyzing" && <AnalyzingLottie />}
        {currentStatus === "designing" && <DesigningLottie />}
        {currentStatus === "implementing" && <DevelopingLottie />}
        {currentStatus === "testing" && <TestingLottie />}
        {currentStatus === "test_done" && <TestCompletedLottie />}
        {currentStatus === "review_done" && <LoveLottie />}
        {currentStatus === "delivered" && <DeliveredLottie />}
      </div>
      <div className="progress-bar">
        {statuses.map((status, index) => (
          <div key={status} className="step-container">
            <div
              className={`step ${index <= currentIndex ? 'completed' : ''} ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="step-icon">{/* Icon or number */}</div>
              <span className="status">{status.split("_").join(" ").toUpperCase()}</span>
            </div>
            {/* Only render the line if it's not the last step */}
            {index < statuses.length - 1 && (
              <div className={`progress-line ${index < currentIndex ? 'line-completed' : ''}`} />
            )}
          </div>
        ))}
      </div>
    </div >
  );
}

export default page
