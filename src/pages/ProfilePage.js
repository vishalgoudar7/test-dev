import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getDevoteeProfile } from "../api/api";
import { FaUser, FaPhone, FaPen } from "react-icons/fa";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { profile, logOut } = useUserAuth(); // 'user' removed
  const [localProfile, setLocalProfile] = useState(profile || {});
  const [apiProfile, setApiProfile] = useState(null);
  const [checkoutData, setCheckoutData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get profile data from API
    const fetchApiProfile = async () => {
      try {
        const data = await getDevoteeProfile();
        setApiProfile(data);
      } catch (err) {
        console.error('Error fetching API profile:', err);
      }
    };

    fetchApiProfile();

    // Get stored profile data from localStorage (from checkout/other forms)
    const stored = localStorage.getItem("profile");
    if (stored) {
      setLocalProfile(JSON.parse(stored));
    }

    // Get checkout data if available
    const checkoutStored = localStorage.getItem("checkoutData");
    if (checkoutStored) {
      setCheckoutData(JSON.parse(checkoutStored));
    }
  }, [profile]);

  // Get name from checkout data or local profile, fallback to API profile
  const fullName = 
    checkoutData.devoteeName || 
    (localProfile.firstName || localProfile.lastName
      ? `${localProfile.firstName || ""} ${localProfile.lastName || ""}`.trim()
      : apiProfile?.name || "Your Name");

  // Get mobile number from API profile first, then fallback to local data
  const phoneDisplay = apiProfile?.mobile_number 
    ? apiProfile.mobile_number 
    : (localProfile?.phone ? `+91${localProfile.phone}` : "Not set");

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
        <div className="user-compact-box">
          <h5>Contact Information</h5>
          <p>
            <FaPhone /> Phone: {phoneDisplay}
          </p>
        </div>

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
              <input type="text" value={localProfile.placeOfBirth || ""} readOnly />
            </div>
            <div className="input-field">
              <label>Occupation</label>
              <input type="text" value={localProfile.occupation || ""} readOnly />
            </div>
          </div>
        </div>
      </div>

      <div className="user-compact-note">
        <p>Your personal information is secure with us.</p>
      </div>

      {/* Logout Button */}
      <div className="logout-center">
        <button className="logout-text-btn" onClick={() => setShowConfirm(true)}>
          Logout
        </button>
      </div>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="logout-popup">
          <div className="logout-popup-box">
            <p>Are you sure you want to logout?</p>
            <div className="logout-popup-actions">
              <button onClick={confirmLogout} className="popup-yes">Yes</button>
              <button onClick={() => setShowConfirm(false)} className="popup-no">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
