// // src/pages/EditProfile.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/EditProfile.css";

// const EditProfile = () => {
//   const { profile } = useUserAuth();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     gender: "",
//     dob: "",
//     placeOfBirth: "",
//     occupation: "",
//     street1: "",
//     street2: "",
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//     sankalpa: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (profile) {
//       setFormData((prev) => ({
//         ...prev,
//         ...profile,
//       }));
//     } else {
//       const savedProfile = localStorage.getItem("profile");
//       if (savedProfile) {
//         setFormData(JSON.parse(savedProfile));
//       }
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     localStorage.setItem("profile", JSON.stringify(formData));
//     navigate("/profile");
//   };

//   return (
//     <div className="edit-wrapper">
//       <div className="edit-box">
//         <h3>Edit Profile Details</h3>
//         <form onSubmit={handleSave}>
//           <div className="form-group">
//             <label>Your Mobile Number</label>
//             <input
//               name="phone"
//               type="text"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="+91xxxxxxxxxx"
//               maxLength={10}
//               required
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>First Name</label>
//               <input name="firstName" value={formData.firstName} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input name="lastName" value={formData.lastName} onChange={handleChange} required />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Gender</label>
//               <select name="gender" value={formData.gender} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Date of Birth</label>
//               <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
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

//           <h4>Address Details</h4>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Street Address 1 *</label>
//               <input name="street1" value={formData.street1} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>Street Address 2</label>
//               <input name="street2" value={formData.street2} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Area *</label>
//               <input name="area" value={formData.area} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>City *</label>
//               <input name="city" value={formData.city} onChange={handleChange} required />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>State *</label>
//               <input name="state" value={formData.state} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>Pincode *</label>
//               <input
//                 name="pincode"
//                 value={formData.pincode}
//                 maxLength={6}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     pincode: e.target.value.replace(/[^0-9]/g, ""),
//                   }))
//                 }
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Sankalpa (optional)</label>
//             <input name="sankalpa" value={formData.sankalpa} onChange={handleChange} />
//           </div>

//           <button type="submit" className="save-btn">SAVE CHANGES</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;





import React, { useState, useEffect } from "react";
import "../styles/EditProfile.css"; // Import the original CSS file
// useNavigate is not directly used in this self-contained example,
// but kept for context if integrated into a larger app.
// import { useNavigate } from "react-router-dom";

// Mock implementation for useUserAuth and API functions for self-contained example
// In a real application, these would be imported from their respective files.

// Mock useUserAuth hook
const useUserAuth = () => {
  // Simulate a logged-in user and a profile that might exist in context
  const [user, setUser] = useState({ uid: 'mockUserId123' });
  // This profile would typically come from context or be fetched.
  // For this self-contained example, we'll fetch it in EditProfile directly.
  const [profile, setProfile] = useState(null);

  // Simulate initial authentication state
  useEffect(() => {
    // In a real app, this would check Firebase auth state or similar
    // For now, just set a mock user after a short delay
    const timer = setTimeout(() => {
      setUser({ uid: 'mockUserId123', email: 'user@example.com' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return { user, profile };
};

// Mock API functions - Updated to reflect the provided API response structure
const mockProfileData = {
  id: 777,
  name: "Shreelata", // Single name field
  mobile_number: "+919481646118",
  email: null,
  profile_image: null,
  user_type: "Devotee",
  token: "c91ae32509fa4ce4e8c21aa4a86118100f97c4f2",
  last_login: "2025-07-28T12:58:16.233166",
  date_joined: "2025-06-19T15:12:12.265474",
  app_version: "1",
  last_login_device: "Browser",
  lang: "en",
  notification: false,
  dob: "1990-01-01", // Added a mock DOB for testing
  gender: "Male", // Added a mock gender
  taluk: null,
  district: null,
  area: "Downtown Mock",
  city: "belagavi",
  state: "kar",
  pincode: 345678,
  address: "somewhere", // This will map to street1
  street_address: "Apt 4B Mock", // This will map to street2
  details: null,
  religion: null,
  caste: null,
  subcaste: null,
  experiance: null,
  know_language: null,
  age: null,
  bank_account: { },
  ratings: [ ],
  avg_rating: 0,
  dynamic_link: "Namaskar, Check out this Pandit ji on Devalaya App. Shreelata I found on DEVALAYA app, You can book customised pujas, get Live darshan of your favourite Gods & much more, all in one app. Link: {}",
  dynamic_link_plain: "https://beta.app.devalayas.com/N2WA",
  cscid: null,
  native_place: null,
  kuldevata: null,
  kuldevata_place: null,
  place_of_birth: "New York Mock",
  time_of_birth: null,
  kula: "MockKula",
  gotra: "MockGotra",
  rashi: "MockRashi",
  nakshatra: "MockNakshatra"
};

const getDevoteeProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: Fetching profile data...");
      resolve(mockProfileData);
    }, 500); // Simulate network delay
  });
};

const updateDevoteeProfile = async (profileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API: Updating profile with:", profileData);
      // In a real app, you'd send this to the backend.
      Object.assign(mockProfileData, {
        name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim(),
        mobile_number: profileData.mobile_number,
        gender: profileData.gender,
        dob: profileData.dob,
        place_of_birth: profileData.place_of_birth,
        occupation: profileData.occupation,
        address: profileData.address,
        street_address: profileData.street_address,
        area: profileData.area,
        city: profileData.city,
        state: profileData.state,
        pincode: profileData.pincode,
        sankalpa: profileData.sankalpa,
        kula: profileData.kula,
        gotra: profileData.gotra,
        rashi: profileData.rashi,
        nakshatra: profileData.nakshatra,
      });
      resolve({ success: true, message: "Profile updated successfully (mock)." });
    }, 500); // Simulate network delay
  });
};

const EditProfile = () => {
  const { user } = useUserAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    dob: "",
    placeOfBirth: "",
    occupation: "",
    kula: "",
    gotra: "",
    rashi: "",
    nakshatra: "",
    street1: "",
    street2: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    sankalpa: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // In a real app, you'd use useNavigate here:
  // const navigate = useNavigate();
  const navigate = (path) => console.log(`Navigating to: ${path}`); // Mock navigate

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        setError("User not authenticated.");
        return;
      }
      try {
        setLoading(true);
        const data = await getDevoteeProfile();

        const fullName = data.name || "";
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(' ') || "";

        setFormData({
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
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      setLoading(true);
      const apiPayload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        mobile_number: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        place_of_birth: formData.placeOfBirth,
        occupation: formData.occupation,
        kula: formData.kula,
        gotra: formData.gotra,
        rashi: formData.rashi,
        nakshatra: formData.nakshatra,
        address: formData.street1,
        street_address: formData.street2,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode ? Number(formData.pincode) : null,
        sankalpa: formData.sankalpa,
      };

      await updateDevoteeProfile(apiPayload);
      setMessage("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-wrapper">
        <div className="edit-box">
          <p className="text-center text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-wrapper">
      <div className="edit-box">
        <h3>Edit Profile Details</h3>
        {error && <p className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        {message && <p className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{message}</p>}
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Your Mobile Number</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91xxxxxxxxxx"
              maxLength={10}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
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

          {/* New fields: Kula, Gotra, Rashi, Nakshatra */}
          <div className="form-row">
            <div className="form-group">
              <label>Kula</label>
              <input name="kula" value={formData.kula} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gotra</label>
              <input name="gotra" value={formData.gotra} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rashi</label>
              <input name="rashi" value={formData.rashi} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Nakshatra</label>
              <input name="nakshatra" value={formData.nakshatra} onChange={handleChange} />
            </div>
          </div>
          {/* End of new fields */}

          <h4>Address Details</h4>

          <div className="form-row">
            <div className="form-group">
              <label>Street Address 1 *</label>
              <input name="street1" value={formData.street1} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Street Address 2</label>
              <input name="street2" value={formData.street2} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Area *</label>
              <input name="area" value={formData.area} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={formData.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>State *</label>
              <input name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Pincode *</label>
              <input
                name="pincode"
                type="text"
                value={formData.pincode}
                maxLength={6}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pincode: e.target.value.replace(/[^0-9]/g, ""),
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Sankalpa (optional)</label>
            <input name="sankalpa" value={formData.sankalpa} onChange={handleChange} />
          </div>

          <button type="submit" className="save-btn">SAVE CHANGES</button>
        </form>
      </div>
    </div>
  );
};

// Main App component to render EditProfile
const App = () => {
  return (
    <div>
      {/* The CSS is now imported via the React component directly */}
      <EditProfile />
    </div>
  );
};

export default App;
