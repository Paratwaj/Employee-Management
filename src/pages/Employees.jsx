import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import EmployeeTable from "../components/Employees/EmployeeTable";
import EmployeeFormModal from "../components/Employees/EmployeeFormModal";
import { getEmployees, saveEmployees } from "../utils/storage";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    setEmployees(getEmployees());
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesGender = genderFilter ? emp.gender === genderFilter : true;

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
        ? emp.isActive
        : !emp.isActive;

    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

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

  const handleSaveEmployee = (employee) => {
    let updatedEmployees;

    if (selectedEmployee) {
      updatedEmployees = employees.map((emp) =>
        emp.id === employee.id ? employee : emp
      );
    } else {
      updatedEmployees = [...employees, employee];
    }

    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <MainLayout>
      <div className="container-fluid">
        {/* Header Section */}
        <div className="page-header mb-4">
          <h2 className="mb-0">Employees</h2>
          <button className="btn btn-primary" onClick={handleAddClick}>
            + Add Employee
          </button>
        </div>

        {/* Filters Section */}
        <div className="row g-3 mb-4 filter-row">
          <div className="col-12 col-sm-4 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="col-12 col-sm-4 col-md-4">
            <select
              className="form-control"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">Filter by Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-12 col-sm-4 col-md-4">
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Print Button */}
        <div className="mb-4">
          <button className="btn btn-secondary" onClick={handlePrint}>
            Print List
          </button>
        </div>

        {/* Employee Table */}
        <div id="print-section">
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>

      {/* Employee Form Modal */}
      {showModal && (
        <EmployeeFormModal
          selectedEmployee={selectedEmployee}
          onSave={handleSaveEmployee}
          onClose={() => setShowModal(false)}
        />
      )}
    </MainLayout>
  );
};

export default Employees;
