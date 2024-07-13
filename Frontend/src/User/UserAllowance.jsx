
import React, { useState } from 'react';
import Header from "../Header.jsx";
import './UserAllowance.css';
import axios from 'axios';
const UserAllowance = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeId: '',
        allowanceType: '',
        customAllowanceType: '',
        selectedAllowanceTypes: [],
        date: '',
        files: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'allowanceType' && value !== 'other') {
            handleAddAllowanceType(value);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevState) => ({
            ...prevState,
            files: files
        }));
    };

    const handleAddAllowanceType = (allowanceType) => {
        if (allowanceType) {
            setFormData((prevState) => ({
                ...prevState,
                selectedAllowanceTypes: [
                    ...prevState.selectedAllowanceTypes,
                    { type: allowanceType, amount: '', description: '' }
                ],
                allowanceType: '',
                customAllowanceType: ''
            }));
        }
    };

    const handleRemoveAllowanceType = (index) => {
        const updatedSelectedTypes = formData.selectedAllowanceTypes.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            selectedAllowanceTypes: updatedSelectedTypes
        }));
    };

    const handleCustomAllowanceTypeChange = (e) => {
        const value = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            customAllowanceType: value
        }));
    };

    const saveCustomAllowance = (e) => {
        const value = e.target.value;
        if (value && e.key === "Enter") {
            handleAddAllowanceType(value);
        }
    };

    const handleAllowanceChange = (index, key, value) => {
        const updatedAllowances = formData.selectedAllowanceTypes.map((allowance, i) => 
            i === index ? { ...allowance, [key]: value } : allowance
        );
        setFormData((prevState) => ({
            ...prevState,
            selectedAllowanceTypes: updatedAllowances
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dafsdf')
        // Handle form submission
        console.log('Form submitted:', formData);
        const url="http://localhost:5000/api/application/postApplication"
        const id="6691fe89bf8dce82ec9bc900" 
        axios.post(url,{
            ...formData,
            employee: id,
            files:"faskjhfsda"
        });
        // Reset form fields
        setFormData({
            employeeName: '',
            employeeId: '',
            allowanceType: '',
            customAllowanceType: '',
            selectedAllowanceTypes: [],
            date: '',
            files: []
        });
    };

    return (
      <>
        <Header />
        <br/>
        <div className="form-container">
        
            <h2>Allowance Form Submission</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="column">
                        <label htmlFor="employeeName">Employee Name:</label>
                        <input
                            type="text"
                            id="employeeName"
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="column">
                        <label htmlFor="employeeId">Employee ID:</label>
                        <input
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
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
                    {formData.allowanceType === 'other' && (
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
                                    onChange={(e) => handleAllowanceChange(index, 'amount', e.target.value)}
                                />
                                <textarea
                                    placeholder="Description"
                                    value={allowance.description}
                                    rows="1"
                                    onChange={(e) => handleAllowanceChange(index, 'description', e.target.value)}
                                ></textarea>
                                <button type="button" className="remove-btn" onClick={() => handleRemoveAllowanceType(index)}>x</button>
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

                <label htmlFor="fileUpload">Upload Documents (PDF, JPG, JPEG, PNG):</label>
                <input
                    type="file"
                    id="fileUpload"
                    name="fileUpload"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    multiple
                />
                <br/>
                <div className='submit-div'><button type="submit">Submit</button></div>
            </form>
        </div>
      </>
    );
};

export default UserAllowance;