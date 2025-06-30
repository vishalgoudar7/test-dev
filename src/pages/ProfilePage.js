

// import React from "react";
// import { Link } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// import { FaUser, FaPhone, FaEnvelope, FaPen } from "react-icons/fa";
// import "../styles/ProfilePage.css";

// const ProfilePage = () => {
//   const { user, profile } = useUserAuth();

//   if (!user || !profile) {
//     return (
//       <div className="container text-center mt-5">
//         <h4>Please log in to view your profile.</h4>
//       </div>
//     );
//   }

//   const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div>
//           <FaUser className="profile-avatar" />
//           <h3>{fullName || "Your Name"}</h3>
//           <p>+91{profile.phone}</p>
//         </div>
//         <Link to="/profile/edit" className="edit-btn">
//           <FaPen /> Edit
//         </Link>
//       </div>

//       <div className="complete-box">
//         <p>Please complete your profile</p>
//         <Link to="/profile/edit" className="complete-link">
//           &gt;
//         </Link>
//       </div>

//       <div className="info-sections">
//         <div className="info-box">
//           <h5>Contact Information</h5>
//           <p><FaPhone /> Phone: +91{profile.phone}</p>
//         </div>
//         <div className="info-box">
//           <h5>General Information</h5>
//           <p>Gender: {profile.gender || "Add Gender"}</p>
//           <p>Date of Birth: {profile.dob || "Add date of birth"}</p>
//           <p>Place of Birth: {profile.placeOfBirth || "Add Place of Birth"}</p>
//           <p>Occupation: {profile.occupation || "Add Occupation"}</p>
//         </div>
//       </div>

//       <div className="secure-note">
//         <p>Your personal information is secure with us.</p>
//         <p>We only use it to provide you a better experience.</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;





// src/pages/ProfilePage.js
import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { FaUser, FaPhone, FaEnvelope, FaPen } from "react-icons/fa";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, profile } = useUserAuth();

  // Ensure that a user is logged in. Profile data may or may not exist yet.
  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h4>Please log in to view your profile.</h4>
      </div>
    );
  }

  // Use profile data if available; otherwise, show defaults.
  const fullName =
    profile && (profile.firstName || profile.lastName)
      ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
      : "Your Name";

  // For phone, if profile.phone is not set, display a default "Not set" message
  const phoneDisplay =
    profile && profile.phone ? `+91${profile.phone}` : "Not set";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div>
          <FaUser className="profile-avatar" />
          <h3>{fullName}</h3>
          <p>{phoneDisplay}</p>
        </div>
        <Link to="/profile/edit" className="edit-btn">
          <FaPen /> Edit
        </Link>
      </div>

      {/* Show a prompt to complete profile only when key details are missing */}
      {(!profile || !profile.phone) && (
        <div className="complete-box">
          <p>Please complete your profile</p>
          <Link to="/profile/edit" className="complete-link">
            &gt;
          </Link>
        </div>
      )}

      <div className="info-sections">
        <div className="info-box">
          <h5>Contact Information</h5>
          <p>
            <FaPhone /> Phone: {phoneDisplay}
          </p>
        </div>
        <div className="info-box">
          <h5>General Information</h5>
          <p>Gender: {profile && profile.gender ? profile.gender : "Add Gender"}</p>
          <p>Date of Birth: {profile && profile.dob ? profile.dob : "Add date of birth"}</p>
          <p>
            Place of Birth:{" "}
            {profile && profile.placeOfBirth ? profile.placeOfBirth : "Add Place of Birth"}
          </p>
          <p>
            Occupation: {profile && profile.occupation ? profile.occupation : "Add Occupation"}
          </p>
        </div>
      </div>

      <div className="secure-note">
        <p>Your personal information is secure with us.</p>
        <p>We only use it to provide you a better experience.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
