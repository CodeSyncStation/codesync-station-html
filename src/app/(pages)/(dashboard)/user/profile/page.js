import { SessionProvider } from "next-auth/react";
import Profile from "./Profile";

export const metadata = {
  title: "Profile || CodeSync Station",
  description: "Learn to code and collaborate with your team",
};

export default function page() {
  return (
    <SessionProvider>
      <Profile />;
    </SessionProvider>
  );
}
