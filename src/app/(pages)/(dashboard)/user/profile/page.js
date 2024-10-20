import Avatar from "@/Components/ui/Avater";

export default function Profile() {
  return (
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-8">
        <div class="profile-container shadow-lg p-3 mb-5 bg-white rounded">
          <div class="profile-header text-center mb-4">
            <div class="avatar img-fluid rounded-circle mb-3" >
              <Avatar />
            </div>
            <h1 class="username">John Doe</h1>
            <p class="email">johndoe@example.com</p>
          </div>

          <div class="profile-details">
            <h2 class="text-center mb-4">Profile Details</h2>
            <ul class="list-unstyled">
              <li><strong>Full Name:</strong> John Doe</li>
              <li><strong>Email:</strong> johndoe@example.com</li>
              <li><strong>Phone Number:</strong> +123 456 789</li>
              <li><strong>Location:</strong> New York, USA</li>
              <li><strong>Joined:</strong> January 1, 2023</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}