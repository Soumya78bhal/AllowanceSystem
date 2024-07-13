import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./DashBoad.css";
import { FaArrowLeft } from "react-icons/fa";

const data = [
    {
        Employee_ID: "E001",
        Apply_Name: "John Doe",
        Allwance: "Travel",
        Apply_Date: "2024-07-01",
        Start_Date: "2024-07-05",
        End_Date: "2024-07-10",
        Amount: "500",
        View: "Approved",
    },
    {
        Employee_ID: "E002",
        Apply_Name: "Jane Smith",
        Allwance: "Meal",
        Apply_Date: "2024-06-28",
        Start_Date: "2024-07-01",
        End_Date: "2024-07-02",
        Amount: "100",
        View: "Pending",
    },
    {
        Employee_ID: "E003",
        Apply_Name: "Alice Johnson",
        Allwance: "Accommodation",
        Apply_Date: "2024-07-03",
        Start_Date: "2024-07-10",
        End_Date: "2024-07-15",
        Amount: "300",
        View: "Rejected",
    },
    {
        Employee_ID: "E004",
        Apply_Name: "Bob Brown",
        Allwance: "Training",
        Apply_Date: "2024-07-02",
        Start_Date: "2024-07-05",
        End_Date: "2024-07-07",
        Amount: "200",
        View: "Approved",
    },
    {
        Employee_ID: "E005",
        Apply_Name: "Charlie Green",
        Allwance: "Travel",
        Apply_Date: "2024-07-04",
        Start_Date: "2024-07-08",
        End_Date: "2024-07-12",
        Amount: "450",
        View: "Pending",
    },
    {
        Employee_ID: "E006",
        Apply_Name: "David White",
        Allwance: "Medical",
        Apply_Date: "2024-07-03",
        Start_Date: "2024-07-06",
        End_Date: "2024-07-08",
        Amount: "600",
        View: "Approved",
    },
    {
        Employee_ID: "E007",
        Apply_Name: "Eva Black",
        Allwance: "Education",
        Apply_Date: "2024-07-01",
        Start_Date: "2024-07-05",
        End_Date: "2024-07-09",
        Amount: "800",
        View: "Pending",
    },
    {
        Employee_ID: "E008",
        Apply_Name: "Franklin Moore",
        Allwance: "Relocation",
        Apply_Date: "2024-06-30",
        Start_Date: "2024-07-02",
        End_Date: "2024-07-04",
        Amount: "700",
        View: "Rejected",
    },
    {
        Employee_ID: "E009",
        Apply_Name: "Grace Lee",
        Allwance: "Entertainment",
        Apply_Date: "2024-07-05",
        Start_Date: "2024-07-06",
        End_Date: "2024-07-10",
        Amount: "350",
        View: "Approved",
    },
    {
        Employee_ID: "E010",
        Apply_Name: "Henry Taylor",
        Allwance: "Travel",
        Apply_Date: "2024-07-07",
        Start_Date: "2024-07-09",
        End_Date: "2024-07-13",
        Amount: "550",
        View: "Pending",
    },
    {
        Employee_ID: "E011",
        Apply_Name: "Ivy Martin",
        Allwance: "Meal",
        Apply_Date: "2024-07-01",
        Start_Date: "2024-07-02",
        End_Date: "2024-07-03",
        Amount: "150",
        View: "Approved",
    },
    {
        Employee_ID: "E012",
        Apply_Name: "Jack Wilson",
        Allwance: "Accommodation",
        Apply_Date: "2024-07-04",
        Start_Date: "2024-07-05",
        End_Date: "2024-07-10",
        Amount: "400",
        View: "Pending",
    },
    {
        Employee_ID: "E013",
        Apply_Name: "Kathy Harris",
        Allwance: "Travel",
        Apply_Date: "2024-07-03",
        Start_Date: "2024-07-06",
        End_Date: "2024-07-09",
        Amount: "500",
        View: "Rejected",
    },
    {
        Employee_ID: "E014",
        Apply_Name: "Larry King",
        Allwance: "Medical",
        Apply_Date: "2024-07-02",
        Start_Date: "2024-07-04",
        End_Date: "2024-07-06",
        Amount: "650",
        View: "Approved",
    },
    {
        Employee_ID: "E015",
        Apply_Name: "Mona Wright",
        Allwance: "Training",
        Apply_Date: "2024-07-05",
        Start_Date: "2024-07-07",
        End_Date: "2024-07-08",
        Amount: "250",
        View: "Pending",
    },
];

const DashBoad = () => {
    const [toggle, setToggle] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleUpdatePlan = (employee) => {
        setSelectedEmployee(employee);
        setToggle(1); // Switch to update mode
    };

    const handleAction = (action) => {
        toast(`Employee has been ${action}`);
        setToggle(0); // Redirect back to the main table view
    };

    return (
        <>
            <main className="DashBoad">
                

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
                                            <th scope="col">Allwance</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.Employee_ID}</td>
                                                <td>{item.Apply_Name}</td>
                                                <td>{item.Apply_Date}</td>
                                                <td>{item.Allwance}</td>
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
                                <h1>Employee Details</h1>
                                <table className="details-table">
                                    <tbody>
                                        <tr>
                                            <th>Employee ID</th>
                                            <td>{selectedEmployee.Employee_ID}</td>
                                        </tr>
                                        <tr>
                                            <th>Employee Name</th>
                                            <td>{selectedEmployee.Apply_Name}</td>
                                        </tr>
                                        <tr>
                                            <th>Allwance</th>
                                            <td>{selectedEmployee.Allwance}</td>
                                        </tr>
                                        <tr>
                                            <th>Apply Date</th>
                                            <td>{selectedEmployee.Apply_Date}</td>
                                        </tr>
                                        <tr>
                                            <th>Start Date</th>
                                            <td>{selectedEmployee.Start_Date}</td>
                                        </tr>
                                        <tr>
                                            <th>End Date</th>
                                            <td>{selectedEmployee.End_Date}</td>
                                        </tr>
                                        <tr>
                                            <th>Amount</th>
                                            <td>{selectedEmployee.Amount}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{selectedEmployee.View}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <button className="btn btn-success Detail_buttom" onClick={() => handleAction('approved')}>
                                    Approve
                                </button>
                                <button className="btn btn-danger Detail_buttom" onClick={() => handleAction('rejected')}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Outlet />
            <ToastContainer />
        </>
    );
};

export default DashBoad;
