import Avatar from "@/Components/ui/Avater";

import { auth } from "@/auth";

const page = async () => {

  const session = await auth();
  console.log(session)

  return (

    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-8">
        <div class="profile-container shadow-lg p-3 mb-5 bg-white rounded">
          <div class="profile-header text-center mb-4">
            <div class="avatar img-fluid rounded-circle mb-3" >
              <Avatar url={session?.user?.image} />
            </div>
            <h1 class="username">{session?.user?.name ?? "----"}</h1>
            <p class="email">{session?.user?.email ?? "----"}</p>
          </div>

          <div class="profile-details">
            <h2 class="text-center mb-4">Profile Details</h2>
            <ul class="list-unstyled">
              <li><strong>Full Name:</strong> {session?.user?.name ?? "----"}</li>
              <li><strong>Email:</strong> {session?.user?.email ?? "----"} </li>
              <li><strong>Role:</strong> {session?.user?.role ?? "user"}</li>
              {/* <li><strong>Location:</strong> New York, USA</li>
              <li><strong>Joined:</strong> January 1, 2023</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}

export default page
