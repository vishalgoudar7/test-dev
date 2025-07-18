
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
// import { FcGoogle } from "react-icons/fc";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { useUserAuth } from "../context/UserAuthContext";
// import { sendMobileOtp } from "../api/api"; // ✅ API for /api/v1/auth/
// import "../styles/Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, googleSignIn } = useUserAuth();

//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);

//   const auth = getAuth();

//   // ✅ Setup Recaptcha
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {},
//         }
//       );
//     }
//   };

//   // ✅ Send OTP via Firebase + optional pre-auth call
//   const handleSendOtp = () => {
//     setError("");
//     if (!mobile) return setError("Enter mobile number");

//     const phoneNumber = `${countryCode}${mobile}`;
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then(async (confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setOtpSent(true);
//         alert("OTP sent!");

//         // Optional: Pre-auth API trigger (can skip if not required)
//         try {
//           await sendMobileOtp(phoneNumber);
//         } catch (err) {
//           console.warn("Backend pre-auth failed (optional):", err.response?.data || err.message);
//         }
//       })
//       .catch((err) => {
//         console.error("OTP send error:", err);
//         setError("Failed to send OTP. Check Firebase setup.");
//       });
//   };

//   // ✅ Verify OTP with Firebase + then trigger /api/v1/auth/
//   const handleVerifyOtp = () => {
//     if (!otp) return setError("Enter OTP");

//     window.confirmationResult
//       .confirm(otp)
//       .then(async (result) => {
//         const firebaseUser = result.user;
//         const mobile_number = firebaseUser.phoneNumber;

//         console.log("✅ Firebase OTP verified:", mobile_number);
//         try {
//           const backendResponse = await sendMobileOtp(mobile_number);
//           console.log("✅ /api/v1/auth/ response:", backendResponse);

//           const userObj = {
//             mobile: mobile_number,
//             backendUser: backendResponse,
//           };

//           localStorage.setItem("user", JSON.stringify(userObj));
//           if (backendResponse.token) {
//             localStorage.setItem("token", backendResponse.token);
//           }

//           setUser(userObj);
//           navigate("/");
//         } catch (err) {
//           console.error("❌ Backend auth failed:", err?.response?.data || err.message);
//           setError("OTP verified, but backend login failed.");
//           const fallbackUser = { mobile: mobile_number };
//           setUser(fallbackUser);
//           localStorage.setItem("user", JSON.stringify(fallbackUser));
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.error("❌ Firebase OTP verification failed:", err);
//         setError("Invalid OTP. Try again.");
//       });
//   };

//   // ✅ Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googleSignIn();
//       const user = result.user;
//       const userObj = {
//         email: user.email,
//         name: user.displayName,
//         photo: user.photoURL,
//       };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } catch (err) {
//       console.error("Google login failed:", err);
//       setError("Google login failed. Check Firebase config.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* 🌐 Phone Input */}
//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//             <option value="+44">🇬🇧 +44</option>
//             <option value="+971">🇦🇪 +971</option>
//             <option value="+61">🇦🇺 +61</option>
//             <option value="+81">🇯🇵 +81</option>
//             <option value="+65">🇸🇬 +65</option>
//             <option value="+60">🇲🇾 +60</option>
//             <option value="+880">🇧🇩 +880</option>
//             <option value="+92">🇵🇰 +92</option>
//             <option value="+94">🇱🇰 +94</option>
//             <option value="+86">🇨🇳 +86</option>
//             <option value="+49">🇩🇪 +49</option>
//             <option value="+33">🇫🇷 +33</option>
//             <option value="+39">🇮🇹 +39</option>
//             <option value="+34">🇪🇸 +34</option>
//             <option value="+7">🇷🇺 +7</option>
//             <option value="+55">🇧🇷 +55</option>
//             <option value="+27">🇿🇦 +27</option>
//             <option value="+62">🇮🇩 +62</option>
//             <option value="+82">🇰🇷 +82</option>
//           </select>
//           <input
//             className="input-field"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!otpSent ? (
//           <button className="btn-primary" onClick={handleSendOtp}>
//             SEND OTP
//           </button>
//         ) : (
//           <>
//             <div className="input-field-group">
//               <input
//                 type={showOtp ? "text" : "password"}
//                 className="input-field with-icon"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <span className="input-icon" onClick={() => setShowOtp(!showOtp)}>
//                 {showOtp ? "🙈" : "👁️"}
//               </span>
//             </div>
//             <button className="btn-primary" onClick={handleVerifyOtp}>
//               SUBMIT OTP
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {/* ✅ Google Login */}
//         <button className="btn-google" onClick={handleGoogleLogin}>
//           <FcGoogle className="icon google-icon" />
//           <span>Login with Google</span>
//         </button>

//         <div id="recaptcha-container" />
//       </div>
//     </div>
//   );
// };

// export default Login;




























// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
// import { FcGoogle } from "react-icons/fc";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { useUserAuth } from "../context/UserAuthContext";
// import { sendMobileOtp } from "../api/api"; // ✅ /api/v1/auth/ API
// import "../styles/Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, googleSignIn } = useUserAuth();

//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);

//   const auth = getAuth();

//   // ✅ Setup invisible reCAPTCHA
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//         callback: () => {},
//       });
//     }
//   };

//   // ✅ Send OTP via Firebase only
//   const handleSendOtp  = async () => {
//     setError("");
//     if (!mobile) return setError("Enter mobile number");

//     const phoneNumber = `${countryCode}${mobile}`;
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
//   setupRecaptcha(); // ensure reCAPTCHA is set
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setOtpSent(true);
//         alert("OTP sent!");
//         // ✅ Do NOT call sendMobileOtp() here
//       })
//       .catch((err) => {
//         console.error("OTP send error:", err);
//         setError("Failed to send OTP. Please check Firebase setup.");
//       });
//   };

//   // ✅ Verify OTP and call backend /api/v1/auth/
//   const handleVerifyOtp = () => {
//     if (!otp) return setError("Enter OTP");

//     window.confirmationResult
//       .confirm(otp)
//       .then(async (result) => {
//         const firebaseUser = result.user;
//         const mobile_number = firebaseUser.phoneNumber;

//         console.log("✅ Firebase OTP verified:", mobile_number);

//         try {
//           const backendResponse = await sendMobileOtp(mobile_number);
//           console.log("✅ /api/v1/auth/ response:", backendResponse);

//           const userObj = {
//             mobile: mobile_number,
//             backendUser: backendResponse,
//           };

//           localStorage.setItem("user", JSON.stringify(userObj));
//           if (backendResponse.token) {
//             localStorage.setItem("token", backendResponse.token);
//           }

//           setUser(userObj);
//           navigate("/");
//         } catch (err) {
//           console.error("❌ Backend auth failed:", err?.response?.data || err.message);
//           setError("OTP verified, but backend login failed.");
//           const fallbackUser = { mobile: mobile_number };
//           setUser(fallbackUser);
//           localStorage.setItem("user", JSON.stringify(fallbackUser));
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.error("❌ Firebase OTP verification failed:", err);
//         setError("Invalid OTP. Please try again.");
//       });
//   };

//   // ✅ Google login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googleSignIn();
//       const user = result.user;
//       const userObj = {
//         email: user.email,
//         name: user.displayName,
//         photo: user.photoURL,
//       };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } catch (err) {
//       console.error("Google login failed:", err);
//       setError("Google login failed. Please check Firebase config.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* 📱 Country Code + Phone */}
//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//             <option value="+44">🇬🇧 +44</option>
//             <option value="+971">🇦🇪 +971</option>
//             <option value="+61">🇦🇺 +61</option>
//             <option value="+81">🇯🇵 +81</option>
//             <option value="+65">🇸🇬 +65</option>
//             <option value="+60">🇲🇾 +60</option>
//             <option value="+880">🇧🇩 +880</option>
//             <option value="+92">🇵🇰 +92</option>
//             <option value="+94">🇱🇰 +94</option>
//             <option value="+86">🇨🇳 +86</option>
//             <option value="+49">🇩🇪 +49</option>
//             <option value="+33">🇫🇷 +33</option>
//             <option value="+39">🇮🇹 +39</option>
//             <option value="+34">🇪🇸 +34</option>
//             <option value="+7">🇷🇺 +7</option>
//             <option value="+55">🇧🇷 +55</option>
//             <option value="+27">🇿🇦 +27</option>
//             <option value="+62">🇮🇩 +62</option>
//             <option value="+82">🇰🇷 +82</option>
//           </select>
//           <input
//             className="input-field"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!otpSent ? (
//           <button className="btn-primary" onClick={handleSendOtp}>
//             SEND OTP
//           </button>
//         ) : (
//           <>
//             <div className="input-field-group">
//               <input
//                 type={showOtp ? "text" : "password"}
//                 className="input-field with-icon"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <span className="input-icon" onClick={() => setShowOtp(!showOtp)}>
//                 {showOtp ? "🙈" : "👁️"}
//               </span>
//             </div>
//             <button className="btn-primary" onClick={handleVerifyOtp}>
//               SUBMIT OTP
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {/* ✅ Google Sign-In */}
//         <button className="btn-google" onClick={handleGoogleLogin}>
//           <FcGoogle className="icon google-icon" />
//           <span>Login with Google</span>
//         </button>

//         <div id="recaptcha-container" />
//       </div>
//     </div>
//   );
// };

// export default Login;












// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
// import { FcGoogle } from "react-icons/fc";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { auth } from "../firebase"; // ✅ Correct import
// import { useUserAuth } from "../context/UserAuthContext";
// import { sendMobileOtp } from "../api/api";
// import "../styles/Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, googleSignIn } = useUserAuth();

//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);

//   // ✅ Set up reCAPTCHA using auth correctly
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             console.log("reCAPTCHA solved:", response);
//           },
//           "expired-callback": () => {
//             console.warn("reCAPTCHA expired.");
//           },
//         },
//         auth // ✅ VERY IMPORTANT: pass initialized auth object here
//       );
//     }
//   };

//   const handleSendOtp = async () => {
//     setError("");
//     if (!mobile) return setError("Please enter a mobile number.");

//     const phoneNumber = `${countryCode}${mobile}`;
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       window.confirmationResult = confirmationResult;
//       setOtpSent(true);
//       alert("OTP sent successfully!");
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       setError("Failed to send OTP. Please check Firebase project settings.");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp) return setError("Please enter the OTP.");

//     try {
//       const result = await window.confirmationResult.confirm(otp);
//       const firebaseUser = result.user;
//       const mobile_number = firebaseUser.phoneNumber;

//       try {
//         const backendResponse = await sendMobileOtp(mobile_number);

//         const userObj = {
//           mobile: mobile_number,
//           backendUser: backendResponse,
//         };

//         localStorage.setItem("user", JSON.stringify(userObj));
//         if (backendResponse.token) {
//           localStorage.setItem("token", backendResponse.token);
//         }

//         setUser(userObj);
//         navigate("/");
//       } catch (err) {
//         console.error("Backend login failed:", err);
//         setError("OTP verified, but backend login failed.");
//       }
//     } catch (err) {
//       console.error("OTP verification failed:", err);
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googleSignIn();
//       const user = result.user;
//       const userObj = {
//         email: user.email,
//         name: user.displayName,
//         photo: user.photoURL,
//       };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } catch (err) {
//       console.error("Google login failed:", err);
//       setError("Google login failed. Please check Firebase config.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* Phone Input */}
//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//           </select>
//           <input
//             className="input-field"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!otpSent ? (
//           <button className="btn-primary" onClick={handleSendOtp}>
//             SEND OTP
//           </button>
//         ) : (
//           <>
//             <div className="input-field-group">
//               <input
//                 type={showOtp ? "text" : "password"}
//                 className="input-field with-icon"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <span className="input-icon" onClick={() => setShowOtp(!showOtp)}>
//                 {showOtp ? "🙈" : "👁️"}
//               </span>
//             </div>
//             <button className="btn-primary" onClick={handleVerifyOtp}>
//               SUBMIT OTP
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         <button className="btn-google" onClick={handleGoogleLogin}>
//           <FcGoogle className="icon google-icon" />
//           <span>Login with Google</span>
//         </button>

//         <div id="recaptcha-container" />
//       </div>
//     </div>
//   );
// };

// export default Login;










// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert, Spinner } from "react-bootstrap"; // Import Spinner for loading state
// import { FcGoogle } from "react-icons/fc";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   isSignInWithEmailLink,
// } from "firebase/auth"; // Make sure to import isSignInWithEmailLink if you use email link auth later
// import { auth } from "../firebase"; // Assuming `auth` is properly initialized and exported from your firebase.js
// import { useUserAuth } from "../context/UserAuthContext";
// import { sendMobileOtp } from "../api/api"; // Assuming your backend API call

// import "../styles/Login.css"; // Your existing styles

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, googleSignIn } = useUserAuth();

//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // New loading state
//   const [recaptchaReady, setRecaptchaReady] = useState(false); // New state to track reCAPTCHA readiness

//   // A reference to store the RecaptchaVerifier instance
//   // This is typically managed by `window.recaptchaVerifier` in the Firebase docs,
//   // but keeping it in state or a ref can sometimes be cleaner in React.
//   // For simplicity and alignment with Firebase docs, we'll continue using window.recaptchaVerifier
//   // but ensure it's initialized only once.

//   // Initialize reCAPTCHA on component mount
//   useEffect(() => {
//     // Only set up if not already done
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth, // Pass the auth instance
//         "recaptcha-container", // The div ID where reCAPTCHA will render
//         {
//           size: "invisible", // Use invisible for a cleaner user experience
//           callback: (response) => {
//             // reCAPTCHA solved, this callback is fired automatically
//             console.log("reCAPTCHA solved:", response);
//             setRecaptchaReady(true);
//             // You might trigger handleSendOtp here if you want it to be fully automatic
//             // but for user-initiated 'Send OTP' button, it's better to keep it in handleSendOtp
//           },
//           "expired-callback": () => {
//             console.warn("reCAPTCHA expired. Please re-verify.");
//             setRecaptchaReady(false); // Mark as not ready
//             setError("reCAPTCHA expired. Please try sending OTP again.");
//             // You might want to refresh the reCAPTCHA here if using visible type
//           },
//           // You can add 'error-callback' for debugging
//           // 'error-callback': (err) => {
//           //   console.error("reCAPTCHA error:", err);
//           //   setError("reCAPTCHA encountered an error. Please try again.");
//           // }
//         }
//       );
//       // For invisible reCAPTCHA, you don't typically call .render() directly here.
//       // It's rendered when signInWithPhoneNumber is called.
//       // However, if you were using 'normal' size, you would call window.recaptchaVerifier.render();
//     }
//   }, []); // Empty dependency array means this runs once on mount

//   const handleSendOtp = async () => {
//     setError(""); // Clear previous errors
//     setIsLoading(true); // Start loading

//     if (!mobile) {
//       setError("Please enter a mobile number.");
//       setIsLoading(false);
//       return;
//     }

//     // Ensure phone number is clean and in E.164 format
//     const cleanedMobile = mobile.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//     const phoneNumber = `${countryCode}${cleanedMobile}`;

//     // Basic validation for phone number length after cleaning
//     if (cleanedMobile.length < 7 || cleanedMobile.length > 15) { // Common range for phone numbers
//       setError("Please enter a valid mobile number (7-15 digits).");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       if (!window.recaptchaVerifier) {
//         // This should ideally not happen due to useEffect, but as a safeguard
//         setError("reCAPTCHA not initialized. Please refresh the page.");
//         setIsLoading(false);
//         return;
//       }

//       // signInWithPhoneNumber will implicitly render/execute invisible reCAPTCHA
//       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
//       window.confirmationResult = confirmationResult; // Store for OTP verification
//       setOtpSent(true);
//       setError(""); // Clear any previous errors on success
//       alert("OTP sent successfully to " + phoneNumber); // Consider a non-blocking toast
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       // More specific error handling
//       switch (err.code) {
//         case 'auth/invalid-phone-number':
//           setError("The phone number provided is invalid. Please check the format.");
//           break;
//         case 'auth/missing-phone-number':
//           setError("No phone number was provided.");
//           break;
//         case 'auth/quota-exceeded':
//           setError("SMS quota exceeded for this project. Please try again later.");
//           break;
//         case 'auth/app-not-authorized':
//           setError("Your app's domain is not authorized for this project. Check Firebase console.");
//           break;
//         case 'auth/captcha-check-failed':
//           setError("reCAPTCHA verification failed. Please try again or ensure your browser isn't blocking reCAPTCHA.");
//           break;
//         case 'auth/too-many-requests':
//           setError("Too many requests from this device. Please try again after some time.");
//           break;
//         default:
//           setError(`Failed to send OTP: ${err.message || "An unknown error occurred."}`);
//           break;
//       }
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setError(""); // Clear previous errors
//     setIsLoading(true); // Start loading

//     if (!otp) {
//       setError("Please enter the OTP.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       if (!window.confirmationResult) {
//         setError("OTP sending process was not completed. Please send OTP first.");
//         setIsLoading(false);
//         return;
//       }
//       const result = await window.confirmationResult.confirm(otp);
//       const firebaseUser = result.user; // The authenticated Firebase User object
//       const mobile_number = firebaseUser.phoneNumber; // Get the phone number

//       // If Firebase OTP verification is successful, proceed to your backend
//       try {
//         const backendResponse = await sendMobileOtp(mobile_number); // Call your backend API

//         const userObj = {
//           mobile: mobile_number,
//           backendUser: backendResponse, // Store backend response in user object
//         };

//         localStorage.setItem("user", JSON.stringify(userObj));
//         if (backendResponse.token) {
//           localStorage.setItem("token", backendResponse.token);
//         }

//         setUser(userObj); // Update user context
//         navigate("/"); // Navigate to home or dashboard
//       } catch (err) {
//         console.error("Backend login failed:", err);
//         setError("OTP verified, but backend login failed. Please contact support.");
//       }
//     } catch (err) {
//       console.error("OTP verification failed:", err);
//       switch (err.code) {
//         case 'auth/invalid-verification-code':
//           setError("Invalid OTP. Please check the code and try again.");
//           break;
//         case 'auth/code-expired':
//           setError("The OTP has expired. Please send a new OTP.");
//           break;
//         case 'auth/user-disabled':
//           setError("Your account has been disabled.");
//           break;
//         default:
//           setError(`OTP verification failed: ${err.message || "An unknown error occurred."}`);
//           break;
//       }
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setError(""); // Clear previous errors
//     setIsLoading(true); // Start loading for Google login

//     try {
//       const result = await googleSignIn(); // Assuming googleSignIn handles Firebase Google Auth
//       const user = result.user; // The authenticated Firebase User object for Google

//       const userObj = {
//         email: user.email,
//         name: user.displayName,
//         photo: user.photoURL,
//         // You might want to send this user info to your backend here as well
//       };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } catch (err) {
//       console.error("Google login failed:", err);
//       setError(`Google login failed: ${err.message || "An unknown error occurred."}`);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };


//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* Phone Input */}
//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//             disabled={isLoading} // Disable while loading
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//             {/* Add more country codes as needed */}
//           </select>
//           <input
//             className="input-field"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => {
//               // Only allow numeric input
//               const re = /^[0-9\b]+$/;
//               if (e.target.value === '' || re.test(e.target.value)) {
//                 setMobile(e.target.value);
//               }
//             }}
//             disabled={isLoading || otpSent} // Disable while loading or after OTP sent
//             maxLength={15} // Set max length for mobile number
//           />
//         </div>

//         {!otpSent ? (
//           <button className="btn-primary" onClick={handleSendOtp} disabled={isLoading}>
//             {isLoading ? (
//               <Spinner
//                 as="span"
//                 animation="border"
//                 size="sm"
//                 role="status"
//                 aria-hidden="true"
//               />
//             ) : (
//               "SEND OTP"
//             )}
//           </button>
//         ) : (
//           <>
//             <div className="input-field-group">
//               <input
//                 type={showOtp ? "text" : "password"}
//                 className="input-field with-icon"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 disabled={isLoading}
//                 maxLength={6} // OTPs are typically 6 digits
//               />
//               <span className="input-icon" onClick={() => setShowOtp(!showOtp)}>
//                 {showOtp ? "🙈" : "👁️"}
//               </span>
//             </div>
//             <button className="btn-primary" onClick={handleVerifyOtp} disabled={isLoading}>
//               {isLoading ? (
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 "SUBMIT OTP"
//               )}
//             </button>
//             <button className="btn-secondary" onClick={() => {
//               setOtpSent(false);
//               setOtp("");
//               setError("");
//               setIsLoading(false);
//               // Optionally re-render reCAPTCHA if you were using a visible one
//               // Or just let it handle invisibly on next send
//             }} disabled={isLoading}>
//               Resend / Change Number
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         <button className="btn-google" onClick={handleGoogleLogin} disabled={isLoading}>
//           <FcGoogle className="icon google-icon" />
//           <span>Login with Google</span>
//         </button>

//         {/* This div is where reCAPTCHA will attach. Keep it empty. */}
//         <div id="recaptcha-container" />
//       </div>
//     </div>
//   );
// };

// export default Login;


















import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";
import { useUserAuth } from "../context/UserAuthContext";
import { sendMobileOtp } from "../api/api";

import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, googleSignIn } = useUserAuth();

  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ New: Create a ref for the reCAPTCHA container div
  const recaptchaContainerRef = useRef(null);
  // ✅ New: Create a ref to hold the RecaptchaVerifier instance
  const recaptchaVerifierRef = useRef(null);

  // Initialize reCAPTCHA on component mount
  useEffect(() => {
    // Ensure the DOM element is available and recaptchaVerifier hasn't been created yet
    if (recaptchaContainerRef.current && !recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth, // Pass the auth instance
        recaptchaContainerRef.current, // ✅ Pass the direct DOM element from the ref
        {
          size: "invisible", // Use invisible for a cleaner user experience
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
            // setRecaptchaReady(true); // You can remove this state, as it's less critical with useRef
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please re-verify.");
            setError("reCAPTCHA expired. Please try sending OTP again.");
          },
          // 'error-callback' can be useful for debugging
          // 'error-callback': (err) => {
          //   console.error("reCAPTCHA error:", err);
          //   setError("reCAPTCHA encountered an error. Please try again.");
          // }
        }
      );
      // For invisible reCAPTCHA, no explicit .render() call is typically needed here.
      // signInWithPhoneNumber will trigger it.
    }

    // Optional: Cleanup function for component unmount
    return () => {
      // You might not need explicit reset for invisible reCAPTCHA,
      // but it's good practice to clear the ref
      recaptchaVerifierRef.current = null;
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleSendOtp = async () => {
    setError("");
    setIsLoading(true);

    if (!mobile) {
      setError("Please enter a mobile number.");
      setIsLoading(false);
      return;
    }

    const cleanedMobile = mobile.replace(/[^0-9]/g, '');
    const phoneNumber = `${countryCode}${cleanedMobile}`;

    if (cleanedMobile.length < 7 || cleanedMobile.length > 15) {
      setError("Please enter a valid mobile number (7-15 digits).");
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Use the recaptchaVerifierRef.current here
      const appVerifier = recaptchaVerifierRef.current;

      if (!appVerifier) {
        setError("reCAPTCHA not initialized. Please refresh the page.");
        setIsLoading(false);
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      setError("");
      alert("OTP sent successfully to " + phoneNumber);
    } catch (err) {
      console.error("Error sending OTP:", err);
      switch (err.code) {
        case 'auth/invalid-phone-number':
          setError("The phone number provided is invalid. Please check the format.");
          break;
        case 'auth/missing-phone-number':
          setError("No phone number was provided.");
          break;
        case 'auth/quota-exceeded':
          setError("SMS quota exceeded for this project. Please try again later.");
          break;
        case 'auth/app-not-authorized':
          setError("Your app's domain is not authorized for this project. Check Firebase console.");
          break;
        case 'auth/captcha-check-failed':
          setError("reCAPTCHA verification failed. Please try again or ensure your browser isn't blocking reCAPTCHA.");
          break;
        case 'auth/too-many-requests':
          setError("Too many requests from this device. Please try again after some time.");
          break;
        case 'auth/operation-not-allowed': // This one from previous error
          setError("SMS sending is not allowed for this region. Please enable it in Firebase Authentication settings > SMS region policy.");
          break;
        case 'auth/billing-not-enabled': // And this one too!
          setError("Billing is not enabled for your Google Cloud project, which is required for Phone Auth. This does not mean you will be charged, just that a billing account must be linked.");
          break;
        default:
          setError(`Failed to send OTP: ${err.message || "An unknown error occurred."}`);
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setIsLoading(true);

    if (!otp) {
      setError("Please enter the OTP.");
      setIsLoading(false);
      return;
    }

    try {
      if (!window.confirmationResult) {
        setError("OTP sending process was not completed. Please send OTP first.");
        setIsLoading(false);
        return;
      }
      const result = await window.confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const mobile_number = firebaseUser.phoneNumber;

      try {
        const backendResponse = await sendMobileOtp(mobile_number);

        const userObj = {
          mobile: mobile_number,
          backendUser: backendResponse,
        };

        localStorage.setItem("user", JSON.stringify(userObj));
        if (backendResponse.token) {
          localStorage.setItem("token", backendResponse.token);
        }

        setUser(userObj);
        navigate("/");
      } catch (err) {
        console.error("Backend login failed:", err);
        setError("OTP verified, but backend login failed. Please contact support.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      switch (err.code) {
        case 'auth/invalid-verification-code':
          setError("Invalid OTP. Please check the code and try again.");
          break;
        case 'auth/code-expired':
          setError("The OTP has expired. Please send a new OTP.");
          break;
        case 'auth/user-disabled':
          setError("Your account has been disabled.");
          break;
        default:
          setError(`OTP verification failed: ${err.message || "An unknown error occurred."}`);
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await googleSignIn();
      const user = result.user;

      const userObj = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      setError(`Google login failed: ${err.message || "An unknown error occurred."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Phone Input */}
        <div className="phone-input-group">
          <select
            className="country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            disabled={isLoading}
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
          </select>
          <input
            className="input-field"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === '' || re.test(e.target.value)) {
                setMobile(e.target.value);
              }
            }}
            disabled={isLoading || otpSent}
            maxLength={15}
          />
        </div>

        {!otpSent ? (
          <button className="btn-primary" onClick={handleSendOtp} disabled={isLoading}>
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "SEND OTP"
            )}
          </button>
        ) : (
          <>
            <div className="input-field-group">
              <input
                type={showOtp ? "text" : "password"}
                className="input-field with-icon"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={isLoading}
                maxLength={6}
              />
              <span className="input-icon" onClick={() => setShowOtp(!showOtp)}>
                {showOtp ? "🙈" : "👁️"}
              </span>
            </div>
            <button className="btn-primary" onClick={handleVerifyOtp} disabled={isLoading}>
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "SUBMIT OTP"
              )}
            </button>
            <button className="btn-secondary" onClick={() => {
              setOtpSent(false);
              setOtp("");
              setError("");
              setIsLoading(false);
            }} disabled={isLoading}>
              Resend / Change Number
            </button>
          </>
        )}

        <div className="divider">OR</div>

        <button className="btn-google" onClick={handleGoogleLogin} disabled={isLoading}>
          <FcGoogle className="icon google-icon" />
          <span>Login with Google</span>
        </button>

        {/* ✅ This div is where reCAPTCHA will attach. Assign the ref. */}
        <div id="recaptcha-container" ref={recaptchaContainerRef} />
      </div>
    </div>
  );
};

export default Login;
