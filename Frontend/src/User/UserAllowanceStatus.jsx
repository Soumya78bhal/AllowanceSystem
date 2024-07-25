import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './UserAllowanceStatus.css';
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../Feature/Userslice";
import axios from "axios";


const UserAllowanceSataus = () => {
    const [toggle, setToggle] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [data, setData] = useState([]);
    const user = useSelector(selectUser);

  useEffect(() => {
    const fetchAllowances = async () => {
      try {
        const response = await axios.get(`https://allowance-system-dfe7.onrender.com/api/application/userApplications/${user.docId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching employee allowances: ', error);
      }
    };

    fetchAllowances();
  }, [user]);

    

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
                                            <th scope="col">Allowance ID</th>
                                            <th scope="col">Allowance Type</th>
                                            <th scope="col">Apply Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { data && data.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item._id}</td>
                                                <td>{item.selectedAllowanceTypes[0].type}</td>
                                                <td>{item.date}</td>
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
                                        <tr>
                                            <th>Allowance ID</th>
                                            <td>{selectedEmployee._id}</td>
                                        </tr>
                                        <tr>
                                            <th>Allowance Type</th>
                                            <td>{`${selectedEmployee.selectedAllowanceTypes[0].type} ${selectedEmployee.selectedAllowanceTypes[1]?.type} ${selectedEmployee.selectedAllowanceTypes[3]?.type}`}</td>
                                        </tr>
                                        <tr>
                                            <th>Apply Date</th>
                                            <td>{selectedEmployee.date}</td>
                                        </tr>
                                        <tr>
                                            <th>Amount</th>
                                            <td>{`${selectedEmployee.selectedAllowanceTypes[0].amount} ${selectedEmployee.selectedAllowanceTypes[1]?.amount}`}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{`${selectedEmployee.selectedAllowanceTypes[0].description}, ${selectedEmployee.selectedAllowanceTypes[1]?.description}`}</td>
                                        </tr>
                                        
                                        <tr>
                                            <th>Status</th>
                                            <td>{selectedEmployee.status}</td>
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

