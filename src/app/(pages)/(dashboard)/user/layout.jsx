
import logo from "@/assets/images/CS LOGO 1-05.png";
import { auth } from "@/auth";
import Menu from "@/Components/layout/Menu";
import ProtectedRoute from "@/Components/layout/ProtectedRoute";
import Avatar from "@/Components/ui/Avater";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { FaBurger, FaX } from "react-icons/fa6";

export const metadata = {
  title: "Dashboard || CodeSync Station",
  description: "Learn to code and collaborate with your team",
}


const layout = async ({ children }) => {

  const session = await auth()


  return (
    <ProtectedRoute>
      <Toaster />
      <div className={`main-container`}>
        <div
          id="navbarOffcanvas"
          aria-labelledby="navbarOffcanvasLabel"
          className="offcanvas-lg offcanvas-start"
          tabIndex={-1}
        >
          <div className="offcanvas-header d-lg-none d-flex justify-content-between">
            <Link href="/" className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              <figure className="logo d-lg-flex position-relative">
                <Image src={logo} alt="codesync station logo" width={70} />
              </figure>
            </Link>
            <button
              type="button"
              className="btn me-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvas"
              aria-controls="navbarOffcanvas"
            >
              <FaX />
              <i className="fa-solid fa-x fs-5"></i>
            </button>
          </div>
          <nav className="sidebar">
            <Link href="/" className="ms-2">
              <figure className="logo d-none d-lg-flex mb-0 position-relative">
                <Image src={logo} alt="Logo" width={60} />
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
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarOffcanvas"
              aria-controls="navbarOffcanvas"
            >
              <FaBurger/>
            </button>

            <div className="right-content">

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
    </ProtectedRoute>
  );
};

export default layout;
