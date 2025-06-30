// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/EditProfile.css";

// const EditProfile = () => {
//   const { profile, setProfile } = useUserAuth();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     dob: "",
//     placeOfBirth: "",
//     occupation: "",
//     phone: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (profile) setFormData({ ...formData, ...profile });
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setProfile(formData);
//     localStorage.setItem("profile", JSON.stringify(formData));
//     navigate("/profile");
//   };

//   return (
//     <div className="edit-container">
//       <h4 className="breadcrumb">Home &gt; Profile &gt; Edit Profile Details</h4>
//       <div className="edit-section">
//         <h3>Edit Profile Details</h3>

//         <form onSubmit={handleSave}>
//           <div className="form-group">
//             <label>Your Mobile Number</label>
//             <input type="text" value={`+91${formData.phone}`} readOnly />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>First Name</label>
//               <input name="firstName" value={formData.firstName} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input name="lastName" value={formData.lastName} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Gender</label>
//               <select name="gender" value={formData.gender} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Date of Birth</label>
//               <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Place of Birth</label>
//               <input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Occupation</label>
//               <select name="occupation" value={formData.occupation} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option>Student</option>
//                 <option>Employed</option>
//                 <option>Self-Employed</option>
//                 <option>Retired</option>
//               </select>
//             </div>
//           </div>

//           <button type="submit" className="save-btn">Save Changes</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



// src/pages/EditProfile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { profile, setProfile } = useUserAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    placeOfBirth: "",
    occupation: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        ...profile,
      }));
    } else {
      const savedProfile = localStorage.getItem("profile");
      if (savedProfile) {
        setFormData(JSON.parse(savedProfile));
      }
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem("profile", JSON.stringify(formData));
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <h4 className="breadcrumb">Home &gt; Profile &gt; Edit Profile Details</h4>
      <div className="edit-section">
        <h3>Edit Profile Details</h3>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Your Mobile Number</label>
            <input type="text" value={`+91${formData.phone}`} readOnly />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Place of Birth</label>
              <input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Occupation</label>
              <select name="occupation" value={formData.occupation} onChange={handleChange}>
                <option value="">Select</option>
                <option>Student</option>
                <option>Employed</option>
                <option>Self-Employed</option>
                <option>Retired</option>
              </select>
            </div>
          </div>

          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
