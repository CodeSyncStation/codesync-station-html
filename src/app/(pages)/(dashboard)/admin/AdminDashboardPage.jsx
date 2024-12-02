
export default function AdminDashboardPage({ statistics }) {

  const { userCount, orderCount, totalIncome } = statistics || {};

  return (
    <section className="mb-3 overview">

      <div className="business-overview-container">
        <div className="business-overview-card">
          <h3 className="title">total users</h3>
          <span className="count">৳ {userCount}</span>
          {/* <div className="flex-between">
          <span className="label"> Earning this month </span>
          <span className="monthly-revenue">$203.23</span>
        </div> */}
        </div>

        <div className="business-overview-card">
          <h3 className="title">Total Orders</h3>
          <span className="count">{orderCount}</span>
          {/* <div className="flex-between">
          <span className="label"> Enrolled this month </span>
          <span className="monthly-revenue bg-sky">$203.23</span>
        </div> */}
        </div>

        <div className="business-overview-card">
          <h3 className="title">Total income</h3>
          <span className="count">{totalIncome}</span>
          {/* <div className="flex-between">
          <span className="label"> Sold this month </span>
          <span className="monthly-revenue bg-orange">$203.23</span>
        </div> */}
        </div>
      </div>
    </section>
  )
}