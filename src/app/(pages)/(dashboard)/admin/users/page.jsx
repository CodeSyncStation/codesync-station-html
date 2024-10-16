import UsersPage from "./UsersPage";
  
  
export const metadata = {
  title: "Users || CodeSync station",
  description: "Organize your people here.",
  keywords: ["users", "management", "dashboard"],
}

export default function page() {

  return (
   <UsersPage/>
  )
}