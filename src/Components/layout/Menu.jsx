"use client"

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";

const Menu = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="nav-wrapper">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            className={`nav-link ${isActive("/user") ? "active" : ""}`}
            aria-current="page"
            href="/user"
          >
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12H4.125V4.875C4.125 4.67606 4.20401 4.48535 4.34464 4.34464C4.48535 4.20401 4.67606 4.125 4.875 4.125H12V12Z" fill="#090D1D" fill-opacity="0.1" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.375 4.875C3.375 4.875 3.375 4.25368 3.81434 3.81434C3.81434 3.81434 4.25368 3.375 4.875 3.375H19.125C19.125 3.375 19.7463 3.375 20.1857 3.81434C20.1857 3.81434 20.625 4.25368 20.625 4.875V19.125C20.625 19.125 20.625 19.7463 20.1857 20.1857C20.1857 20.1857 19.7463 20.625 19.125 20.625H4.875C4.875 20.625 4.25368 20.625 3.81434 20.1857C3.81434 20.1857 3.375 19.7463 3.375 19.125V4.875ZM4.875 4.875V19.125H19.125V4.875H4.875Z" fill="#090D1D" />
                <path d="M11.25 4.125V19.875C11.25 20.2892 11.5858 20.625 12 20.625C12.4142 20.625 12.75 20.2892 12.75 19.875V4.125C12.75 3.71079 12.4142 3.375 12 3.375C11.5858 3.375 11.25 3.71079 11.25 4.125Z" fill="#090D1D" />
                <path d="M19.875 11.25H4.125C3.71079 11.25 3.375 11.5858 3.375 12C3.375 12.4142 3.71079 12.75 4.125 12.75H19.875C20.2892 12.75 20.625 12.4142 20.625 12C20.625 11.5858 20.2892 11.25 19.875 11.25Z" fill="#090D1D" />
              </svg>
            </span>
            <span className="label">Dashboard</span>
          </Link>
        </li>


        <li className="nav-item">
          <Link className={`nav-link ${isActive("/user/order-history") ? "active" : ""}`} href="/user/order-history">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 7.5H21V5.25C21 5.05115 20.921 4.86035 20.7803 4.71973C20.6397 4.5791 20.4489 4.5 20.25 4.5H3.75C3.55109 4.5 3.36032 4.5791 3.21967 4.71973C3.07902 4.86035 3 5.05115 3 5.25V7.5Z" fill="#101840" fill-opacity="0.1" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 5.25C2.25 5.25 2.25 4.62868 2.68934 4.18934C2.68934 4.18934 3.12868 3.75 3.75 3.75H20.25C20.25 3.75 20.8713 3.75 21.3107 4.18934C21.3107 4.18934 21.75 4.62868 21.75 5.25V18.75C21.75 18.75 21.75 19.3713 21.3107 19.8107C21.3107 19.8107 20.8713 20.25 20.25 20.25H3.75C3.75 20.25 3.12868 20.25 2.68934 19.8107C2.68934 19.8107 2.25 19.3713 2.25 18.75V5.25ZM3.75 5.25V18.75H20.25V5.25H3.75Z" fill="#090D1D" />
                <path d="M3 8.25H21C21.4142 8.25 21.75 7.91421 21.75 7.5C21.75 7.08579 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 7.08579 2.25 7.5C2.25 7.91421 2.58579 8.25 3 8.25Z" fill="#090D1D" />
                <path d="M9.87868 12.6213C9 11.7426 9 10.5 9 10.5C9 10.0858 8.66421 9.75 8.25 9.75C7.83579 9.75 7.5 10.0858 7.5 10.5C7.5 12.364 8.81802 13.682 8.81802 13.682C10.136 15 12 15 12 15C13.864 15 15.182 13.682 15.182 13.682C16.5 12.364 16.5 10.5 16.5 10.5C16.5 10.0858 16.1642 9.75 15.75 9.75C15.3358 9.75 15 10.0858 15 10.5C15 11.7426 14.1213 12.6213 14.1213 12.6213C13.2426 13.5 12 13.5 12 13.5C10.7574 13.5 9.87868 12.6213 9.87868 12.6213Z" fill="#090D1D" />
              </svg>
            </span>
            <span className="label">Order History</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className={`nav-link ${isActive("/settings") ? "active" : ""}`} href="/settings" >
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8566 11.5218C19.8566 11.5218 19.8848 12.1592 19.8566 12.478L21.413 14.5499C21.1962 15.3571 20.8746 16.1324 20.4566 16.8562L17.8973 17.2217C17.8973 17.2217 17.4566 17.6812 17.2222 17.8968L16.8566 20.4561C16.1324 20.8731 15.3573 21.1946 14.5504 21.4124L12.4785 19.8562C12.1605 19.8843 11.8404 19.8843 11.5223 19.8562L9.45032 21.4124C8.64319 21.1956 7.86792 20.8741 7.1441 20.4561L6.77844 17.8968C6.54718 17.6843 6.32233 17.4593 6.10352 17.2217L3.54407 16.8562C3.12714 16.1319 2.80579 15.3567 2.58789 14.5499L4.1441 12.478C4.1441 12.478 4.12543 11.8405 4.1441 11.5218L2.58789 9.44992C2.80469 8.6427 3.12622 7.86743 3.54407 7.14362L6.10352 6.77805C6.32233 6.54678 6.54718 6.32175 6.77844 6.10303L7.1441 3.54367C7.86829 3.12665 8.64355 2.80521 9.45032 2.5874L11.5223 4.14362C11.8404 4.11551 12.1605 4.11551 12.4785 4.14362L14.5504 2.5874C15.3575 2.8042 16.1329 3.12564 16.8566 3.54367L17.2222 6.10303C17.4535 6.32175 17.6785 6.54678 17.8973 6.77805L20.4566 7.14362C20.8737 7.86789 21.1951 8.64307 21.413 9.44992L19.8566 11.5218ZM9.50031 15.7415C10.2404 16.236 11.1104 16.4999 12.0004 16.4999C13.1939 16.4999 14.3385 16.0258 15.1824 15.1819C16.0264 14.338 16.5004 13.1934 16.5004 11.9999C16.5004 11.1099 16.2364 10.2398 15.742 9.49982C15.2476 8.7598 14.5447 8.18301 13.7225 7.84244C12.9002 7.50186 11.9955 7.41278 11.1224 7.58636C10.2496 7.76004 9.44775 8.1886 8.81842 8.81793C8.18909 9.44727 7.76044 10.2491 7.58685 11.122C7.41327 11.9949 7.50226 12.8997 7.84302 13.722C8.18359 14.5443 8.76038 15.247 9.50031 15.7415Z" fill="#101840" fill-opacity="0.1" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.75C12 6.75 14.1746 6.75 15.7123 8.28769C15.7123 8.28769 17.25 9.82538 17.25 12C17.25 12 17.25 14.1746 15.7123 15.7123C15.7123 15.7123 14.1746 17.25 12 17.25C12 17.25 9.82538 17.25 8.28769 15.7123C8.28769 15.7123 6.75 14.1746 6.75 12C6.75 12 6.75 9.82538 8.28769 8.28769C8.28769 8.28769 9.82538 6.75 12 6.75ZM12 8.25C12 8.25 10.4467 8.25 9.34835 9.34835C9.34835 9.34835 8.25 10.4467 8.25 12C8.25 12 8.25 13.5533 9.34835 14.6517C9.34835 14.6517 10.4467 15.75 12 15.75C12 15.75 13.5533 15.75 14.6517 14.6517C14.6517 14.6517 15.75 13.5533 15.75 12C15.75 12 15.75 10.4467 14.6517 9.34835C14.6517 9.34835 13.5533 8.25 12 8.25Z" fill="#090D1D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5991 3.43759L17.9276 5.73697C17.9276 5.73697 18.0998 5.90262 18.2635 6.07274L20.5627 6.4012C20.791 6.4338 20.9915 6.56959 21.1066 6.76941C21.1066 6.76941 21.7834 7.94488 22.137 9.25444C22.1972 9.47741 22.1513 9.71568 22.0126 9.90034L20.6158 11.7599C20.6158 11.7599 20.6234 12.0327 20.6189 12.244L22.0126 14.0995C22.1511 14.2839 22.197 14.5217 22.1372 14.7445C22.1372 14.7445 21.7851 16.0556 21.1061 17.2312C20.991 17.4306 20.7906 17.5661 20.5627 17.5986L18.258 17.9279C18.258 17.9279 18.0724 18.1185 17.928 18.26L17.5991 20.5622C17.5665 20.7905 17.4307 20.9911 17.2309 21.1061C17.2309 21.1061 16.0554 21.783 14.7459 22.1365C14.5229 22.1967 14.2846 22.1508 14.1 22.0121L12.2497 20.6223C12.2497 20.6223 12.0004 20.6324 11.7511 20.6223L9.90083 22.0121C9.71644 22.1506 9.47857 22.1966 9.25585 22.1367C9.25585 22.1367 7.94472 21.7846 6.76907 21.1056C6.56969 20.9905 6.43425 20.7901 6.40168 20.5622L6.07262 18.2588C6.07262 18.2588 5.90493 18.0954 5.74155 17.9277L3.43808 17.5986C3.20982 17.566 3.00925 17.4302 2.8942 17.2304C2.8942 17.2304 2.21734 16.0549 1.86382 14.7454C1.80362 14.5224 1.84952 14.2841 1.98822 14.0995L3.38803 12.2359C3.38803 12.2359 3.38298 11.967 3.38593 11.7612L1.98822 9.90034C1.84972 9.71595 1.80375 9.47809 1.86357 9.25536C1.86357 9.25536 2.21573 7.94422 2.89467 6.76858C3.00982 6.5692 3.21016 6.43376 3.43808 6.4012L5.74155 6.07213C5.74155 6.07213 5.90492 5.90444 6.07262 5.74106L6.40168 3.43759C6.43429 3.20934 6.57008 3.00876 6.7699 2.89371C6.7699 2.89371 7.94538 2.21685 9.25493 1.86333C9.4779 1.80314 9.71617 1.84903 9.90083 1.98773L11.7511 3.37756C11.7511 3.37756 12.0004 3.36747 12.2497 3.37756L14.1 1.98773C14.2844 1.84923 14.5222 1.80326 14.7449 1.86308C14.7449 1.86308 16.0561 2.21524 17.2317 2.89418C17.4311 3.00933 17.5665 3.20967 17.5991 3.43759ZM16.4798 6.2091L16.1671 4.01983C16.1671 4.01983 15.4617 3.64952 14.7014 3.41203L12.929 4.74333C12.7809 4.85455 12.5969 4.90705 12.4125 4.89074C12.4125 4.89074 12.0004 4.85431 11.5883 4.89074C11.4039 4.90705 11.2199 4.85455 11.0718 4.74333L9.29986 3.41234C9.29986 3.41234 8.5395 3.6506 7.83366 4.02034L7.52098 6.2091C7.49703 6.37681 7.41699 6.53147 7.29392 6.64788C7.29392 6.64788 6.96218 6.96169 6.64837 7.29343C6.53195 7.41651 6.3773 7.49654 6.20959 7.5205L4.02032 7.83325C4.02032 7.83325 3.65001 8.53857 3.41252 9.29895L4.74382 11.0714C4.85047 11.2133 4.90328 11.3886 4.89285 11.5658C4.89285 11.5658 4.87605 11.8516 4.89382 12.456C4.89882 12.6259 4.84593 12.7925 4.74382 12.9285L3.41283 14.7004C3.41283 14.7004 3.65109 15.4608 4.02083 16.1666L6.20959 16.4793C6.3773 16.5033 6.53195 16.5833 6.64837 16.7064C6.64837 16.7064 6.96219 17.0381 7.29392 17.3519C7.41699 17.4683 7.49703 17.623 7.52098 17.7907L7.83374 19.98C7.83374 19.98 8.53906 20.3503 9.29944 20.5878L11.0718 19.2565C11.2199 19.1453 11.4039 19.0928 11.5883 19.1091C11.5883 19.1091 12.0004 19.1455 12.4125 19.1091C12.5969 19.0928 12.7809 19.1453 12.929 19.2565L14.7009 20.5875C14.7009 20.5875 15.4613 20.3492 16.1671 19.9795L16.4798 17.7907C16.5043 17.6195 16.5872 17.462 16.7145 17.3448C16.7145 17.3448 16.9316 17.1451 17.356 16.7026C17.472 16.5816 17.6253 16.503 17.7912 16.4793L19.9805 16.1666C19.9805 16.1666 20.3508 15.4612 20.5883 14.7009L19.257 12.9285C19.1458 12.7804 19.0933 12.5965 19.1095 12.4121C19.1095 12.4121 19.1333 12.1428 19.1074 11.5548C19.0997 11.3812 19.1526 11.2103 19.257 11.0714L20.588 9.29937C20.588 9.29937 20.3497 8.53901 19.98 7.83318L17.7912 7.5205C17.6198 7.49601 17.4622 7.41298 17.345 7.2855C17.345 7.2855 17.0474 6.96164 16.7142 6.65469C16.587 6.5376 16.5043 6.3802 16.4798 6.2091Z" fill="#090D1D" />
              </svg>
            </span>
            <span className="label">Settings</span>
          </Link>
        </li>


      </ul>

      <ul className="nav flex-column w-100 mb-2">

        <li className="nav-item">
          <Link className={`nav-link `} href="/" >
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
            </span>
            <span className="label">Home</span>
          </Link>
        </li>

        <li onClick={async () => await signOut()} className="nav-item">
          <Link href="#" className="logout-btn nav-link">
            <span className="icon me-2">
              <AiOutlineLogout />
            </span>
            <span className="label">
              Logout
            </span>
          </Link>

        </li>

      </ul>
    </div>
  );
};

export default Menu;
