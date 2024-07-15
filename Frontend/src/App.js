import React from 'react';
import './App.css'; // Import your app-level CSS (optional)
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from './Registration';
import AdminSidebar from "./Admin/AdminSidebar";
import CreateUser from "./Admin/CreateUser";
import DashBoad from "./Admin/DashBoad";
import AdminHomePage from "./Admin/AdminHomePage.jsx";

import UserSidebar from "./User/UserSidebar.jsx";
import UserHomePage from "./User/UserHomePage.jsx";
import UserAllowance from "./User/UserAllowance";
import UserProfilePage from "./User/UserProfilePage.jsx";
import UserAllowanceStatus from './User/UserAllowanceStatus';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Registration />}></Route>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>


            {/* -------------Admin Page Routing--------------- */}
            <Route
              path="/admin"
              element={<AdminSidebar />} 
            >
              <Route path="/admin/homePage" element={<AdminHomePage />}></Route>
              <Route path="/admin/createUser" element={<CreateUser />}></Route>
              <Route
                path="/admin/dashboad"
                element={<DashBoad />}
              ></Route>
            </Route>

            {/* -------------User Page Routing--------------- */}
            <Route
              path="/user"
              element={<UserSidebar />} >
                <Route path="/user/homePage" element={<UserHomePage />}></Route>
                 <Route path="/user/allowance" element={<UserAllowance />}></Route>
                 <Route path="/user/status" element={<UserAllowanceStatus />}></Route>
                 <Route path="/user/profile" element={<UserProfilePage />}></Route>

            </Route>
            
          </Routes>
        </BrowserRouter>


      
    </div>
  );
}

export default App;
