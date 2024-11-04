import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import EditProfile from "./EditProfile";

export default async function page() {
  const session = await auth();
  return (
    <SessionProvider>
      <div className="container pt-4">
        <EditProfile user={session} />
      </div>
    </SessionProvider>
  );
}
