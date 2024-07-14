import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios'
import "./index.css";
import "./login.css";
import { CgPassword } from "react-icons/cg";
// import './RegisterForm.css';

const Registration = () => {
  
  const [toggle, settoggle] = useState(0);
  const [step, setStep] = useState(0);
  const [username,setUsername]=useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginRole, setLoginRole] = useState('employee');

  const handleRegistor = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
      // Proceed with form submission
      console.log('Form submitted');
    }
  };

  const [formData, setFormData] = useState({
    employeeId: '',
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
    signature: null,
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
    permanentPincode: '',
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  const navigate = useNavigate();

 
  // const handleSubmitUser = () => {
  //   navigate("/user");

  // };

  const handleSubmits = (e) => {
    e.preventDefault();
    // Validate formData and set errors
    // Submit formData
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
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
 
  const handleCreateAccount= async(e)=>{
    e.preventDefault();
    const url="http://localhost:5000/api/auth/register"

    if(newPassword===confirmPassword){
      axios.post(url,{
        name:username,
        password:newPassword
    })
    }
    else{
      setErrorMessage('password do not match')
    }

    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginRole === 'admin') {
      
      navigate("/admin/homePage");
    } else {
      
      navigate("/user/homePage");
    }
  };

  return (
    <mian>
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
                    <select id='loginRole' className='dropdown' required>

                      <option value='admin'>Admin</option>
                      <option value='employee'>Employee</option>
                    </select>
                  </div>
                </div>

                {/* Username */}
                <div className='form-group'>
                  <label htmlFor='username'>Username:</label>
                  <div className='input-box'>
                    <input type='text' id='username' placeholder='Enter your username' autocomplete="off" required />
                    <FaUser className='icon' />
                  </div>
                </div>

                {/* Password */}
                <div className='form-group'>
                  <label htmlFor='password'>Password:</label>
                  <div className='input-box'>
                    <input type='password' id='password' placeholder='Enter your password' required />
                    <FaLock className='icon' />
                  </div>
                </div>

                {/* Login Button */}
                <button type='submit' onClick={(e) => handleSubmit(e)}>Login</button>

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
                    <input type='text' id='loginRole' placeholder='Enter your Employee ID' required />
                  </div>
                </div>

                {/* Username */}
                <div className='form-group'>
                  <label htmlFor='username'>Username:</label>
                  <div className='input-box'>
                    <input type='text' id='username' placeholder='Enter a username' required on onChange={(e)=>{
                      setUsername(e.target.value)
                    }}/>
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
                <button type='submit' className='btn btn-primary' onClick={handleCreateAccount}>Create Account</button>

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
                                  value={formData.employeeId}
                                  onChange={handleChange}
                                />
                                {errors.employeeId && <span className="error">{errors.employeeId}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">First Name</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  placeholder="First Name"
                                  value={formData.firstName}
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
                                  value={formData.middleName}
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
                                  value={formData.lastName}
                                  onChange={handleChange}
                                />
                                {errors.lastName && <span className="error">{errors.lastName}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Gender</label>
                                <select
                                  name="gender"
                                  value={formData.gender}
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
                                  value={formData.email}
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
                                  value={formData.relationType}
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
                                  value={formData.relationName}
                                  onChange={handleChange}
                                />
                                {errors.relationName && <span className="error">{errors.relationName}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Date of Birth</label>
                                <input
                                  type="date"
                                  name="dob"
                                  value={formData.dob}
                                  onChange={handleChange}
                                />
                                {errors.dob && <span className="error">{errors.dob}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Marital Status</label>
                                <select
                                  name="maritalStatus"
                                  value={formData.maritalStatus}
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
                                  value={formData.photograph}
                                  onChange={handleChange}
                                />
                                {errors.photograph && <span className="error">{errors.photograph}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Signature</label>
                                <input
                                  type="file"
                                  name="signature"
                                  value={formData.signature}
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
                            onClick={handleNext}
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
                                  value={formData.presentHouseNo}
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
                                  value={formData.presentLocality}
                                  onChange={handleChange}
                                />
                                {errors.presentLocality && <span className="error">{errors.presentLocality}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Present Country</label>
                                <select
                                  name="presentCountry"
                                  value={formData.presentCountry}
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
                                  value={formData.presentState}
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
                                  value={formData.presentDistrict}
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
                                  value={formData.presentPincode}
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
                                  value={formData.permanentHouseNo}
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
                                  value={formData.permanentLocality}
                                  onChange={handleChange}
                                />
                                {errors.permanentLocality && <span className="error">{errors.permanentLocality}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Permanent Country</label>
                                <select
                                  name="permanentCountry"
                                  value={formData.permanentCountry}
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
                                  value={formData.permanentState}
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
                                  value={formData.permanentDistrict}
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
                                  value={formData.permanentPincode}
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
                            onClick={handleNext}
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
                                  onChange={handleFileChange}
                                />
                                {errors.addressProof && <span className="error">{errors.addressProof}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Identity Proof</label>
                                <input
                                  type="file"
                                  name="identityProof"
                                  onChange={handleFileChange}
                                />
                                {errors.identityProof && <span className="error">{errors.identityProof}</span>}
                              </div>


                              <div className="field-container">
                                <label className="field-label">Physically Challenged</label>
                                <input
                                  type="file"
                                  name="physicallyChallenged"
                                  onChange={handleFileChange}
                                />
                                {errors.physicallyChallenged && <span className="error">{errors.physicallyChallenged}</span>}
                              </div>
                              <div className="field-container">
                                <label className="field-label">Ex-Soldier</label>
                                <input
                                  type="file"
                                  name="exSoldier"
                                  onChange={handleFileChange}
                                />
                                {errors.exSoldier && <span className="error">{errors.exSoldier}</span>}
                              </div>

                              <div className="field-container">
                                <label className="field-label">PanCard</label>
                                <input
                                  type="file"
                                  name="pancard"
                                  onChange={handleFileChange}
                                />
                                {errors.pancard && <span className="error">{errors.pancard}</span>}
                              </div>

                              <div className="field-container">
                                <label className="field-label">Offer Letter</label>
                                <input
                                  type="file"
                                  name="offerLetter"
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
                            onClick={handleNext}
                          />
                        </fieldset>

                        <fieldset style={{ display: step === 3 ? "block" : "none" }}>
                          <h2 className="fs-title">Review</h2>
                          <div className="form-card">
                            <div className="review-section">
                              <h4>Personal Details</h4>
                              <p>
                                <strong>Employee ID:</strong> {formData.employeeId}
                              </p>
                              <p>
                                <strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}
                              </p>

                              <p>
                                <strong>Gender:</strong> {formData.gender}
                              </p>
                              <p>
                                <strong>Marital Status:</strong> {formData.maritalStatus}
                              </p>
                              <p>
                                <strong>Email:</strong> {formData.email}
                              </p>

                              <p>
                                <strong>Date of Birth:</strong> {formData.dob}
                              </p>



                              <h4>Communication Details</h4>
                              <p>
                                <strong>Present Address:</strong>

                                {`${formData.presentLocality}, ${formData.presentDistrict}, ${formData.presentState}`}
                              </p>
                              <p>
                                <strong>Permanent Address:</strong>
                                {`${formData.permanentLocality}, ${formData.permanentDistrict}, ${formData.permanentState}`}
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
    </mian >
  );
};

export default Registration;
