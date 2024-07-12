// import { Outlet } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Header from "../Header.jsx"
import "./DashBoad.css";
import { FaArrowLeft } from "react-icons/fa";
const employees = [
    {
        Employee_ID: 'E001',
        Apply_Name: 'John Doe',
        Apply_Date: '2024-01-01',
        Email_ID: 'john.doe@example.com',
        Gender: 'Male',
        Relation_Type: 'Spouse',
        Relation_Name: 'Jane Doe',
        Date_of_Birth: '1985-04-12',
        Marital_Status: 'Married',
        Address: '123 Main St, Springfield, IL'
    },
    {
        Employee_ID: 'E002',
        Apply_Name: 'Jane Smith',
        Apply_Date: '2024-02-15',
        Email_ID: 'jane.smith@example.com',
        Gender: 'Female',
        Relation_Type: 'Parent',
        Relation_Name: 'John Smith',
        Date_of_Birth: '1990-08-20',
        Marital_Status: 'Single',
        Address: '456 Oak St, Springfield, IL'
    },
    {
        Employee_ID: 'E003',
        Apply_Name: 'Alice Johnson',
        Apply_Date: '2024-03-30',
        Email_ID: 'alice.johnson@example.com',
        Gender: 'Female',
        Relation_Type: 'Child',
        Relation_Name: 'Bob Johnson',
        Date_of_Birth: '1995-12-05',
        Marital_Status: 'Married',
        Address: '789 Pine St, Springfield, IL'
    },
    {
        Employee_ID: 'E004',
        Apply_Name: 'Bob Brown',
        Apply_Date: '2024-04-10',
        Email_ID: 'bob.brown@example.com',
        Gender: 'Male',
        Relation_Type: 'Sibling',
        Relation_Name: 'Charlie Brown',
        Date_of_Birth: '1982-07-22',
        Marital_Status: 'Single',
        Address: '321 Maple St, Springfield, IL'
    },
    {
        Employee_ID: 'E005',
        Apply_Name: 'Charlie Davis',
        Apply_Date: '2024-05-25',
        Email_ID: 'charlie.davis@example.com',
        Gender: 'Male',
        Relation_Type: 'Spouse',
        Relation_Name: 'Diana Davis',
        Date_of_Birth: '1988-11-30',
        Marital_Status: 'Married',
        Address: '654 Elm St, Springfield, IL'
    },
    {
        Employee_ID: 'E006',
        Apply_Name: 'Diana Evans',
        Apply_Date: '2024-06-14',
        Email_ID: 'diana.evans@example.com',
        Gender: 'Female',
        Relation_Type: 'Parent',
        Relation_Name: 'Ethan Evans',
        Date_of_Birth: '1992-05-18',
        Marital_Status: 'Single',
        Address: '987 Birch St, Springfield, IL'
    },
    {
        Employee_ID: 'E007',
        Apply_Name: 'Ethan Foster',
        Apply_Date: '2024-07-01',
        Email_ID: 'ethan.foster@example.com',
        Gender: 'Male',
        Relation_Type: 'Child',
        Relation_Name: 'Fiona Foster',
        Date_of_Birth: '1987-09-12',
        Marital_Status: 'Married',
        Address: '123 Cedar St, Springfield, IL'
    },
    {
        Employee_ID: 'E008',
        Apply_Name: 'Fiona Green',
        Apply_Date: '2024-08-20',
        Email_ID: 'fiona.green@example.com',
        Gender: 'Female',
        Relation_Type: 'Sibling',
        Relation_Name: 'George Green',
        Date_of_Birth: '1993-02-25',
        Marital_Status: 'Single',
        Address: '456 Spruce St, Springfield, IL'
    },
    {
        Employee_ID: 'E009',
        Apply_Name: 'George Harris',
        Apply_Date: '2024-09-15',
        Email_ID: 'george.harris@example.com',
        Gender: 'Male',
        Relation_Type: 'Spouse',
        Relation_Name: 'Hannah Harris',
        Date_of_Birth: '1980-06-30',
        Marital_Status: 'Married',
        Address: '789 Walnut St, Springfield, IL'
    },
    {
        Employee_ID: 'E010',
        Apply_Name: 'Hannah Jackson',
        Apply_Date: '2024-10-05',
        Email_ID: 'hannah.jackson@example.com',
        Gender: 'Female',
        Relation_Type: 'Parent',
        Relation_Name: 'Ivy Jackson',
        Date_of_Birth: '1991-04-11',
        Marital_Status: 'Single',
        Address: '321 Willow St, Springfield, IL'
    }
    // Add more employees as needed
];  
const VerifyEmployee = () => {
    const [toggle, setToggle] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleUpdatePlan = (employeeId, applyName) => {
        const employee = employees.find(emp => emp.Employee_ID === employeeId);
        setSelectedEmployee(employee);
        setToggle(1); // Switch to detailed view mode
    };

    const handleGoBack = () => {
        setSelectedEmployee(null);
        setToggle(0); // Switch back to table view mode
    };

    return (
        <>
            <main className="DashBoad">
                <Header />
                <br />
                <br />

                {toggle === 0 && (
                    <>
                        <div className="table-responsive">
                            <div className="activate_deactivateCont" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table className="table table-bordered historyTable">
                                    <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                        <tr>
                                            <th scope="col">Sl no.</th>
                                            <th scope="col">Employee ID</th>
                                            <th scope="col">Employee Name</th>
                                            <th scope="col">Apply Date</th>
                                            <th scope="col">Email ID</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.Employee_ID}</td>
                                                <td>{item.Apply_Name}</td>
                                                <td>{item.Apply_Date}</td>
                                                <td>{item.Email_ID}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-info"
                                                        onClick={() => handleUpdatePlan(item.Employee_ID, item.Apply_Name)}
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
                        <div className="card" style={{ background: 'lightgray', padding: '20px', margin: '20px', textAlign: 'left' }}>
                            <h3>{selectedEmployee.Apply_Name}</h3>
                            <p><strong>Employee ID:</strong> {selectedEmployee.Employee_ID}</p>
                            <p><strong>Email ID:</strong> {selectedEmployee.Email_ID}</p>
                            <p><strong>Gender:</strong> {selectedEmployee.Gender}</p>
                            <p><strong>Relation Type:</strong> {selectedEmployee.Relation_Type}</p>
                            <p><strong>Relation Name:</strong> {selectedEmployee.Relation_Name}</p>
                            <p><strong>Date of Birth:</strong> {selectedEmployee.Date_of_Birth}</p>
                            <p><strong>Marital Status:</strong> {selectedEmployee.Marital_Status}</p>
                            <p><strong>Address:</strong> {selectedEmployee.Address}</p>
                            <div>
                                <button className="btn btn-primary">Activate</button>
                                <button className="btn btn-danger" style={{ marginLeft: '10px' }}>Deactivate</button>
                            </div>
                            <br />
                            <button className="btn btn-secondary" onClick={handleGoBack}>
                            <FaArrowLeft /> Go Back
                            </button>
                        </div>
                    </>
                )}
            </main>
        </>
    );
};

export default VerifyEmployee;