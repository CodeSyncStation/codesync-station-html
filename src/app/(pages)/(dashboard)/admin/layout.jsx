
import adminBanner from "@/assets/images/banner-image-admin.jpeg";
import { auth } from "@/auth";
import AdminNavbar from "@/Components/layout/AdminNavbar";
import AdminSidebar from "@/Components/layout/AdminSidebar";
import ProtectAdmin from "@/Components/layout/ProtectAdmin";
import Avatar from "@/Components/ui/Avater";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export const InterFont = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APIHOST;

const layout = async ({ children }) => {
  const { user: userData } = await auth()

  return (
    <ProtectAdmin>
      <Toaster />
      <div className={InterFont.className + " admin-layout hide-scrollbar"}>
        <SessionProvider>
          <AdminNavbar />
        </SessionProvider>

        <div className={`${InterFont.className} admin-main-container container-fluid hide-scrollbar`}>
          <div className="admin-main-wrapper hide-scrollbar">
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
              <div className="flex-between bannar-content ">
                <div className="admin-info">
                  {/* <!-- profile pic --> */}
                  <figure className="profile-pic author-img">
                    <Avatar url={userData?.image} />
                  </figure>
                  <span className="profile-name"> {userData?.fullName} </span>
                  <span className="admin-label">admin</span>
                </div>
                <div className="mb-4 mb-sm-0">
                  {/* <Link href="/course/add">
                    <button className="btn-dashboard">Create New Course</button>
                  </Link> */}
                </div>
              </div>
            </div>

            {/* <!-- admin sidebar  --> */}
            <AdminSidebar />

            {/* <!-- main content --> */}
            <div className="admin-main-conten hide-scrollbar">
              <div className="wrapper hide-scrollbar">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </ProtectAdmin>

  );
};

export default layout;
