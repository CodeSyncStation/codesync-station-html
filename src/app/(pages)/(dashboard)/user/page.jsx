

import { auth } from "@/auth";
import { getOrders } from "@/lib/fetch/orders";
import dynamic from "next/dynamic";

const AcceptedLottie = dynamic(() => import("@/Components/lottie/AcceptedLottie"), { ssr: false });
const AnalyzingLottie = dynamic(() => import("@/Components/lottie/AnalyzingLottie"), { ssr: false });
const DeliveredLottie = dynamic(() => import("@/Components/lottie/DeliveredLottie"), { ssr: false });
const DesigningLottie = dynamic(() => import("@/Components/lottie/DesingingLottie"), { ssr: false });
const DevelopingLottie = dynamic(() => import("@/Components/lottie/DevelopingLottie"), { ssr: false });
const LoveLottie = dynamic(() => import("@/Components/lottie/LoveLottie"), { ssr: false });
const NofoundLottie = dynamic(() => import("@/Components/lottie/NofoundLoggie"), { ssr: false });
const TestCompletedLottie = dynamic(() => import("@/Components/lottie/TestCompletedLottie"), { ssr: false });
const TestingLottie = dynamic(() => import("@/Components/lottie/TestingLottie"), { ssr: false });

const page = async () => {

  const session = await auth();
  const orders = await getOrders({ email: session?.user?.email, recent: true })
  // console.log(session)

  const statuses = [
    // "pending",
    "accepted",
    // "payment_confirmed",
    "analyzing",
    // "req_confirmed",
    "designing",
    "implementing",
    "testing",
    "test_done",
    "review_done",
    "delivered",
  ];

  const currentStatus = orders[0]?.status;

  const currentIndex = statuses.findIndex(status => status === currentStatus);

  let content = null;
  // if(orders && orders.length === 0){
  //   content = <p>No recent orders found.</p>
  // }
  if (orders && orders.length > 0 && orders[0]?.status !== "pending") {
    content = (
      <>
        <div className="header">
          <h1 className="fs-4 dot">Project: <strong>CodeSync</strong></h1>
          <span className="date dot">Estimated delivery date : <strong>April 24, 2021</strong></span>
          <span className="product-count">3 Products</span>
        </div>

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

        <div className="progress-wrapper">
          <div className="d-flex justify-content-between align-items-center position-relative " style={{minWidth: "700px"}}>
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0"
              aria-valuemax="100">
              <div className="progress-bar" style={{ width: `${100 / statuses.length * (currentIndex + 1)}%` }}></div>
            </div>
            {
              statuses.map((status, index) => (
                <div key={status} className="text-center">
                  <div className={`progress-step ${index <= currentIndex ? 'completed' : ''} ${index === currentIndex ? 'active' : ''}`}>
                    {
                      index <= currentIndex ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.6673 5.83398L7.50065 15.0007L3.33398 10.834" stroke="white" stroke-width="2"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg> : index
                    }
                  </div>
                  <p className="mt-2 text-capitalize">{status.split("_").join(" ")}</p>
                </div>
              ))
            }

          </div>
        </div>
      </>
    )
  }

  if ((orders && orders.length === 0) || orders[0]?.status === "pending") {
    content = (
      <div style={{ height: "90vh" }} className="p-4">
        <NofoundLottie />
      </div>
    )
  }

  return (
    <div className="m-4 border rounded order-details">
      {content}
    </div>
  );
}

export default page
