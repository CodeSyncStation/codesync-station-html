import { auth } from "@/auth";
import { getUser } from "@/lib/fetch/users";
import EditProfile from "./EditProfile";

export default async function page() {
  const session = await auth();
  const user = await getUser(session?.user?._id);
  return (
    <div className="container pt-4">
      <EditProfile user={user} />
    </div>
  );
}
