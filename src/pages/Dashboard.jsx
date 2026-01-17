import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import { getEmployees, saveEmployees } from "../utils/storage";
import EmployeeForm from "../components/Employees/EmployeeForm";
import EmployeeTable from "../components/Employees/EmployeeTable";


const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleSaveEmployee = (employee) => {
    let updatedEmployees;

    if (selectedEmployee) {
      updatedEmployees = employees.map((emp) =>
        emp.id === employee.id ? employee : emp
      );
      setSelectedEmployee(null);
    } else {
      updatedEmployees = [...employees, employee];
    }

    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
  };

const handleEdit = (employee) => {
  setSelectedEmployee(employee);
};

const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  const updatedEmployees = employees.filter((emp) => emp.id !== id);
  setEmployees(updatedEmployees);
  saveEmployees(updatedEmployees);
};

const handleToggleStatus = (id) => {
  const updatedEmployees = employees.map((emp) =>
    emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
  );

  setEmployees(updatedEmployees);
  saveEmployees(updatedEmployees);
};


  const totalCount = employees.length;
  const activeCount = employees.filter((e) => e.isActive).length;
  const inactiveCount = totalCount - activeCount;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

const [searchText, setSearchText] = useState("");
const [genderFilter, setGenderFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");

const filteredEmployees = employees.filter((emp) => {
  const matchesSearch = emp.fullName
    .toLowerCase()
    .includes(searchText.toLowerCase());

  const matchesGender = genderFilter
    ? emp.gender === genderFilter
    : true;

  const matchesStatus =
    statusFilter === ""
      ? true
      : statusFilter === "active"
      ? emp.isActive
      : !emp.isActive;

  return matchesSearch && matchesGender && matchesStatus;
});


  return (
    
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
<div className="row mb-3">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search by name"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <select
      className="form-control"
      value={genderFilter}
      onChange={(e) => setGenderFilter(e.target.value)}
    >
      <option value="">All Genders</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>

  <div className="col-md-4">
    <select
      className="form-control"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>
</div>

<button
  className="btn btn-secondary mb-3"
  onClick={() => window.print()}
>
  Print Employees
</button>


      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Total</h6>
            <h3>{totalCount}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Active</h6>
            <h3>{activeCount}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Inactive</h6>
            <h3>{inactiveCount}</h3>
          </div>
        </div>
      </div>

      <EmployeeForm
        onSave={handleSaveEmployee}
        selectedEmployee={selectedEmployee}
      />
<div id="print-section">
  <EmployeeTable
    employees={filteredEmployees}
    onEdit={handleEdit}
    onDelete={handleDelete}
    onToggleStatus={handleToggleStatus}
  />
</div>




      {/* Table comes next */}
    </div>
  );
};

export default Dashboard;
