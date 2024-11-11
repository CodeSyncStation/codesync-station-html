
import { auth } from "@/auth";

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
  const currentStatus = "testing"; // Example of current status

  const currentIndex = statuses.findIndex(status => status === currentStatus);

  return (
    <>
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
    </>
  );
}

export default page
