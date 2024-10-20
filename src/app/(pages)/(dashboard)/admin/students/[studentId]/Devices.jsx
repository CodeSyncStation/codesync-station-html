import WarningModal from "@/Components/ui/WarningModal"
import { useGetDevicesQuery, useRemoveDevicesMutation } from "@/redux/api/device/deviceSlice"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Devices({ params }) {

  const { isLoading, data: devices } = useGetDevicesQuery({
    owner: `/api/users/${params.studentId}`
  }, {
    skip: !params
  })
  const [removeDevice] = useRemoveDevicesMutation()
  const [show, setShow] = useState(false)
  const [iri, setIri] = useState("")

  const handleWarning = (iri) => {
    setShow(true)
    setIri(iri)
  }

  const handleRemove = () => {
    // Add your code here to handle remove device
    removeDevice({iri}).unwrap()
    .then(res=> {
      toast.success(`Device removed successfully`)
    })
    .catch(err=> {
      toast.error(err?.hydra?.description || "There was an error removing the device")
    })
    .finally(() => {
      setShow(false)
      setIri("")
    })
  }


  return !isLoading && devices && (
    <>
      <WarningModal
        show={show}
        setShow={setShow}
        handleConfirm={handleRemove}
        title="Remove Device"
      >
        Are you still sure you want to <strong>Remove</strong> this Device
      </WarningModal>
      <div className="table-wrapper mt-4 mb-4">
        <div className="section-top flex-between">
          <h3 className="title-main">Device Activity</h3>
        </div>

        <table className="admin-table student-details-table overflow-x-auto d-lg-table">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Platform</th>
              <th>Type</th>
              <th>Browser</th>
              <th>IP</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {
              devices["hydra:member"].map((device, ind) => (
                <tr key={device?.id}>
                  <td>{ind + 1}</td>
                  <td>{device?.os}</td>
                  <td>{device?.type}</td>
                  <td>{device?.browser}</td>
                  <td>{device?.ip.map((i)=> i?.ip).join(", ")}</td>
                  <td>
                    <button onClick={() => handleWarning(device["@id"])} className="pill text-danger" style={{ "background-color": "#E2E8F0" }}>
                      <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                          <path d="M5.6875 1.375H8.3125C8.55413 1.375 8.75 1.57088 8.75 1.8125V2.6875H5.25V1.8125C5.25 1.57088 5.44588 1.375 5.6875 1.375ZM9.625 2.6875V1.8125C9.625 1.08763 9.03737 0.5 8.3125 0.5H5.6875C4.96263 0.5 4.375 1.08763 4.375 1.8125V2.6875H2.19245C2.18947 2.68747 2.1865 2.68747 2.18351 2.6875H1.3125C1.07088 2.6875 0.875 2.88338 0.875 3.125C0.875 3.36662 1.07088 3.5625 1.3125 3.5625H1.7836L2.52977 12.8896C2.60252 13.799 3.36181 14.5 4.27419 14.5H9.72581C10.6382 14.5 11.3975 13.799 11.4702 12.8896L12.2164 3.5625H12.6875C12.9291 3.5625 13.125 3.36662 13.125 3.125C13.125 2.88338 12.9291 2.6875 12.6875 2.6875H11.8165C11.8135 2.68747 11.8105 2.68747 11.8076 2.6875H9.625ZM11.3386 3.5625L10.598 12.8198C10.5616 13.2745 10.182 13.625 9.72581 13.625H4.27419C3.818 13.625 3.43836 13.2745 3.40198 12.8198L2.6614 3.5625H11.3386ZM4.78681 4.43825C5.02802 4.42407 5.23506 4.6081 5.24925 4.84931L5.68675 12.2868C5.70093 12.528 5.5169 12.7351 5.27569 12.7492C5.03448 12.7634 4.82744 12.5794 4.81325 12.3382L4.37576 4.90069C4.36157 4.65948 4.5456 4.45244 4.78681 4.43825ZM9.21319 4.43825C9.4544 4.45244 9.63843 4.65948 9.62424 4.90069L9.18674 12.3382C9.17256 12.5794 8.96552 12.7634 8.72431 12.7492C8.4831 12.7351 8.29907 12.528 8.31326 12.2868L8.75076 4.84931C8.76494 4.6081 8.97198 4.42407 9.21319 4.43825ZM7 4.4375C7.24162 4.4375 7.4375 4.63338 7.4375 4.875V12.3125C7.4375 12.5541 7.24162 12.75 7 12.75C6.75838 12.75 6.5625 12.5541 6.5625 12.3125V4.875C6.5625 4.63338 6.75838 4.4375 7 4.4375Z" fill="#FF4141" />
                        </svg>
                      </span>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    </>
  )
}