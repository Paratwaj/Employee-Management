import { useEffect, useState } from "react";

const initialFormState = {
  fullName: "",
  gender: "",
  dob: "",
  state: "",
  profileImage: "",
  isActive: true,
};

const EmployeeForm = ({ onSave, selectedEmployee }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
      setPreview(selectedEmployee.profileImage);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.gender ||
      !formData.dob ||
      !formData.state
    ) {
      setError("All fields are required");
      return;
    }

    onSave({
      ...formData,
      id: selectedEmployee ? selectedEmployee.id : Date.now(),
    });

    setFormData(initialFormState);
    setPreview("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded mb-4">
      <h5>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h5>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-2">
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label>Gender</label>
        <select
          className="form-control"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Date of Birth</label>
        <input
          type="date"
          className="form-control"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label>State</label>
        <select
          className="form-control"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Profile Image</label>
        <input type="file" className="form-control" onChange={handleImageChange} />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          width="80"
          className="mt-2 rounded"
        />
      )}

      <div className="form-check mt-2">
        <input
          type="checkbox"
          className="form-check-input"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        <label className="form-check-label">Active</label>
      </div>

      <button className="btn btn-success mt-3">
        {selectedEmployee ? "Update" : "Add"} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
