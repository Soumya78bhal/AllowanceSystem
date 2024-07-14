import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './UserAllowanceStatus.css';
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

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


const id="6692b303bfe18fc580fae4db";



const UserAllowanceSataus = () => {
    const [toggle, setToggle] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [data1,setData]=useState(null);
    const handleUpdatePlan = (employee) => {
        setSelectedEmployee(employee);
        setToggle(1); // Switch to update mode
    };
    useEffect(()=>{
        const fetchData=async ()=>{
            await axios.get(`http://localhost:5000/api/application/userApplications/${id}`).then((res)=>[
                setData(res.data)
            ])
            
            console.log(data1)
        }
        fetchData();
    },[toggle])
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
                                            
                                            <th scope="col">Allowance Type</th>
                                            <th scope="col">Apply Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { data1 && data1.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.selectedAllowanceTypes[0].type}</td>
                                                <td>{item.date.substring(0,10)}</td>
                                                <td>{item.status}</td>
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
                                            <td>{selectedEmployee.employeeId}</td>
                                        </tr>
                                        <tr>
                                            <th>Employee Name</th>
                                            <td>{selectedEmployee.employeeName}</td>
                                        </tr>
                                        
                                             {selectedEmployee.selectedAllowanceTypes.map((item)=>(
                                            <tr>
                                            <th>Allowance Type</th>
                                            <td>{item.type}</td>
                                            <th>Amount</th>
                                            <td>{item.amount}</td>
                                            <th>Description</th>
                                            <td>{item.description}</td>
                                            </tr>
                                            ))}
                                        
                                        <tr>
                                            <th>Apply Date</th>
                                            <td>{selectedEmployee.date.substring(0,10)}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th>Status</th>
                                            <td>{selectedEmployee.status}</td>
                                        </tr>
                                        <tr>
                                            <th>Remark</th>
                                            <td>{selectedEmployee.remark}</td>
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

