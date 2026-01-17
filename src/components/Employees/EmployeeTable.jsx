import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, onEdit, onDelete, onToggleStatus }) => {
  if (employees.length === 0) {
    return (
      <div className="alert alert-info text-center mt-4 mb-4">
        No employees found
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th className="no-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <EmployeeRow
              key={emp.id}
              employee={emp}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
