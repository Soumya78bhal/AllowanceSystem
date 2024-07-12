import { Outlet } from "react-router-dom";
import React from "react";

import 'react-toastify/dist/ReactToastify.css';
import Header from "../Header.jsx";
import "./DashBoad.css";  // Import the CSS file
import Admin from "../assets/admin.jpg"
import './AdminHomePage.css';

const AdminHomePage = () => {
    return (
        <>
            <main >
                <Header />
                
                <div className="Adminpic">
                    
                    <img src={Admin} alt="Admin" />

                    
                    <div className="right">
                        <h1>Welcome to Admin Page</h1>
                        
                    </div>
                </div>
            </main>
            <Outlet />
            
        </>
    );
};

export default AdminHomePage;
