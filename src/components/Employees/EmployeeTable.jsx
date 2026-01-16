import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, onEdit, onDelete, onToggleStatus }) => {
  if (employees.length === 0) {
    return <p className="text-center mt-3">No employees found</p>;
  }

  return (
    <table className="table table-bordered mt-3">
      <thead className="table-light">
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
  );
};

export default EmployeeTable;
