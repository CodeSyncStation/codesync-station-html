import { auth } from "@/auth";
import Profile from "./Profile";

export const metadata = {
  title: "Profile || CodeSync Station",
  description: "Learn to code and collaborate with your team",
};

export default async function page() {
  const session = await auth();
  return <Profile session={session} />;
}
