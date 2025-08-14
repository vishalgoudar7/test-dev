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
  const [completion, setCompletion] = useState(0);
  const navigate = useNavigate();

  // Fields to calculate profile completion
  const requiredFields = [
    "firstName",
    "lastName",
    "phone",
    "gender",
    "dob",
    "placeOfBirth",
    "occupation",
    "kula",
    "gotra",
    "rashi",
    "nakshatra",
    "street1",
    "city",
    "state",
    "pincode",
    "sankalpa"
  ];

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

  // Calculate profile completion
  useEffect(() => {
    const total = requiredFields.length;
    let filled = 0;

    requiredFields.forEach((field) => {
      if (localProfile[field] && localProfile[field].toString().trim() !== "") {
        filled++;
      }
    });

    setCompletion(Math.round((filled / total) * 100));
  }, [localProfile]);

  const getBarColor = () => {
    if (completion < 40) return "#f44336"; // red
    if (completion < 80) return "#ff9800"; // orange
    return "#4caf50"; // green
  };

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

          {/* Profile Completion Meter */}
          <div className="profile-completion-container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
              marginTop: 8
            }}>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#333' }}>
                Profile Completion
              </span>
              <span style={{
                fontWeight: 700,
                fontSize: 18,
                color: getBarColor(),
                background: '#fff',
                borderRadius: 12,
                padding: '2px 12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
              }}>{completion}%</span>
            </div>
            <div style={{
              width: '100%',
              height: 18,
              background: 'linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 100%)',
              borderRadius: 12,
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 4
            }}>
              <div style={{
                width: `${completion}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${getBarColor()} 0%, #8bc34a 100%)`,
                borderRadius: 12,
                transition: 'width 0.6s cubic-bezier(.4,2,.3,1)',
                boxShadow: '0 2px 8px rgba(76,175,80,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: completion > 10 ? 'flex-end' : 'flex-start',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                paddingRight: completion > 10 ? 10 : 0
              }}>
                {/* Optionally show percentage inside bar for high completion */}
                {completion > 70 && <span>{completion}%</span>}
              </div>
            </div>
          </div>
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
