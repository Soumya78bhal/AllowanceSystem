import { Outlet } from "react-router-dom";
import React from "react";

import 'react-toastify/dist/ReactToastify.css';

// import "./DashBoad.css";  // Import the CSS file
import Employee from "../assets/employee.jpg"
import '../Admin/AdminHomePage.css';
import { useSelector } from "react-redux";
import { selectUser } from "../Feature/Userslice.js";

const AdminHomePage = () => {
    const user = useSelector(selectUser);
    return (
        <>
            <main >
                
                <div className="Adminpic">
                    
                    <img src={Employee} alt="Admin" />

                    
                    <div className="right">
                        <h1>Welcome to User Page {user.username}</h1>
                        
                    </div>
                </div>
            </main>
            <Outlet />
            
        </>
    );
};

export default AdminHomePage;

