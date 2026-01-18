import { useEffect, useState } from "react";
import { getEmployees } from "../utils/storage";
import MainLayout from "../layout/MainLayout";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const totalCount = employees.length;
  const activeCount = employees.filter((e) => e.isActive).length;
  const inactiveCount = totalCount - activeCount;

  return (
    <MainLayout>
      <div className="container">
        {/* Header Section */}
        <div className="mb-5">
          <h2>Dashboard</h2>
          <p className="text-muted">Overview of employee statistics</p>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card p-4">
              <p>Total Employees</p>
              <h3>{totalCount}</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card p-4">
              <p>Active Employees</p>
              <h3>{activeCount}</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card p-4">
              <p>Inactive Employees</p>
              <h3>{inactiveCount}</h3>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
