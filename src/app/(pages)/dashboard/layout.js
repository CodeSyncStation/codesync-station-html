export const metadata = {
  title: "Dashboard || CodeSync station",
  description: "My App Description",
}
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <header>Dashboard Header</header>
      <main>{children}</main>
      <footer>Dashboard Footer</footer>
    </div>
  )
}