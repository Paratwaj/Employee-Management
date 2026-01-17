import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <nav className={`sidebar ${isOpen ? "show" : ""}`}>
      <div className="sidebar-header">
        <h5>HR Admin</h5>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
            onClick={handleNavClick}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/employees"
            className={`nav-link ${isActive("/employees") ? "active" : ""}`}
            onClick={handleNavClick}
          >
            Employees
          </Link>
        </li>
      </ul>

      <button className="btn btn-danger btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Sidebar;
