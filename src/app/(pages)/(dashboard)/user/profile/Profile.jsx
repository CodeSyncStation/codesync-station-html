
import Avatar from "@/Components/ui/Avater";
import { getUser } from "@/lib/fetch/users";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
export default async function Profile({ session }) {

  if (!session) {
    return <div>Loading...</div>
  }

  const user = await getUser(session?.user?._id)

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-sm-8">
        <div className="profile-container shadow-lg p-3 mb-5 bg-white rounded">
          <div className="profile-header text-center mb-4">
            <div className="avatar img-fluid rounded-circle mb-3">
              <Avatar url={user?.image} />
            </div>
            <h1 className="username">{user?.name ?? "----"}</h1>
            <p className="email">{user?.email ?? "----"}</p>
          </div>

          <div className="profile-details">
            <h2 className="text-center mb-4">Profile Details</h2>
            <ul className="list-unstyled">
              <li>
                <strong>Full Name:</strong> {user?.name ?? "----"}
              </li>
              <li>
                <strong>Email:</strong> {user?.email ?? "----"}{" "}
              </li>
              <li>
                <strong>Phone:</strong> {user?.phone ?? "----"}{" "}
              </li>
              {/* <li><strong>Location:</strong> New York, USA</li>
            <li><strong>Joined:</strong> January 1, 2023</li> */}
            </ul>
            <div className="text-end mt-5">
              <Link href="/user/profile/edit" className="btn btn-secondary">
                <span className="icon me-2">
                  <FaPencil />
                </span>
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}