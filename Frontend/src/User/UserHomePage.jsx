import { Outlet } from "react-router-dom";
import React from "react";

import 'react-toastify/dist/ReactToastify.css';
import Header from "../Header.jsx";
// import "./DashBoad.css";  // Import the CSS file
import Employee from "../assets/employee.jpg"
import '../Admin/AdminHomePage.css';

const AdminHomePage = () => {
    return (
        <>
            <main >
                <Header />
                
                
                <div className="Adminpic">
                    
                    <img src={Employee} alt="Admin" />

                    
                    <div className="right">
                        <h1>Welcome to User Page</h1>
                        
                    </div>
                </div>
            </main>
            <Outlet />
            
        </>
    );
};

export default AdminHomePage;

