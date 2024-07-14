import React, { useState } from 'react';
import './UserProfilePage.css';

const UserProfilePage = () => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        eid: '',
        email: '',
        fname: '',
        mname: '',
        lname: '',
        gender: 'male',
        relationType: '',
        relationName: '',
        dob: '',
        maritalStatus: 'single',
        presentAddress: {
            house: '',
            city: '',
            country: '',
            state: '',
            district: '',
            pincode: ''
        },
        permanentAddress: {
            house: '',
            city: '',
            country: '',
            state: '',
            district: '',
            pincode: ''
        },
    });

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleAddressChange = (e, addressType) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [addressType]: {
                ...prevProfile[addressType],
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile saved:', profile);
        setEditMode(false);
    };

    return (
        <div className="container">
            <div className="profile-settings">

                {!editMode && <button className="btn btn-outline-danger" onClick={toggleEditMode}>Edit Profile</button>}
                {editMode && <button className="edit-button" onClick={toggleEditMode}>Cancel</button>}

                <div className='user--profile'>
                    <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='left-container'>
                        <label htmlFor="eid">Employee ID</label>
                        <input type="text" id="eid" name="eid" placeholder="Your Employee ID" value={profile.eid} onChange={handleChange} disabled />

                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" name="fname" placeholder="Your first name.." value={profile.fname} onChange={handleChange} disabled={!editMode} />

                        <label htmlFor="mname">Middle Name</label>
                        <input type="text" id="mname" name="mname" placeholder="Your middle name.." value={profile.mname} onChange={handleChange} disabled={!editMode} />

                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" name="lname" placeholder="Your last name.." value={profile.lname} onChange={handleChange} disabled={!editMode} />

                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={profile.gender} onChange={handleChange} disabled={!editMode}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <label htmlFor="relationType">Relation Type</label>
                        <input type="text" id="relationType" name="relationType" placeholder="Relation type.." value={profile.relationType} onChange={handleChange} disabled={!editMode} />

                        <label htmlFor="relationName">Relation Name</label>
                        <input type="text" id="relationName" name="relationName" placeholder="Relation name.." value={profile.relationName} onChange={handleChange} disabled={!editMode} />

                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" value={profile.dob} onChange={handleChange} disabled={!editMode} />

                        <label htmlFor="maritalStatus">Marital Status</label>
                        <select id="maritalStatus" name="maritalStatus" value={profile.maritalStatus} onChange={handleChange} disabled={!editMode}>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>

                        <label htmlFor="signature">Signature</label>
                        <input type="file" id="signature" name="signature" accept="image/*" disabled={!editMode} />

                        <h5>Present Address</h5>

                        <label htmlFor="present-house">House No./Street Name</label>
                        <input type="text" id="present-house" name="house" placeholder="House no./Street name.." value={profile.presentAddress.house} onChange={(e) => handleAddressChange(e, 'presentAddress')} disabled={!editMode} />
                    </div>
                    <div className='right-container'>
                        <label htmlFor="present-city">City</label>
                        <input type="text" id="present-city" name="city" placeholder="City.." value={profile.presentAddress.city} onChange={(e) => handleAddressChange(e, 'presentAddress')} disabled={!editMode} />

                        <label htmlFor="present-country">Country</label>
                        <input type="text" id="present-country" name="country" placeholder="Country.." value={profile.presentAddress.country} onChange={(e) => handleAddressChange(e, 'presentAddress')} disabled={!editMode} />

                        <label htmlFor="present-state">State</label>
                        <input type="text" id="present-state" name="state" placeholder="State.." value={profile.presentAddress.state} onChange={(e) => handleAddressChange(e, 'presentAddress')} disabled={!editMode} />

                        <label htmlFor="present-district">District</label>
                        <input type="text" id="present-district" name="district" placeholder="District.." value={profile.presentAddress.district} onChange={(e) => handleAddressChange(e, 'presentAddress')} disabled={!editMode} />

                        <label htmlFor="present-pincode">Pincode</label>
                        <input type="text" id="present-pincode" name="pincode" placeholder="Pincode.." value={profile.presentAddress.pincode} onChange={(e) => handleAddressChange(e, 'presentAddress')} disabled={!editMode} />

                        <h5>Permanent Address</h5>

                        <label htmlFor="permanent-house">House No./Street Name</label>
                        <input type="text" id="permanent-house" name="house" placeholder="House no./Street name.." value={profile.permanentAddress.house} onChange={(e) => handleAddressChange(e, 'permanentAddress')} disabled={!editMode} />

                        <label htmlFor="permanent-city">City</label>
                        <input type="text" id="permanent-city" name="city" placeholder="City.." value={profile.permanentAddress.city} onChange={(e) => handleAddressChange(e, 'permanentAddress')} disabled={!editMode} />

                        <label htmlFor="permanent-country">Country</label>
                        <input type="text" id="permanent-country" name="country" placeholder="Country.." value={profile.permanentAddress.country} onChange={(e) => handleAddressChange(e, 'permanentAddress')} disabled={!editMode} />

                        <label htmlFor="permanent-state">State</label>
                        <input type="text" id="permanent-state" name="state" placeholder="State.." value={profile.permanentAddress.state} onChange={(e) => handleAddressChange(e, 'permanentAddress')} disabled={!editMode} />

                        <label htmlFor="permanent-district">District</label>
                        <input type="text" id="permanent-district" name="district" placeholder="District.." value={profile.permanentAddress.district} onChange={(e) => handleAddressChange(e, 'permanentAddress')} disabled={!editMode} />

                        <label htmlFor="permanent-pincode">Pincode</label>
                        <input type="text" id="permanent-pincode" name="pincode" placeholder="Pincode.." value={profile.permanentAddress.pincode} onChange={(e) => handleAddressChange(e, 'permanentAddress')} disabled={!editMode} />

                    </div>
                    {editMode && <button type="submit" id="saveButton">Save Profile</button>}
                </form>
            </div>
        </div>
    );
};

export default UserProfilePage;
