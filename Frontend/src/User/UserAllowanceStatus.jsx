import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import './UserAllowanceStatus.css';
import { FaArrowLeft } from "react-icons/fa";


const data = [
    {
      Employee_ID: "E001",
      Employee_Name: "John Doe",
      Allowance_No: "001",
      Allowance_Type: "Travel",
      Apply_Date: "2024-07-10",
      Amount: 150,
      Description: "Business trip to NYC",
      Status: "Approved"
    },
    {
      Employee_ID: "E002",
      Employee_Name: "Jane Smith",
      Allowance_No: "002",
      Allowance_Type: "Food",
      Apply_Date: "2024-07-11",
      Amount: 50,
      Description: "Client meeting lunch",
      Status: "Pending"
    },
    {
      Employee_ID: "E003",
      Employee_Name: "Sam Brown",
      Allowance_No: "003",
      Allowance_Type: "Accommodation",
      Apply_Date: "2024-07-12",
      Amount: 300,
      Description: "Hotel stay for conference",
      Status: "Rejected"
    }
  ];



const UserAllowanceSataus = () => {
    const [toggle, setToggle] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleUpdatePlan = (employee) => {
        setSelectedEmployee(employee);
        setToggle(1); // Switch to update mode
    };

    return (
        <>
            <main className="UserAllowance">
                

                {toggle === 0 && (
                    <>
                        <div className="table-responsive">
                            <div className="activate_deactivateCont" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table className="table table-bordered historyTable">
                                    <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                        <tr>
                                            <th scope="col">Sl no.</th>
                                            <th scope="col">Allowance Number</th>
                                            <th scope="col">Allowance Type</th>
                                            <th scope="col">Apply Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.Allowance_No}</td>
                                                <td>{item.Allowance_Type}</td>
                                                <td>{item.Apply_Date}</td>
                                                <td>{item.Status}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => handleUpdatePlan(item)}
                                                    >
                                                        View
                                                    </button>
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />
                    </>
                )}

                {toggle === 1 && selectedEmployee && (
                    <>
                        <div>
                            <button className="btn btn-secondary" onClick={() => setToggle(0)}>
                            <FaArrowLeft /> Go Back
                            </button>
                            <div className="details-container">
                                <h1>Allowance Status</h1>
                                <table className="details-table">
                                    <tbody>
                                        <tr>
                                            <th>Employee ID</th>
                                            <td>{selectedEmployee.Employee_ID}</td>
                                        </tr>
                                        <tr>
                                            <th>Employee Name</th>
                                            <td>{selectedEmployee.Employee_Name}</td>
                                        </tr>
                                        <tr>
                                            <th>Allwance Number</th>
                                            <td>{selectedEmployee.Allowance_No}</td>
                                        </tr>
                                        <tr>
                                            <th>Allowance Type</th>
                                            <td>{selectedEmployee.Allowance_Type}</td>
                                        </tr>
                                        <tr>
                                            <th>Apply Date</th>
                                            <td>{selectedEmployee.Apply_Date}</td>
                                        </tr>
                                        <tr>
                                            <th>Amount</th>
                                            <td>{selectedEmployee.Amount}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{selectedEmployee.Description}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{selectedEmployee.Status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Outlet />
            
        </>
    );
};

export default UserAllowanceSataus;

