
"use client"
import adminBanner from "@/assets/images/banner-image-admin.jpeg";
import logo from "@/assets/images/logo.png";
import AdminSidebar from "@/Components/layout/AdminSidebar";
import { signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

export const InterFont = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APIHOST;

const layout = ({ children }) => {

  return (
    <div className={InterFont.className +" admin-layout"}>
      <nav className={`${InterFont.className} navbar navbar-expand-lg bg-body-tertiary admin-navbar sticky-top`}>
        <div className="container-fluid px-5 flex-between">
          <button
            className="navbar-toggler d-lg-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#adminSideBar"
            aria-controls="adminSideBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link href="/admin">
            <figure className="logo d-none d-lg-flex">
              <Image src={logo} alt="Digital dropout" />
            </figure>
          </Link>

          <div className="dropdown">

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <Link className="dropdown-item" href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li onClick={async () => await signOut()}>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`${InterFont.className} admin-main-container container-fluid`}>
        <div className="admin-main-wrapper">
          {/* <!-- banner container --> */}
          <div className="admin-banner-container">
            <div className="banner-image">
              <figure>
                <Image
                  src={adminBanner}
                  alt="Admin banner image"
                />
              </figure>
            </div>
            <div className="flex-between bannar-content">
              <div className="admin-info">
                {/* <!-- profile pic --> */}
                {/* <figure className="profile-pic author-img">
                  {userData.profileImage &&
                  userData?.profileImage.includes("/") ? (
                    <Image src={baseUrl + userData?.profileImage} alt="Profile image" fill />
                  ) : (
                    <Avatar />
                  )}
                </figure> */}
                <span className="profile-name"> name</span>
                <span className="admin-label">admin</span>
              </div>
             
            </div>
          </div>

          {/* <!-- admin sidebar  --> */}
          <AdminSidebar />

          {/* <!-- main content --> */}
          <div className="admin-main-conten">
            <div className="wrapper">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
