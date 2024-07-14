import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import axios from 'axios'

import "./index.css";
import "./login.css";

import { CgPassword } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { login, logout } from "./Feature/Userslice";
// import './RegisterForm.css';

const Registration = () => {

  const [toggle, settoggle] = useState(0);
  const [step, setStep] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [username, setUsername] = useState('');
  const [lusername, setLusername] = useState('');
  const [lpassword, setLpassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginRole, setLoginRole] = useState('employee');
  const [errors1, setErrors1] = useState([]);

  const handleRegistor = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', { username, employeeId, password: newPassword });
        console.log(response.data);
        if (response.data.errors) {
          setErrors1(response.data.errors);
        } else {
          alert(response.data.message);
          setFormData1({ empId: response.data.empId });
          setFormData2({ empId: response.data.empId });
          setFormData3({ empId: response.data.empId });
          settoggle(2);
        }
      } catch (error) {
        console.error("Error during signup: ", error);
      }
    }
  };

  const [formData1, setFormData1] = useState({
    empId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    relationType: '',
    relationName: '',
    dob: '',
    maritalStatus: '',
    photograph: null,
    signature: null
  })
  const [formData2, setFormData2] = useState({
    empId: '',
    presentHouseNo: '',
    presentLocality: '',
    presentCountry: '',
    presentState: '',
    presentDistrict: '',
    presentPincode: '',
    permanentHouseNo: '',
    permanentLocality: '',
    permanentCountry: '',
    permanentState: '',
    permanentDistrict: '',
    permanentPincode: ''
  })
  const [formData3, setFormData3] = useState({
    empId: '',
    addressProof: null,
    identityProof: null,
    physicallyChallenged: null,
    exSoldier: null,
    pancard: null,
    offerLetter: null,

  });


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData1({
      ...formData1,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormData2({
      ...formData2,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormData3({
      ...formData3,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData1({
      ...formData1,
      [name]: files[0],
    });
    setFormData2({
      ...formData2,
      [name]: files[0],
    });
    setFormData3({
      ...formData3,
      [name]: files[0],
    });
  };
  const navigate = useNavigate();


  // const handleSubmitUser = () => {
  //   navigate("/user");

  // };

  const handleSubmits = (e) => {
    e.preventDefault();
    settoggle(0);
    // Validate formData and set errors
    // Submit formData
    alert("Your profile data successfully submitted")
    navigate("/");
  };

  const handleNext1 = async () => {
    if (validateForm()) {
      try {
        console.log(`formData.empId: ${formData1.empId}`);
        const response = await axios.post('http://localhost:5000/api/empDetails/personalDetails', formData1);
        console.log(response.data);
        if (response.data.errors) {
          setErrors1(response.data.errors);
        } else {
          alert(response.data.message);
          setStep(step + 1);
        }
      } catch (error) {
        console.error("Error during signup: ", error);
      }

    }
  };
  const handleNext2 = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/empDetails/communicationDetails', formData2);
        console.log(response.data);
        if (response.data.errors) {
          setErrors1(response.data.errors);
        } else {
          alert(response.data.message);
          setStep(step + 1);
        }
      } catch (error) {
        console.error("Error during signup: ", error);
      }

    }
  };
  const handleNext3 = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/empDetails/otherDetails', formData3);
        console.log(response.data);
        if (response.data.errors) {
          setErrors1(response.data.errors);
        } else {
          alert(response.data.message);
          setStep(step + 1);
        }
      } catch (error) {
        console.error("Error during signup: ", error);
      }

    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const validateForm = () => {
    let currentErrors = {};
    let isValid = true;
    const currentFields = document.querySelectorAll("fieldset")[step].querySelectorAll("input, select");

    currentFields.forEach((field) => {
      if (field.name !== "middleName" && field.name !== "physicallyChallenged" && field.name !== "exSoldier" && field.value.trim() === "" && field.type !== "checkbox") {
        isValid = false;
        currentErrors[field.name] = "This field is required";
      }
    });

    setErrors(currentErrors);
    return isValid;
  };

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { loginRole, username: lusername, password: lpassword });
      console.log(response.data);
      if (response.data.errors) {
        setErrors1(response.data.errors);
        console.log(errors1);
      } else {
        alert(response.data.message);
        console.log(response.data.user);
        dispatch(
          login({
            username: response.data.user.username,
            employeeId: response.data.user.employeeId,
            docId: response.data.user._id,
            isAdmin: response.data.user.isAdmin,
            allowances: response.data.user.allowances,
          })
        );
        if (loginRole === 'admin') {

          navigate("/admin/homePage");
        } else {

          navigate("/user/homePage");
        }
      }
    } catch (error) {
      console.error("Error during login: ", error);
      alert(error.message);
    }

  };

  return (
    <>
      <Header />
      <main>
        {toggle === 0 && (
          <>
            <div className="Login">
              <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                  <h1>Login</h1>

                  {/* Login As */}
                  <div className='form-group'>
                    <label htmlFor='loginRole'>Login as:</label>
                    <div className='input-box'>
                      <select
                        id='loginRole'
                        className='dropdown'
                        value={loginRole}
                        onChange={(e) => setLoginRole(e.target.value)}
                        required>
                        <option value=''>Select your role</option>
                        <option value='admin'>Admin</option>
                        <option value='employee'>Employee</option>
                      </select>
                    </div>
                  </div>


                  {/* Username */}
                  <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <div className='input-box'>
                      <input type='text' id='username' placeholder='Enter your username' value={lusername} onChange={(e) => setLusername(e.target.value)} autocomplete="off" required />
                      <FaUser className='icon' />
                    </div>
                  </div>

                  {/* Password */}
                  <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <div className='input-box'>
                      <input type='password' id='password' value={lpassword} onChange={(e) => setLpassword(e.target.value)} placeholder='Enter your password' required />
                      <FaLock className='icon' />
                    </div>
                  </div>
                  {/* Login Button */}
                  <button type='submit'>Login</button>

                  {/* Register Link */}
                  <div className='register-link'>
                    <p>
                      Don't have an account? <a className="btn btn-outline-danger" onClick={() => settoggle(1)}>Register</a>
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </>


        )}
        {toggle === 1 && (
          <>
            <div className="Login">

              <div className='wrapper'>
                <form >
                  <h1>Register</h1>

                  {/* Employee ID */}
                  <div className='form-group'>
                    <label htmlFor='loginRole'>Employee ID</label>
                    <div className='input-box'>
                      <input type='text' id='loginRole' placeholder='Enter your Employee ID' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
                    </div>
                  </div>
                  {/* Username */}
                  <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <div className='input-box'>
                      <input type='text' id='username' placeholder='Enter a username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                      <FaUser className='icon' />
                    </div>
                  </div>
                  {/* New Password */}
                  <div className='form-group'>
                    <label htmlFor='newPassword'>New Password:</label>
                    <div className='input-box'>
                      <input
                        type='password'
                        id='newPassword'
                        placeholder='Create new password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <FaLock className='icon' />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <div className='input-box'>
                      <input
                        type='password'
                        id='confirmPassword'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <FaLock className='icon' />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  </div>

                  {/* Create Account Button */}
                  <button type='submit' className='btn btn-primary' onClick={handleRegistor}>Create Account</button>

                  {/* Additional Login Option */}

                  <div className='register-link'>
                    <p>
                      If you already have an account <a className="btn btn-outline-danger" onClick={() => settoggle(0)}>Login</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>

          </>
        )}
        {toggle === 2 && (
          <>
            <div className="container-fluid" id="grad1">
              <button type="button" class="btn btn-outline-dark top-right-button"
                onClick={() => settoggle(0)}>Login</button>
              <div className="row justify-content-center mt-0">
                <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
                  <div className="card px-0 pt-3 pb-0 mt-3 mb-3">
                    <h2>
                      <strong>Sign Up Your User Account</strong>
                    </h2>
                    {/* <p>Fill all form fields to go to the next step</p> */}
                    <div className="row">
                      <div className="col-md-12 mx-0">
                        <form id="msform">
                          <ul id="progressbar">
                            <li className={step >= 0 ? "active" : ""} id="account">
                              <strong>Personal Details</strong>
                            </li>
                            <li className={step >= 1 ? "active" : ""} id="personal">
                              <strong>Communication Details</strong>
                            </li>
                            <li className={step >= 2 ? "active" : ""} id="payment">
                              <strong>Other Details</strong>
                            </li>
                            <li className={step >= 3 ? "active" : ""} id="confirm">
                              <strong>Review</strong>
                            </li>
                          </ul>

                          <fieldset style={{ display: step === 0 ? "block" : "none" }}>
                            <h2 className="fs-title">Personal Details</h2>
                            <div className="form-card">
                              <div className="left-container">
                                <div className="field-container">
                                  <label className="field-label">Employee ID</label>
                                  <input
                                    type="text"
                                    name="employeeId"
                                    placeholder="Employee ID"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                  />
                                  {errors.employeeId && <span className="error">{errors.employeeId}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">First Name</label>
                                  <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData1.firstName}
                                    onChange={handleChange}
                                  />
                                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Middle Name</label>
                                  <input
                                    type="text"
                                    name="middleName"
                                    placeholder="Middle Name"
                                    value={formData1.middleName}
                                    onChange={handleChange}
                                  />
                                  {errors.middleName && <span className="error">{errors.middleName}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Last Name</label>
                                  <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData1.lastName}
                                    onChange={handleChange}
                                  />
                                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Gender</label>
                                  <select
                                    name="gender"
                                    value={formData1.gender}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                  </select>
                                  {errors.gender && <span className="error">{errors.gender}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData1.email}
                                    onChange={handleChange}
                                  />
                                  {errors.email && <span className="error">{errors.email}</span>}
                                </div>
                              </div>
                              <div className="right-container">
                                <div className="field-container">
                                  <label className="field-label">Relation Type</label>
                                  <select
                                    name="relationType"
                                    value={formData1.relationType}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Relation</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Guardian">Guardian</option>
                                  </select>
                                  {errors.relationType && <span className="error">{errors.relationType}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Relation Name</label>
                                  <input
                                    type="text"
                                    name="relationName"
                                    placeholder="Relation Name"
                                    value={formData1.relationName}
                                    onChange={handleChange}
                                  />
                                  {errors.relationName && <span className="error">{errors.relationName}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Date of Birth</label>
                                  <input
                                    type="date"
                                    name="dob"
                                    value={formData1.dob}
                                    onChange={handleChange}
                                  />
                                  {errors.dob && <span className="error">{errors.dob}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Marital Status</label>
                                  <select
                                    name="maritalStatus"
                                    value={formData1.maritalStatus}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Status</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                  </select>
                                  {errors.maritalStatus && <span className="error">{errors.maritalStatus}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Photograph</label>
                                  <input
                                    type="file"
                                    name="photograph"
                                    value={formData1.photograph}
                                    onChange={handleChange}
                                  />
                                  {errors.photograph && <span className="error">{errors.photograph}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Signature</label>
                                  <input
                                    type="file"
                                    name="signature"
                                    value={formData1.signature}
                                    onChange={handleChange}
                                  />
                                  {errors.signature && <span className="error">{errors.signature}</span>}
                                </div>
                              </div>
                            </div>
                            <input
                              type="button"
                              name="next"
                              className="next action-button"
                              value="Next"
                              onClick={handleNext1}
                            />
                          </fieldset>

                          <fieldset style={{ display: step === 1 ? "block" : "none" }}>
                            <h2 className="fs-title">Communication Details</h2>
                            <div className="form-card">
                              <div className="left-container">
                                <div className="field-container">
                                  <label className="field-label">Present House No./Street Name</label>
                                  <input
                                    type="text"
                                    name="presentHouseNo"
                                    placeholder="House No."
                                    value={formData2.presentHouseNo}
                                    onChange={handleChange}
                                  />
                                  {errors.presentHouseNo && <span className="error">{errors.presentHouseNo}</span>}
                                </div>

                                <div className="field-container">
                                  <label className="field-label">Present City</label>
                                  <input
                                    type="text"
                                    name="presentLocality"
                                    placeholder="City"
                                    value={formData2.presentLocality}
                                    onChange={handleChange}
                                  />
                                  {errors.presentLocality && <span className="error">{errors.presentLocality}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Present Country</label>
                                  <select
                                    name="presentCountry"
                                    value={formData2.presentCountry}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Country</option>
                                    <option value="India">India</option>
                                  </select>
                                  {errors.presentCountry && <span className="error">{errors.presentCountry}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Present State</label>
                                  <select
                                    name="presentState"
                                    value={formData2.presentState}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select State</option>
                                    <option value="Odisha">Odisha</option>
                                  </select>
                                  {errors.presentState && <span className="error">{errors.presentState}</span>}
                                </div>

                                <div className="field-container">
                                  <label className="field-label">Present District</label>
                                  <select
                                    name="presentDistrict"
                                    value={formData2.presentDistrict}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select District</option>
                                    <option value="Sambalpur">Sambalpur</option>
                                  </select>
                                  {errors.presentDistrict && <span className="error">{errors.presentDistrict}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Present Pincode</label>
                                  <input
                                    type="text"
                                    name="presentPincode"
                                    placeholder="Pincode"
                                    value={formData2.presentPincode}
                                    onChange={handleChange}
                                  />
                                  {errors.presentPincode && <span className="error">{errors.presentPincode}</span>}
                                </div>
                              </div>
                              <div className="right-container">
                                <div className="field-container">
                                  <label className="field-label">Permanent House No./Street Name</label>
                                  <input
                                    type="text"
                                    name="permanentHouseNo"
                                    placeholder="House No."
                                    value={formData2.permanentHouseNo}
                                    onChange={handleChange}
                                  />
                                  {errors.permanentHouseNo && <span className="error">{errors.permanentHouseNo}</span>}
                                </div>

                                <div className="field-container">
                                  <label className="field-label">Permanent City</label>
                                  <input
                                    type="text"
                                    name="permanentLocality"
                                    placeholder="City"
                                    value={formData2.permanentLocality}
                                    onChange={handleChange}
                                  />
                                  {errors.permanentLocality && <span className="error">{errors.permanentLocality}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Permanent Country</label>
                                  <select
                                    name="permanentCountry"
                                    value={formData2.permanentCountry}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Country</option>
                                    <option value="India">India</option>
                                  </select>
                                  {errors.permanentCountry && <span className="error">{errors.permanentCountry}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Permanent State</label>
                                  <select
                                    name="permanentState"
                                    value={formData2.permanentState}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select State</option>
                                    <option value="Odisha">Odisha</option>
                                  </select>
                                  {errors.permanentState && <span className="error">{errors.permanentState}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Permanent District</label>
                                  <select
                                    name="permanentDistrict"
                                    value={formData2.permanentDistrict}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select District</option>
                                    <option value="Sambalpur">Sambalpur</option>
                                  </select>
                                  {errors.permanentDistrict && <span className="error">{errors.permanentDistrict}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Permanent Pincode</label>
                                  <input
                                    type="text"
                                    name="permanentPincode"
                                    placeholder="Pincode"
                                    value={formData2.permanentPincode}
                                    onChange={handleChange}
                                  />
                                  {errors.permanentPincode && <span className="error">{errors.permanentPincode}</span>}
                                </div>
                              </div>
                            </div>
                            <input
                              type="button"
                              name="previous"
                              className="previous action-button-previous"
                              value="Previous"
                              onClick={handlePrevious}
                            />
                            <input
                              type="button"
                              name="next"
                              className="next action-button"
                              value="Next"
                              onClick={handleNext2}
                            />
                          </fieldset>

                          <fieldset style={{ display: step === 2 ? "block" : "none" }}>
                            <h2 className="fs-title">Other Details</h2>
                            <div className="form-card">
                              <div className="left-container">
                                <div className="field-container">
                                  <label className="field-label">Address Proof</label>
                                  <input
                                    type="file"
                                    name="addressProof"
                                    value={formData3.addressProof}
                                    onChange={handleFileChange}
                                  />
                                  {errors.addressProof && <span className="error">{errors.addressProof}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Identity Proof</label>
                                  <input
                                    type="file"
                                    name="identityProof"
                                    value={formData3.identityProof}
                                    onChange={handleFileChange}
                                  />
                                  {errors.identityProof && <span className="error">{errors.identityProof}</span>}
                                </div>


                                <div className="field-container">
                                  <label className="field-label">Physically Challenged</label>
                                  <input
                                    type="file"
                                    name="physicallyChallenged"
                                    value={formData3.physicallyChallenged}
                                    onChange={handleFileChange}
                                  />
                                  {errors.physicallyChallenged && <span className="error">{errors.physicallyChallenged}</span>}
                                </div>
                                <div className="field-container">
                                  <label className="field-label">Ex-Soldier</label>
                                  <input
                                    type="file"
                                    name="exSoldier"
                                    value={formData3.exSoldier}
                                    onChange={handleFileChange}
                                  />
                                  {errors.exSoldier && <span className="error">{errors.exSoldier}</span>}
                                </div>

                                <div className="field-container">
                                  <label className="field-label">PanCard</label>
                                  <input
                                    type="file"
                                    name="pancard"
                                    value={formData3.pancard}
                                    onChange={handleFileChange}
                                  />
                                  {errors.pancard && <span className="error">{errors.pancard}</span>}
                                </div>

                                <div className="field-container">
                                  <label className="field-label">Offer Letter</label>
                                  <input
                                    type="file"
                                    name="offerLetter"
                                    value={formData3.offerLetter}
                                    onChange={handleFileChange}
                                  />
                                  {errors.offerLetter && <span className="error">{errors.offerLetter}</span>}
                                </div>

                              </div>
                            </div>
                            <input
                              type="button"
                              name="previous"
                              className="previous action-button-previous"
                              value="Previous"
                              onClick={handlePrevious}
                            />
                            <input
                              type="button"
                              name="next"
                              className="next action-button"
                              value="Next"
                              onClick={handleNext3}
                            />
                          </fieldset>

                          <fieldset style={{ display: step === 3 ? "block" : "none" }}>
                            <h2 className="fs-title">Review</h2>
                            <div className="form-card">
                              <div className="review-section">
                                <h4>Personal Details</h4>
                                <p>
                                  <strong>Employee ID:</strong> {employeeId}
                                </p>
                                <p>
                                  <strong>Name:</strong> {formData1.firstName} {formData1.middleName} {formData1.lastName}
                                </p>

                                <p>
                                  <strong>Gender:</strong> {formData1.gender}
                                </p>
                                <p>
                                  <strong>Marital Status:</strong> {formData1.maritalStatus}
                                </p>
                                <p>
                                  <strong>Email:</strong> {formData1.email}
                                </p>

                                <p>
                                  <strong>Date of Birth:</strong> {formData1.dob}
                                </p>



                                <h4>Communication Details</h4>
                                <p>
                                  <strong>Present Address:</strong>

                                  {`${formData2.presentLocality}, ${formData2.presentDistrict}, ${formData2.presentState}`}
                                </p>
                                <p>
                                  <strong>Permanent Address:</strong>
                                  {`${formData2.permanentLocality}, ${formData2.permanentDistrict}, ${formData2.permanentState}`}
                                </p>
                              </div>


                            </div>
                            <input
                              type="button"
                              name="previous"
                              className="previous action-button-previous"
                              value="Previous"
                              onClick={handlePrevious}
                            />
                            <input
                              type="submit"
                              name="submit"
                              className="submit action-button"
                              value="Submit"
                              onClick={handleSubmits}
                            />
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
        <Footer />
      </main>
    </>
  )
};

export default Registration;
