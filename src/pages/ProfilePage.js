// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// import { getDevoteeProfile } from "../api/api"; // Assuming api.js is in api/api.js
// import { FaUser, FaPhone, FaPen } from "react-icons/fa";
// import "../styles/ProfilePage.css"; // Ensure this CSS file is present

// const ProfilePage = () => {
//   const { profile, logOut } = useUserAuth();
//   const [localProfile, setLocalProfile] = useState(profile || {});
//   const [apiProfile, setApiProfile] = useState(null);
//   const [checkoutData, setCheckoutData] = useState({});
//   const [showConfirm, setShowConfirm] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get profile data from API
//     const fetchApiProfile = async () => {
//       try {
//         const data = await getDevoteeProfile();
//         setApiProfile(data);

//         // Update localProfile with API data for display
//         // Split the 'name' field into firstName and lastName for consistency
//         const fullName = data.name || "";
//         const nameParts = fullName.split(' ');
//         const firstName = nameParts[0] || "";
//         const lastName = nameParts.slice(1).join(' ') || "";

//         setLocalProfile(prev => ({
//           ...prev,
//           firstName: firstName,
//           lastName: lastName,
//           phone: data.mobile_number || "",
//           gender: data.gender || "",
//           dob: data.dob || "",
//           placeOfBirth: data.place_of_birth || "",
//           occupation: data.occupation || "",
//           kula: data.kula || "", // Populate new fields from API
//           gotra: data.gotra || "",
//           rashi: data.rashi || "",
//           nakshatra: data.nakshatra || "",
//           street1: data.address || "", // Map to street1
//           street2: data.street_address || "", // Map to street2
//           area: data.area || "",
//           city: data.city || "",
//           state: data.state || "",
//           pincode: data.pincode ? String(data.pincode) : "",
//           sankalpa: data.sankalpa || "",
//         }));

//       } catch (err) {
//         console.error('Error fetching API profile:', err);
//       }
//     };

//     fetchApiProfile();

//     // Get stored profile data from localStorage (from checkout/other forms)
//     // This might be redundant if API is primary source, but kept for existing logic
//     const stored = localStorage.getItem("profile");
//     if (stored) {
//       setLocalProfile(JSON.parse(stored));
//     }

//     // Get checkout data if available
//     const checkoutStored = localStorage.getItem("checkoutData");
//     if (checkoutStored) {
//       setCheckoutData(JSON.parse(checkoutStored));
//     }
//   }, [profile]); // Depend on 'profile' from context, if it's updated externally

//   // Get name from checkout data or local profile, fallback to API profile
//   const fullName =
//     checkoutData.devoteeName ||
//     (localProfile.firstName || localProfile.lastName
//       ? `${localProfile.firstName || ""} ${localProfile.lastName || ""}`.trim()
//       : apiProfile?.name || "Your Name");

//   // Get mobile number from API profile first, then fallback to local data
//   const phoneDisplay = apiProfile?.mobile_number
//     ? apiProfile.mobile_number
//     : (localProfile?.phone ? `+91${localProfile.phone}` : "Not set");

//   const confirmLogout = async () => {
//     await logOut();
//     navigate("/");
//   };

//   return (
//     <div className="user-compact-profile">
//       <div className="user-compact-header">
//         <div>
//           <FaUser className="user-compact-avatar" />
//           <h3>{fullName}</h3>
//           <p>{phoneDisplay}</p>
//         </div>
//         <Link to="/profile/edit" className="user-compact-edit-btn">
//           <FaPen /> Edit
//         </Link>
//       </div>

//       {!localProfile?.phone && ( // Check for phone from localProfile (which is updated by API)
//         <div className="user-compact-warning">
//           <p>Please complete your profile</p>
//           <Link to="/profile/edit" className="user-compact-warning-link">
//             &gt;
//           </Link>
//         </div>
//       )}

//       <div className="user-compact-grid">
//         <div className="user-compact-box">
//           <h5>Contact Information</h5>
//           <p>
//             <FaPhone /> Phone: {phoneDisplay}
//           </p>
//         </div>

//         <div className="user-compact-box">
//           <h5>General Information</h5>
//           <div className="user-grid-form">
//             <div className="input-field">
//               <label>Gender</label>
//               <input type="text" value={localProfile.gender || ""} readOnly />
//             </div>
//             <div className="input-field">
//               <label>Date of Birth</label>
//               <input type="date" value={localProfile.dob || ""} readOnly />
//             </div>
//             <div className="input-field">
//               <label>Place of Birth</label>
//               <input type="text" value={localProfile.placeOfBirth || ""} readOnly />
//             </div>
//             <div className="input-field">
//               <label>Occupation</label>
//               <input type="text" value={localProfile.occupation || ""} readOnly />
//             </div>
//             {/* New fields: Kula, Gotra, Rashi, Nakshatra */}
//             <div className="input-field">
//               <label>Kula</label>
//               <input type="text" value={localProfile.kula || ""} readOnly />
//             </div>
//             <div className="input-field">
//               <label>Gotra</label>
//               <input type="text" value={localProfile.gotra || ""} readOnly />
//             </div>
//             <div className="input-field">
//               <label>Rashi</label>
//               <input type="text" value={localProfile.rashi || ""} readOnly />
//             </div>
//             <div className="input-field">
//               <label>Nakshatra</label>
//               <input type="text" value={localProfile.nakshatra || ""} readOnly />
//             </div>
//             {/* End of new fields */}
//           </div>
//         </div>
//       </div>

//       <div className="user-compact-note">
//         <p>Your personal information is secure with us.</p>
//       </div>

//       {/* Logout Button */}
//       <div className="logout-center">
//         <button className="logout-text-btn" onClick={() => setShowConfirm(true)}>
//           Logout
//         </button>
//       </div>

//       {/* Confirmation Popup */}
//       {showConfirm && (
//         <div className="logout-popup">
//           <div className="logout-popup-box">
//             <p>Are you sure you want to logout?</p>
//             <div className="logout-popup-actions">
//               <button onClick={confirmLogout} className="popup-yes">Yes</button>
//               <button onClick={() => setShowConfirm(false)} className="popup-no">No</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;








// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getDevoteeProfile } from "../api/api";
import { FaUser, FaPhone, FaPen, FaHome } from "react-icons/fa";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { profile, logOut } = useUserAuth();
  const [localProfile, setLocalProfile] = useState(profile || {});
  const [apiProfile, setApiProfile] = useState(null);
  const [checkoutData, setCheckoutData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApiProfile = async () => {
      try {
        const data = await getDevoteeProfile();
        setApiProfile(data);

        const fullName = data.name || "";
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setLocalProfile((prev) => ({
          ...prev,
          firstName: firstName,
          lastName: lastName,
          phone: data.mobile_number || "",
          gender: data.gender || "",
          dob: data.dob || "",
          placeOfBirth: data.place_of_birth || "",
          occupation: data.occupation || "",
          kula: data.kula || "",
          gotra: data.gotra || "",
          rashi: data.rashi || "",
          nakshatra: data.nakshatra || "",
          street1: data.address || "",
          street2: data.street_address || "",
          area: data.area || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode ? String(data.pincode) : "",
          sankalpa: data.sankalpa || "",
        }));
      } catch (err) {
        console.error("Error fetching API profile:", err);
      }
    };

    fetchApiProfile();

    const stored = localStorage.getItem("profile");
    if (stored) {
      setLocalProfile(JSON.parse(stored));
    }

    const checkoutStored = localStorage.getItem("checkoutData");
    if (checkoutStored) {
      setCheckoutData(JSON.parse(checkoutStored));
    }
  }, [profile]);

  const fullName =
    checkoutData.devoteeName ||
    (localProfile.firstName || localProfile.lastName
      ? `${localProfile.firstName || ""} ${localProfile.lastName || ""}`.trim()
      : apiProfile?.name || "Your Name");

  const phoneDisplay = apiProfile?.mobile_number
    ? apiProfile.mobile_number
    : localProfile?.phone
    ? `+91${localProfile.phone}`
    : "Not set";

  const confirmLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="user-compact-profile">
      <div className="user-compact-header">
        <div>
          <FaUser className="user-compact-avatar" />
          <h3>{fullName}</h3>
          <p>{phoneDisplay}</p>
        </div>
        <Link to="/profile/edit" className="user-compact-edit-btn">
          <FaPen /> Edit
        </Link>
      </div>

      {!localProfile?.phone && (
        <div className="user-compact-warning">
          <p>Please complete your profile</p>
          <Link to="/profile/edit" className="user-compact-warning-link">
            &gt;
          </Link>
        </div>
      )}

      <div className="user-compact-grid">
        {/* Contact Info */}
        <div className="user-compact-box">
          <h5>Contact Information</h5>
          <p>
            <FaPhone /> Phone: {phoneDisplay}
          </p>
        </div>

        {/* General Info */}
        <div className="user-compact-box">
          <h5>General Information</h5>
          <div className="user-grid-form">
            <div className="input-field">
              <label>Gender</label>
              <input type="text" value={localProfile.gender || ""} readOnly />
            </div>
            <div className="input-field">
              <label>Date of Birth</label>
              <input type="date" value={localProfile.dob || ""} readOnly />
            </div>
            <div className="input-field">
              <label>Place of Birth</label>
              <input
                type="text"
                value={localProfile.placeOfBirth || ""}
                readOnly
              />
            </div>
            <div className="input-field">
              <label>Occupation</label>
              <input
                type="text"
                value={localProfile.occupation || ""}
                readOnly
              />
            </div>
            <div className="input-field">
              <label>Kula</label>
              <input type="text" value={localProfile.kula || ""} readOnly />
            </div>
            <div className="input-field">
              <label>Gotra</label>
              <input type="text" value={localProfile.gotra || ""} readOnly />
            </div>
            <div className="input-field">
              <label>Rashi</label>
              <input type="text" value={localProfile.rashi || ""} readOnly />
            </div>
            <div className="input-field">
              <label>Nakshatra</label>
              <input
                type="text"
                value={localProfile.nakshatra || ""}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Info */}
      <div className="user-compact-box" style={{ marginTop: "20px" }}>
        <h5>
          <FaHome style={{ marginRight: "6px" }} />
          Address Details
        </h5>
        <div className="user-grid-form">
          <div className="input-field">
            <label>Street Address 1</label>
            <input type="text" value={localProfile.street1 || ""} readOnly />
          </div>
          <div className="input-field">
            <label>Street Address 2</label>
            <input type="text" value={localProfile.street2 || ""} readOnly />
          </div>
          <div className="input-field">
            <label>Area</label>
            <input type="text" value={localProfile.area || ""} readOnly />
          </div>
          <div className="input-field">
            <label>City</label>
            <input type="text" value={localProfile.city || ""} readOnly />
          </div>
          <div className="input-field">
            <label>State</label>
            <input type="text" value={localProfile.state || ""} readOnly />
          </div>
          <div className="input-field">
            <label>Pincode</label>
            <input type="text" value={localProfile.pincode || ""} readOnly />
          </div>
          <div className="input-field" style={{ gridColumn: "1 / -1" }}>
            <label>Sankalpa</label>
            <input type="text" value={localProfile.sankalpa || ""} readOnly />
          </div>
        </div>
      </div>

      <div className="user-compact-note">
        <p>Your personal information is secure with us.</p>
      </div>

      <div className="logout-center">
        <button
          className="logout-text-btn"
          onClick={() => setShowConfirm(true)}
        >
          Logout
        </button>
      </div>

      {showConfirm && (
        <div className="logout-popup">
          <div className="logout-popup-box">
            <p>Are you sure you want to logout?</p>
            <div className="logout-popup-actions">
              <button onClick={confirmLogout} className="popup-yes">
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="popup-no"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
