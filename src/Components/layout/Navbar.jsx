"use client"
import logo from "@/assets/images/CodeSync_Station.png"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function Navbar() {
  useEffect(() => {
    // Get all the sections and the nav links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = null;

      // Loop through sections to get current section in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      // Remove 'active' class from all links and add to the one in view
      navLinks.forEach(link => {
        link.classList.remove("active_nav_link");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active_nav_link");
        } else {
          link.classList.remove("active_nav_link");
        }
      });
    });

  }, [])

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
            className="navbar-toggler"
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
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>

          <div
            className="offcanvas flex-1 offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close me-4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >

              </button>
            </div>

            <div className="offcanvas-body ">
              <div className="d-flex justify-content-between w-100">
                <ul className="navbar-nav mx-auto mb-2 mt-lg-2">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" href="/#hero"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/#about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/#services">Services</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/#portfolio">Portfolio </Link>
                  </li>



                  <li className="nav-item">
                    <Link className="nav-link" href="/#inverstor">Career</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/#testimonials">FAQ</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/#contact">Contact</Link>
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