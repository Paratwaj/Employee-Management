import { useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/MainLayout.css";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="main-layout">
      <div className="mobile-header">
        <button
          className="btn-hamburger"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h5 className="mobile-title">Employee Management</h5>
      </div>
     {sidebarOpen && (
  <div
    className="sidebar-overlay d-md-none"
    onClick={closeSidebar}
  ></div>
)}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
