import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icon
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { useState } from "react"; // Import useState hook
import "../Admin/AdminSidebar.css";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar
  };

  return (
    <>
      <Header />
      <div className="layout">
        <nav className={`dashboard ${sidebarOpen ? "open" : ""}`}>
          <button className="closebtn" onClick={closeSidebar}>
            <FaTimes />
          </button>
          <h2 onClick={() => { navigate("/user/homePage"); closeSidebar(); }}> User Page </h2>
          <ul>
            <li>
              <NavLink to="/user/allowance" onClick={closeSidebar}>Allowance</NavLink>
            </li>
            <li>
              <NavLink to="/user/status" onClick={closeSidebar}>Allowance Status</NavLink>
            </li>
            <li>
              <NavLink to="/user/profile" onClick={closeSidebar}>Profile Page</NavLink>
            </li>
          </ul>
          <button className="logoutbtn" onClick={handleLogout}>
            Logout <MdLogout />
          </button>
        </nav>
        <div className="main-content">
          {!sidebarOpen && (
            <button className="hamburger" onClick={toggleSidebar}>
              <FaBars />
            </button>
          )}
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserSidebar;
