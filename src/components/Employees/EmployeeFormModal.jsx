import { useEffect, useState } from "react";

const initialFormState = {
  fullName: "",
  gender: "",
  dob: "",
  state: "",
  profileImage: "",
  isActive: true,
};

const EmployeeFormModal = ({ selectedEmployee, onSave, onClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
      setPreview(selectedEmployee.profileImage);
    } else {
      setFormData(initialFormState);
      setPreview("");
    }
    setError("");
  }, [selectedEmployee]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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

    if (!formData.fullName || !formData.gender || !formData.dob || !formData.state) {
      setError("All fields are required");
      return;
    }

    onSave({
      ...formData,
      id: selectedEmployee ? selectedEmployee.id : Date.now(),
    });
  };

  return (
    <div 
      className="modal modal-backdrop" 
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <select
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              {preview && (
                <div className="mb-3">
                  <img
                    src={preview}
                    alt="Preview"
                    width="80"
                    className="rounded img-preview"
                  />
                </div>
              )}

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActiveCheck"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isActiveCheck">
                  Mark as Active
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {selectedEmployee ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
