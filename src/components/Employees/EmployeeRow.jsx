const EmployeeRow = ({ employee, onEdit, onDelete, onToggleStatus }) => {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>
        {employee.profileImage && (
          <img
            src={employee.profileImage}
            alt="Profile"
            width="40"
            height="40"
            className="rounded-circle"
          />
        )}
      </td>
      <td>{employee.fullName}</td>
      <td>{employee.gender}</td>
      <td>{employee.dob}</td>
      <td>{employee.state}</td>
      <td>
        <input
          type="checkbox"
          checked={employee.isActive}
          onChange={() => onToggleStatus(employee.id)}
        />
      </td>
      <td>
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
