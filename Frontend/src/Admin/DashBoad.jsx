import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Header.jsx";
import "./DashBoad.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';


const url="http://localhost:5000/api/application/applications";
const DashBoad = () => {
    const [data1,setData]=useState('');
    const [toggle, setToggle] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleUpdatePlan = (employee) => {    
        setSelectedEmployee(employee);
        setToggle(1); // Switch to update mode
    };

    //Fetch application data
    useEffect(()=>{
        const getData=async ()=>{
        await axios.get(url).then((res=>{
            setData(res.data);
            console.log(data1)
        }))
    }
    getData();
    },[toggle]);
  
// Update the status of applications
    const handleAction = (action) => {
        axios.post('http://localhost:5000/api/application/updateApplication',{
            _id:selectedEmployee._id,
            status:action
        }).then((res)=>{
            if(res.data){
                toast(`Employee has been ${action}`);
                setToggle(0); // Redirect back to the main table view
            }
        })

    };

    return (
        <>
            <main className="DashBoad">
                <Header />
                <br />
                {/* <h1>DashBoad</h1> */}
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
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data1 && data1.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.employee.username}</td>
                                                <td>{item.employee.employeeId}</td>
                                                <td>{item.date.substring(0, 10)}</td>
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
                                            <td>{selectedEmployee.employeeId}</td>
                                        </tr>
                                        <tr>
                                            <th>Employee Name</th>
                                            <td>{selectedEmployee.employeeName}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th>Date</th>
                                            <td>{selectedEmployee.date.substring(0,10)}</td>
                                        </tr>
                                      
                                            {selectedEmployee.selectedAllowanceTypes.map((item)=>(
                                            <tr>
                                            <th>Allowance Type</th>
                                            <td>{item.type}</td>
                                            <th>Amount</th>
                                            <td>{item.amount}</td>
                                            </tr>
                                            ))}
                                        <tr>
                                            <th>Status</th>
                                            <td>{selectedEmployee.status}</td>
                                        </tr>
                                        <tr>
                                            <th>Documents</th>
                                            <td>
                                            {
                                                selectedEmployee.files.map((item)=>(
                                                    <tr><a href={item}>{item}</a></tr>
                                                ))
                                            }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <button className="btn btn-success Detail_buttom" onClick={() => handleAction('Accepted')}>
                                    Approve
                                </button>
                                <button className="btn btn-danger Detail_buttom" onClick={() => handleAction('Rejected')}>
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
