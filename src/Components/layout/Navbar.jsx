"use client"
import logo from "@/assets/images/CodeSync_Station.png"
import Image from "next/image"

export default function Navbar() {

  return (
    <header id="header">
      <nav id="navbar" className="navbar navbar-expand-xl p-0 py-lg-1">
        <div className="container">
          <a className="logo" href="#hero">
            <Image
              src={logo}
              alt="Codesync station"
            />
          </a>

          <div
            className="d-flex d-xl-none justify-content-center align-items-center gap-3"
          >
            <button
              href="#"
              className="animated-btn"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-title="Click to call"
            >
              <i className="fa-solid fa-phone"></i>
              Order Now
            </button>
          </div>

          <button
            className="navbar-toggler ps-5"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>

          <div
            className="offcanvas flex-1 offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </div>

            <div className="offcanvas-body ">
              <div className="d-flex justify-content-between w-100">
                <ul className="navbar-nav mx-auto mb-2 mt-lg-2">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#hero"
                    >Home</a
                    >
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">Service</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#portfolio">About us </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#services">Contact</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#inverstor">Career</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#testimonials">FAQ</a>
                  </li>
                </ul>

                <div
                  className="d-xl-flex d-none justify-content-center align-items-center gap-3"
                >
                  <a
                    href="tell:+447738940597"
                    className="animated-btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-title="Click to call"
                  >
                    Order Now +
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}