
import logo from "@/assets/images/logo.png";
import { auth } from "@/auth";
import Menu from "@/Components/layout/Menu";
import Avatar from "@/Components/ui/Avater";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CodeSync Station",
  description: "Learn to code and collaborate with your team",
}


const layout = async ({ children }) => {

  const session = await auth()

  // const getNotification = async (userId) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/notifications?page=1&owner.id=${userId}`
  //     );
  //     setNotifications(response?.data["hydra:member"]);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const markAsRead = async () => {

  //   try {
  //     const response = await axiosInstance.get(`/notification/mark?owner.id=${getUser().id}`);
  //     getNotification(getUser().id)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



  return (
    <>
      <Toaster />
      <div className={`main-container`}>
        <div
          id="navbarOffcanvas"
          aria-labelledby="navbarOffcanvasLabel"
          className="offcanvas-lg offcanvas-start"
          tabIndex={-1}
        >
          <div className="offcanvas-header d-lg-none d-flex justify-content-between">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              <figure className="logo d-lg-flex position-relative">
                <Image src={logo} alt="Digital dropout logo" />
              </figure>
            </h5>
            <button
              type="button"
              className="btn me-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvas"
              aria-controls="navbarOffcanvas"
            >
              <i className="fa-solid fa-x fs-5"></i>
            </button>
          </div>
          <nav className="sidebar">
            <Link href="/">
              <figure className="logo d-none d-lg-flex mb-0 position-relative">
                <Image src={logo} alt="Logo" width={150} />
              </figure>
            </Link>

            {/* <!-- navigation --> */}
            <Menu />
          </nav>
        </div>

        <main>
          <nav className="dd-navbar sticky-top z-3">
            <button
              className="burger-menu"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvas"
              aria-controls="navbarOffcanvas"
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="right-content">

              {/* <!-- notification container --> */}
              <div className="dropdown notification-container">
                <button
                  className="notification-btn icon-circle overflow-visible"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M3.95154 7.31257C3.95058 6.64573 4.08159 5.98525 4.33702 5.36926C4.59245 4.75323 4.96722 4.19386 5.43964 3.7233C5.91219 3.25274 6.47318 2.88031 7.09019 2.62745C7.70735 2.37463 8.36832 2.24636 9.03519 2.25007C11.8195 2.27118 14.0484 4.58446 14.0484 7.37584V7.87507C14.0484 10.3923 14.5757 11.8548 15.0398 12.6563C15.0891 12.7417 15.1152 12.8385 15.1152 12.9371C15.1153 13.0357 15.0895 13.1325 15.0403 13.218C14.9911 13.3034 14.9204 13.3745 14.8353 13.424C14.75 13.4735 14.6532 13.4997 14.5547 13.5001H3.44534C3.34674 13.4997 3.24992 13.4735 3.16478 13.424C3.0795 13.3745 3.00877 13.3034 2.95961 13.218C2.91045 13.1325 2.88463 13.0357 2.88477 12.9371C2.8849 12.8385 2.91086 12.7417 2.96016 12.6563C3.42419 11.8548 3.95154 10.3923 3.95154 7.87507V7.31257Z"
                      fill="#101840"
                      fillOpacity="0.1"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.38903 7.87506V7.31256C3.38903 7.31256 3.38746 6.19078 3.8174 5.1538C3.8174 5.1538 4.24733 4.11682 5.04276 3.3247C5.04276 3.3247 5.83819 2.53257 6.87695 2.10695C6.87695 2.10695 7.9157 1.68132 9.03826 1.68757C9.03826 1.68757 10.1797 1.69621 11.2191 2.15221C11.2191 2.15221 12.2191 2.59093 12.989 3.3817C12.989 3.3817 13.7558 4.16939 14.1763 5.18509C14.1763 5.18509 14.6109 6.23462 14.6109 7.37584V7.87506C14.6109 7.87506 14.6109 10.7928 15.5266 12.3745C15.5266 12.3745 15.6774 12.6357 15.6777 12.9366C15.6777 12.9366 15.6779 13.2375 15.5279 13.4983C15.5279 13.4983 15.378 13.7592 15.1178 13.9104C15.1178 13.9104 14.8576 14.0615 14.5566 14.0626L3.44528 14.0626C3.44528 14.0626 3.14239 14.0615 2.88219 13.9104C2.88219 13.9104 2.62199 13.7592 2.472 13.4983C2.472 13.4983 2.322 13.2375 2.32227 12.9366C2.32227 12.9366 2.32253 12.6357 2.47299 12.3751C2.47299 12.3751 3.38904 10.7928 3.38903 7.87506ZM4.51403 7.87506C4.51403 7.87506 4.51403 11.095 3.44727 12.9376L14.5527 12.9376C14.5527 12.9376 13.4859 11.0945 13.4859 7.87506V7.37584C13.4859 7.37584 13.4859 5.50493 12.1829 4.16646C12.1829 4.16646 10.8784 2.82654 9.032 2.81255C9.032 2.81255 8.13424 2.80756 7.30349 3.14795C7.30349 3.14795 6.47274 3.48834 5.8366 4.12184C5.8366 4.12184 5.20046 4.75535 4.85662 5.58467C4.85662 5.58467 4.51277 6.41399 4.51403 7.31256V7.87506Z"
                      fill="#101840"
                    />
                    <path
                      d="M11.8125 14.0625V13.5C11.8125 13.1893 11.5607 12.9375 11.25 12.9375C10.9393 12.9375 10.6875 13.1893 10.6875 13.5V14.0625C10.6875 14.7615 10.1932 15.2557 10.1932 15.2557C9.69898 15.75 9 15.75 9 15.75C8.30101 15.75 7.80676 15.2557 7.80676 15.2557C7.3125 14.7615 7.3125 14.0625 7.3125 14.0625V13.5C7.3125 13.1893 7.06066 12.9375 6.75 12.9375C6.43934 12.9375 6.1875 13.1893 6.1875 13.5L6.1875 14.0625C6.1875 15.2275 7.01126 16.0512 7.01126 16.0512C7.83502 16.875 9 16.875 9 16.875C10.165 16.875 10.9887 16.0512 10.9887 16.0512C11.8125 15.2275 11.8125 14.0625 11.8125 14.0625Z"
                      fill="#101840"
                    />
                  </svg>

                  <span className="position-absolute bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                </button>

                {/* <!-- notification dropdown --> */}
                {/* <ul className="dropdown-menu mb-0 pb-0">
                  <div className="notifications">
                    <div className="top">
                      <h2>Notifications</h2>
                      <h3 onClick={markAsRead}>Mark as read</h3>
                    </div>
                    <div className="notificationlist">
                      {notifications.length === 0 ? (
                        <p>No Notification found</p>
                      ) : (
                        notifications.map((item, i) => (
                          <div className="singlenotification" key={i}>
                            <div className="left">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="24"
                                  height="24"
                                  rx="8"
                                  fill="#E7E4F9"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.5228 5.55873C16.5228 5.55873 16.3624 5.38622 16.142 5.3034C16.142 5.3034 15.9215 5.22059 15.6872 5.24487C15.6872 5.24487 15.4529 5.26915 15.252 5.39679L5.6136 11.5874C5.6136 11.5874 5.33076 11.767 5.21327 12.0808C5.21327 12.0808 5.09578 12.3946 5.19092 12.7153L5.82836 14.8726C5.82836 14.8726 5.92297 15.1941 6.19215 15.3936C6.19215 15.3936 6.46133 15.5931 6.79387 15.5902L18.2541 15.5479C18.2541 15.5479 18.4896 15.5459 18.6994 15.4389C18.6994 15.4389 18.9093 15.332 19.0493 15.1426C19.0493 15.1426 19.1894 14.9533 19.2302 14.7213C19.2302 14.7213 19.271 14.4894 19.2042 14.2641L16.7496 5.95718C16.7496 5.95718 16.6831 5.73124 16.5228 5.55873ZM15.7903 6.23954L18.2453 14.548L6.79018 14.5902L6.78767 14.5903L6.14978 12.4315L15.7903 6.23954Z"
                                  fill="#090D1D"
                                />
                                <path
                                  d="M12.0595 16.5513L9.90406 9.25685C9.82581 8.99202 9.97706 8.71391 10.2419 8.63566C10.5067 8.5574 10.7848 8.70865 10.8631 8.97347L13.0185 16.2679C13.1359 16.6652 12.938 17.0291 12.938 17.0291C12.7401 17.3929 12.3428 17.5103 12.3428 17.5103L10.4248 18.0771C10.0276 18.1944 9.6637 17.9966 9.6637 17.9966C9.29982 17.7987 9.18244 17.4014 9.18244 17.4014L8.53954 15.2257C8.46129 14.9609 8.61253 14.6827 8.87736 14.6045C9.14218 14.5262 9.4203 14.6775 9.49855 14.9423L10.1415 17.1181L12.0595 16.5513Z"
                                  fill="#090D1D"
                                />
                              </svg>
                            </div>
                            <div className="right">
                              <p className={item?.read && "fw-normal"}>{item.content}</p>
                              <p className="time">{item.createdAgo}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </ul> */}
              </div>

              {/* <!-- profile  --> */}
              <div className="profile-dropdown btn btn-primary" style={{ width: "38px", position: "relative" }}>
                <Avatar url={session?.user?.image} />
              </div>
            </div>
          </nav>
          {/* <!-- main & aside wrapper --> */}
          {children}
        </main>
      </div>
    </>
  );
};

export default layout;
