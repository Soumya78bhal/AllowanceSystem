import React, { useState } from "react";
import "./CreateUser.css";
import Header from "../Header.jsx"
import axios from "axios";
import { useNavigate } from "react-router";

const CreateUser = () => {

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate formData and set errors
    // Submit formData
    const formDataToSend = new FormData();
    formDataToSend.append('employeeId', formData.employeeId);
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('middleName', formData.middleName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('relationType', formData.relationType);
    formDataToSend.append('relationName', formData.relationName);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('maritalStatus', formData.maritalStatus);
    formDataToSend.append('photograph', formData.photograph);
    formDataToSend.append('signature', formData.signature);
    formDataToSend.append('presentHouseNo', formData.presentHouseNo);
    formDataToSend.append('presentLocality', formData.presentLocality);
    formDataToSend.append('presentCountry', formData.presentCountry);
    formDataToSend.append('presentState', formData.presentState);
    formDataToSend.append('presentDistrict', formData.presentDistrict);
    formDataToSend.append('presentPincode', formData.presentPincode);
    formDataToSend.append('permanentHouseNo', formData.permanentHouseNo);
    formDataToSend.append('permanentLocality', formData.permanentLocality);
    formDataToSend.append('permanentCountry', formData.permanentCountry);
    formDataToSend.append('permanentState', formData.permanentState);
    formDataToSend.append('permanentDistrict', formData.permanentDistrict);
    formDataToSend.append('permanentPincode', formData.permanentPincode);
    formDataToSend.append('addressProof', formData.addressProof);
    formDataToSend.append('identityProof', formData.identityProof);
    formDataToSend.append('physicallyChallenged', formData.physicallyChallenged);
    formDataToSend.append('exSoldier', formData.exSoldier);
    formDataToSend.append('pancard', formData.pancard);
    formDataToSend.append('offerLetter', formData.offerLetter);
    formDataToSend.append('isVerified', true);

    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 201) {
            alert('User created successfully');
            navigate('/admin/dashboad');
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error during signup: ', error);
        alert('Internal server error');
    }
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

  return (  
    <>
    <Header />
    <div className="container-fluid" id="grad1">
      <button type="button" class="btn btn-outline-dark top-right-button">Login</button>
      <div className="row justify-content-center mt-0">
        <div className=" innercontainer  col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2 ">
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
                      onClick={handleSubmit}
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
  );
};

export default CreateUser;
