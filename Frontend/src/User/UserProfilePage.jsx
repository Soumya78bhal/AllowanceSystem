import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../Feature/Userslice';

const UserProfilePage = () => {
    const [editMode, setEditMode] = useState(false);
    const user = useSelector(selectUser);
    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/profile/fetchDetails/${user.docId}`);
            setDetails(response.data);
        } catch (err) {
            console.error('Error fetching employee details:', err);
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [user]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e, section, field) => {
        const { value } = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [section]: {
                ...prevDetails[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response1 = await axios.post(`http://localhost:5000/api/profile/personalDetails`, details.personalDetails);
            const response2 = await axios.post(`http://localhost:5000/api/profile/communicationDetails`, details.communicationDetails);

            console.log(response1.data);
            console.log(response2.data);
        } catch (err) {
            console.error('Error updating employee details:', err);
            alert(err.message);
        }
        console.log('Profile saved:', details);
        setEditMode(false);
        fetchDetails();
    };

    return (
        <div className="container">
            <div className="profile-settings">
                {!editMode && <button className="btn btn-outline-danger" onClick={toggleEditMode}>Edit Profile</button>}
                {editMode && <button className="edit-button" onClick={toggleEditMode}>Cancel</button>}

                <div className='user--profile'>
                    <img src={details?.personalDetails.photograph} alt='userpic' width="100" className="rounded-circle" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='left-container'>
                        <label htmlFor="eid">Employee ID</label>
                        <input type="text" id="eid" name="eid" placeholder="Your Employee ID" value={user?.employeeId} disabled />

                        <label htmlFor="fname"> Name</label>
                        <input type="text" id="fname" name="fname" placeholder="Your name.." value={details?.personalDetails.name} onChange={(e) => handleInputChange(e, 'personalDetails', 'name')} disabled={!editMode} />

                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={details?.personalDetails.gender} onChange={(e) => handleInputChange(e, 'personalDetails', 'gender')} disabled={!editMode}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <label htmlFor="relationType">Relation Type</label>
                        <input type="text" id="relationType" name="relationType" placeholder="Relation type.." value={details?.personalDetails.relationType} onChange={(e) => handleInputChange(e, 'personalDetails', 'relationType')} disabled={!editMode} />

                        <label htmlFor="relationName">Relation Name</label>
                        <input type="text" id="relationName" name="relationName" placeholder="Relation name.." value={details?.personalDetails.relationName} onChange={(e) => handleInputChange(e, 'personalDetails', 'relationName')} disabled={!editMode} />

                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" value={details?.personalDetails.dob} onChange={(e) => handleInputChange(e, 'personalDetails', 'dob')} disabled={!editMode} />

                        <label htmlFor="maritalStatus">Marital Status</label>
                        <select id="maritalStatus" name="maritalStatus" value={details?.personalDetails.maritalStatus} onChange={(e) => handleInputChange(e, 'personalDetails', 'maritalStatus')} disabled={!editMode}>
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                        </select>

                        <label htmlFor="signature">Signature</label>
                        <input type="file" id="signature" name="signature" accept="image/*" disabled={!editMode} />

                        <h5>Present Address</h5>

                        <label htmlFor="present-house">House No./Street Name</label>
                        <input type="text" id="present-house" name="house" placeholder="House no./Street name.." value={details?.communicationDetails.presentHouse} onChange={(e) => handleInputChange(e, 'communicationDetails', 'presentHouse')} disabled={!editMode} />
                    </div>
                    <div className='right-container'>
                        <label htmlFor="present-city">City</label>
                        <input type="text" id="present-city" name="city" placeholder="City.." value={details?.communicationDetails.presentCity} onChange={(e) => handleInputChange(e, 'communicationDetails', 'presentCity')} disabled={!editMode} />

                        <label htmlFor="present-country">Country</label>
                        <input type="text" id="present-country" name="country" placeholder="Country.." value={details?.communicationDetails.presentCountry} onChange={(e) => handleInputChange(e, 'communicationDetails', 'presentCountry')} disabled={!editMode} />

                        <label htmlFor="present-state">State</label>
                        <input type="text" id="present-state" name="state" placeholder="State.." value={details?.communicationDetails.presentState} onChange={(e) => handleInputChange(e, 'communicationDetails', 'presentState')} disabled={!editMode} />

                        <label htmlFor="present-district">District</label>
                        <input type="text" id="present-district" name="district" placeholder="District.." value={details?.communicationDetails.presentDistrict} onChange={(e) => handleInputChange(e, 'communicationDetails', 'presentDistrict')} disabled={!editMode} />

                        <label htmlFor="present-pincode">Pincode</label>
                        <input type="text" id="present-pincode" name="pincode" placeholder="Pincode.." value={details?.communicationDetails.presentPinCode} onChange={(e) => handleInputChange(e, 'communicationDetails', 'presentPinCode')} disabled={!editMode} />

                        <h5>Permanent Address</h5>

                        <label htmlFor="permanent-house">House No./Street Name</label>
                        <input type="text" id="permanent-house" name="house" placeholder="House no./Street name.." value={details?.communicationDetails.permanentHouse} onChange={(e) => handleInputChange(e, 'communicationDetails', 'permanentHouse')} disabled={!editMode} />

                        <label htmlFor="permanent-city">City</label>
                        <input type="text" id="permanent-city" name="city" placeholder="City.." value={details?.communicationDetails.permanentCity} onChange={(e) => handleInputChange(e, 'communicationDetails', 'permanentCity')} disabled={!editMode} />

                        <label htmlFor="permanent-country">Country</label>
                        <input type="text" id="permanent-country" name="country" placeholder="Country.." value={details?.communicationDetails.permanentCountry} onChange={(e) => handleInputChange(e, 'communicationDetails', 'permanentCountry')} disabled={!editMode} />

                        <label htmlFor="permanent-state">State</label>
                        <input type="text" id="permanent-state" name="state" placeholder="State.." value={details?.communicationDetails.permanentState} onChange={(e) => handleInputChange(e, 'communicationDetails', 'permanentState')} disabled={!editMode} />

                        <label htmlFor="permanent-district">District</label>
                        <input type="text" id="permanent-district" name="district" placeholder="District.." value={details?.communicationDetails.permanentDistrict} onChange={(e) => handleInputChange(e, 'communicationDetails', 'permanentDistrict')} disabled={!editMode} />

                        <label htmlFor="permanent-pincode">Pincode</label>
                        <input type="text" id="permanent-pincode" name="pincode" placeholder="Pincode.." value={details?.communicationDetails.permanentPinCode} onChange={(e) => handleInputChange(e, 'communicationDetails', 'permanentPinCode')} disabled={!editMode} />

                    </div>
                    {editMode && <button type="submit" id="saveButton">Save Profile</button>}
                </form>
            </div>
        </div>
    );
};

export default UserProfilePage;
