import { NavLink, Outlet, useNavigate} from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import "../Admin/AdminSidebar.css";


const UserSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
     <Header />
    <div className="layout">
    
      <nav className="dashboard">
        <h2 onClick={() => navigate("/user/homePage")}> User Page </h2>
        <ul>
          <li>
            <NavLink to="/user/allowance">Allowance</NavLink>
          </li>
          <li>
            <NavLink to="/user/status">Allowance Status</NavLink>
          </li>
          <li>
            <NavLink to="/user/profile">Profile Page</NavLink>
          </li>
        </ul>
        <button className="logoutbtn" onClick={handleLogout}>
          Logout <MdLogout />
        </button>
      </nav>
      <div className="main-content">
        <Outlet />
        {/* <Navigate to="/admin/createUser" /> */}
      </div>
      <Footer />
    </div>
    </>
  );
};

export default UserSidebar;