"use client"

import Spinner from "@/Components/ui/Spinner";
import { useGetAllNotificationsQuery, useMarkAsReadMutation } from "@/redux/api/notifications/notificationsSlice";
import getUser from "@/utils/getUser";
import isEditor from "@/utils/isEditor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const style = {
  display: 'flex',
  width: '24px',
  height: '24px',
  padding: '4px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
  borderRadius: '8px',
  background: 'var(--Violet-V100, #E7E4F9)'
};

export default function Notifications() {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useGetAllNotificationsQuery({
    page,
    ownerId: getUser()["@id"]
  })
  const [markAsRead] = useMarkAsReadMutation()
  const router = useRouter()

  const [notifications, setNotifications] = useState({
    "hydra:member": []
  });

  useEffect(()=>{
    if (data) {
      setNotifications(data)
    }
    if (page > 1) {
      setNotifications({
        "hydra:member": notifications["hydra:member"].concat(data["hydra:member"])
      })
    }
  }, [data, page])

  useEffect(()=>{
    if(isEditor()){
      router.push('/admin-login')
      localStorage.removeItem('userData')
    }
  }, [])

  const handleMarkAsRead = async (notification) => {
    try {
      await markAsRead({iri: getUser()["@id"]})
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoadMore = () => {
    setPage(page + 1)
  }
  let content = null;
  if (isLoading) {
    content = <Spinner />
  }
  if (!isLoading && notifications && notifications["hydra:member"].length === 0) {
    content =
      <tr>
        <td>
          <p className=" fw-bold fs-5 text-center">There is No Notification!</p>
        </td>
      </tr>
  }
  if (!isLoading && notifications && notifications["hydra:member"].length > 0) {
    content = notifications["hydra:member"].map((notification) => (
      <tr key={notification["@id"]} style={{ borderTop: "0px solid white" }}>
        <td>
          <div className="flex-between">
            <div
              className={`d-flex gap-2 align-items-center ${
                notification?.read === false && "fw-bold"
              }`}
            >
              <span className="icon" style={style}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.95154 7.31257C3.95058 6.64573 4.08159 5.98525 4.33702 5.36926C4.59245 4.75323 4.96722 4.19386 5.43964 3.7233C5.91219 3.25274 6.47318 2.88031 7.09019 2.62745C7.70735 2.37463 8.36832 2.24636 9.03519 2.25007C11.8195 2.27118 14.0484 4.58446 14.0484 7.37584V7.87507C14.0484 10.3923 14.5757 11.8548 15.0398 12.6563C15.0891 12.7417 15.1152 12.8385 15.1152 12.9371C15.1153 13.0357 15.0895 13.1325 15.0403 13.218C14.9911 13.3034 14.9204 13.3745 14.8353 13.424C14.75 13.4735 14.6532 13.4997 14.5547 13.5001H3.44534C3.34674 13.4997 3.24992 13.4735 3.16478 13.424C3.0795 13.3745 3.00877 13.3034 2.95961 13.218C2.91045 13.1325 2.88463 13.0357 2.88477 12.9371C2.8849 12.8385 2.91086 12.7417 2.96016 12.6563C3.42419 11.8548 3.95154 10.3923 3.95154 7.87507V7.31257Z"
                    fill="#101840"
                    fill-opacity="0.1"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.38903 7.87506V7.31256C3.38903 7.31256 3.38746 6.19078 3.8174 5.1538C3.8174 5.1538 4.24733 4.11682 5.04276 3.3247C5.04276 3.3247 5.83819 2.53257 6.87695 2.10695C6.87695 2.10695 7.9157 1.68132 9.03826 1.68757C9.03826 1.68757 10.1797 1.69621 11.2191 2.15221C11.2191 2.15221 12.2191 2.59093 12.989 3.3817C12.989 3.3817 13.7558 4.16939 14.1763 5.18509C14.1763 5.18509 14.6109 6.23462 14.6109 7.37584V7.87506C14.6109 7.87506 14.6109 10.7928 15.5266 12.3745C15.5266 12.3745 15.6774 12.6357 15.6777 12.9366C15.6777 12.9366 15.6779 13.2375 15.5279 13.4983C15.5279 13.4983 15.378 13.7592 15.1178 13.9104C15.1178 13.9104 14.8576 14.0615 14.5566 14.0626L3.44528 14.0626C3.44528 14.0626 3.14239 14.0615 2.88219 13.9104C2.88219 13.9104 2.62199 13.7592 2.472 13.4983C2.472 13.4983 2.322 13.2375 2.32227 12.9366C2.32227 12.9366 2.32253 12.6357 2.47299 12.3751C2.47299 12.3751 3.38904 10.7928 3.38903 7.87506ZM4.51403 7.87506C4.51403 7.87506 4.51403 11.095 3.44727 12.9376L14.5527 12.9376C14.5527 12.9376 13.4859 11.0945 13.4859 7.87506V7.37584C13.4859 7.37584 13.4859 5.50493 12.1829 4.16646C12.1829 4.16646 10.8784 2.82654 9.032 2.81255C9.032 2.81255 8.13424 2.80756 7.30349 3.14795C7.30349 3.14795 6.47274 3.48834 5.8366 4.12184C5.8366 4.12184 5.20046 4.75535 4.85662 5.58467C4.85662 5.58467 4.51277 6.41399 4.51403 7.31256V7.87506Z"
                    fill="#101840"
                  />
                  <path
                    d="M11.8125 14.0625V13.5C11.8125 13.1893 11.5607 12.9375 11.25 12.9375C10.9393 12.9375 10.6875 13.1893 10.6875 13.5V14.0625C10.6875 14.7615 10.1932 15.2557 10.1932 15.2557C9.69898 15.75 9 15.75 9 15.75C8.30101 15.75 7.80676 15.2557 7.80676 15.2557C7.3125 14.7615 7.3125 14.0625 7.3125 14.0625V13.5C7.3125 13.1893 7.06066 12.9375 6.75 12.9375C6.43934 12.9375 6.1875 13.1893 6.1875 13.5L6.1875 14.0625C6.1875 15.2275 7.01126 16.0512 7.01126 16.0512C7.83502 16.875 9 16.875 9 16.875C10.165 16.875 10.9887 16.0512 10.9887 16.0512C11.8125 15.2275 11.8125 14.0625 11.8125 14.0625Z"
                    fill="#101840"
                  />
                </svg>
              </span>
              {notification?.content}
            </div>
            <span className="muted">{notification?.createdAgo}</span>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    isEditor() ? null : <section className="best-selling-courses">
      <div className="table-wrapper ">
        <div
          className="section-top"
          style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        >
          <h3 className="title-main">Notifications</h3>
          <div className="flex-between">
            <p className="des">You will get all the notification here.</p>
            <button className="text-admin-primary" onClick={handleMarkAsRead}>
              Mark as read
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="admin-table work-review-admin ">
            {/* <!-- head --> */}
            {/* <thead>
          <tr>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Student Phone</th>
            <th>Work Title</th>
            <th>Link</th>
          </tr>
        </thead> */}
            <tbody>{content}</tbody>
            {notifications["hydra:member"].length > 10 && (
              <tfoot>
                <tr>
                  <td className="mt-5 text-center py-4 bg-white">
                    <button
                      className="btn-addsection "
                      onClick={handleLoadMore}
                    >
                      Load more notification
                    </button>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </section>
  );
}