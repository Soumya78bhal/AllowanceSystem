import React, { useEffect, useState } from "react";
import Header from "../Header.jsx";

import "./UserAllowance.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../Feature/Userslice.js";

const UserAllowance = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    allowanceType: "",
    customAllowanceType: "",
    selectedAllowanceTypes: [],
    date: "",
    file: null,
  });
  const user = useSelector(selectUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "allowanceType" && value !== "other") {
      handleAddAllowanceType(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Convert FileList to an array
    setFormData((prevState) => ({
      ...prevState,
      file: file,
    }));
  };

  const handleAddAllowanceType = (allowanceType) => {
    if (allowanceType) {
      setFormData((prevState) => ({
        ...prevState,
        selectedAllowanceTypes: [
          ...prevState.selectedAllowanceTypes,
          { type: allowanceType, amount: "", description: "" },
        ],
        allowanceType: "",
        customAllowanceType: "",
      }));
    }
  };

  const handleRemoveAllowanceType = (index) => {
    const updatedSelectedTypes = formData.selectedAllowanceTypes.filter(
      (_, i) => i !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      selectedAllowanceTypes: updatedSelectedTypes,
    }));
  };

  const handleCustomAllowanceTypeChange = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      customAllowanceType: value,
    }));
  };

  const saveCustomAllowance = (e) => {
    const value = e.target.value;
    if (value && e.key === "Enter") {
      handleAddAllowanceType(value);
    }
  };

  const handleAllowanceChange = (index, key, value) => {
    const updatedAllowances = formData.selectedAllowanceTypes.map(
      (allowance, i) =>
        i === index ? { ...allowance, [key]: value } : allowance
    );
    setFormData((prevState) => ({
      ...prevState,
      selectedAllowanceTypes: updatedAllowances,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "https://allowance-system-dfe7.onrender.com/api/application/postApplication";

    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file);
    formDataToSend.append("employee", user.docId);
    formDataToSend.append("employeeId", user.employeeId);
    formDataToSend.append("employeeName", user.username);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("allowanceType", formData.allowanceType);
    formDataToSend.append(
      "selectedAllowanceTypes",
      JSON.stringify(formData.selectedAllowanceTypes)
    );
    

    axios
      .post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast(res.data.message);
        // Reset form fields
        setFormData({
          employeeName: "",
          employeeId: "",
          allowanceType: "",
          customAllowanceType: "",
          selectedAllowanceTypes: [],
          date: "",
          file: null,
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error submitting form");
      });
  };



  return (
    <>
      <div className="form-container">
        <h2>Allowance Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <label htmlFor="employeeName">Employee Username:</label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={user.username}
                required
                readOnly
              />
            </div>
            <div className="column">
              <label htmlFor="employeeId">Employee ID:</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={user.employeeId}
                required
                readOnly
              />
            </div>
          </div>

          <label htmlFor="allowanceType">Allowance Type:</label>
          <div className="allowance-type-container">
            <select
              id="allowanceType"
              name="allowanceType"
              value={formData.allowanceType}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="travel">Travel</option>
              <option value="meal">Meal</option>
              <option value="accommodation">Accommodation</option>
              <option value="other">Other</option>
            </select>
            {formData.allowanceType === "other" && (
              <input
                type="text"
                id="customAllowanceType"
                name="customAllowanceType"
                placeholder="Specify other..."
                value={formData.customAllowanceType}
                onChange={handleCustomAllowanceTypeChange}
                onKeyDown={saveCustomAllowance}
              />
            )}
          </div>

          <div className="selected-allowance-types-container">
            <ul className="selected-allowance-types">
              {formData.selectedAllowanceTypes.map((allowance, index) => (
                <li key={index}>
                  <span>{allowance.type}</span>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={allowance.amount}
                    onChange={(e) =>
                      handleAllowanceChange(index, "amount", e.target.value)
                    }
                    required={true}
                  />
                  <textarea
                    placeholder="Description"
                    value={allowance.description}
                    rows="1"
                    onChange={(e) =>
                      handleAllowanceChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  ></textarea>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveAllowanceType(index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="fileUpload">
            Upload Documents (PDF, JPG, JPEG, PNG):
          </label>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          <br />
          <div className="submit-div">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserAllowance;
