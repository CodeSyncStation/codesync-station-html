import { getAllUsers } from "@/lib/fetch/users";
import UsersPage from "./UsersPage";
  
  
export const metadata = {
  title: "Users || CodeSync station",
  description: "Organize your people here.",
  keywords: ["users", "management", "dashboard"],
}

export default async function page() {
  const users = await getAllUsers();
  return (
   <UsersPage  users={users}/>
  )
}