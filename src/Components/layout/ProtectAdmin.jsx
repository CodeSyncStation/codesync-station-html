import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectAdmin({ children }) {
  const session = await auth();
  if (!session) return redirect("/login")
  if(session.user?.role !== "admin") return redirect("/login");
  return children;
}