"use client"

import logo from "@/assets/images/logo.png";
import Avatar from "@/Components/ui/Avater";
import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
export const InterFont = Inter({ subsets: ["latin"] });

export default function AdminNavbar() {


  const { data: userData } = useSession()
  const handleLogout = async () => {
    await signOut({ redirect: "/" });
  };

  return (
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

        <div
          className="d-xl-flex d-none justify-content-center align-items-center gap-3"
        >
          <div className="dropdown">
            {
              userData &&
              <Dropdown align="end">
                <Dropdown.Toggle id="dropdown-basic" className="profile-dropdown">
                  <Avatar url={userData?.image} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link className="dropdown-item" href={userData?.role === "admin" ? "/admin" : "/user/profile"}>
                    <span className="icon me-2">
                      <MdOutlineSpaceDashboard />
                    </span>
                    Dashboard
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item as="button" className="logout-btn" onClick={handleLogout}>
                    <span className="icon me-2">
                      <AiOutlineLogout />
                    </span>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
          </div>


        </div>


      </div>
    </nav>
  )
}