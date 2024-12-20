import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({ children }) {
  const session = await auth();
  if (!session) return redirect("/login")
  return children;
}