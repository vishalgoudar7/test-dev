// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert, Spinner } from "react-bootstrap";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Login.css";

// const Login = () => {
//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [showEmailOtp, setShowEmailOtp] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingGoogle, setLoadingGoogle] = useState(false);

//   const { setUpRecaptha, verifyOtp, googleSignIn, sendEmailOtp, verifyEmailOtp } = useUserAuth();
//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//     setError("");
//     if (!mobile) return setError("Please enter mobile number.");
//     setLoading(true);
//     try {
//       await setUpRecaptha(countryCode + mobile);
//       setIsOtpSent(true);
//     } catch (err) {
//       setError("Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setError("");
//     if (!otp) return setError("Please enter OTP.");
//     setLoading(true);
//     try {
//       await verifyOtp(otp);
//       navigate("/");
//     } catch (err) {
//       setError("Incorrect OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendEmailOtp = async () => {
//     setError("");
//     if (!email) return setError("Enter email address.");
//     setLoading(true);
//     try {
//       await sendEmailOtp(email);
//       setEmailOtpSent(true);
//     } catch (err) {
//       setError("Failed to send email OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyEmailOtp = async () => {
//     setError("");
//     if (!emailOtp) return setError("Enter OTP sent to email.");
//     setLoading(true);
//     try {
//       await verifyEmailOtp(email, emailOtp);
//       navigate("/");
//     } catch (err) {
//       setError("Invalid email OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoadingGoogle(true);
//     try {
//       await googleSignIn();
//       navigate("/");
//     } catch (err) {
//       setError("Google login failed.");
//     } finally {
//       setLoadingGoogle(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login with Phone Number</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//             <option value="+44">🇬🇧 +44</option>
//             <option value="+61">🇦🇺 +61</option>
//             <option value="+971">🇦🇪 +971</option>
//           </select>
//           <input
//             className="input-field"
//             type="text"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!isOtpSent ? (
//           <button className="btn-primary" onClick={handleSendOtp} disabled={loading}>
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button className="btn-primary" onClick={handleVerifyOtp} disabled={loading}>
//               {loading ? "Verifying..." : "Submit OTP"}
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {!showEmailOtp ? (
//           <button className="btn-email" onClick={() => setShowEmailOtp(true)}>
//             <FaEnvelope className="icon" /> Login with Email
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {!emailOtpSent ? (
//               <button className="btn-secondary" onClick={handleSendEmailOtp}>
//                 {loading ? "Sending..." : "Send OTP"}
//               </button>
//             ) : (
//               <>
//                 <input
//                   className="input-field"
//                   type="text"
//                   placeholder="Enter email OTP"
//                   value={emailOtp}
//                   onChange={(e) => setEmailOtp(e.target.value)}
//                 />
//                 <button className="btn-secondary" onClick={handleVerifyEmailOtp}>
//                   {loading ? "Verifying..." : "Submit OTP"}
//                 </button>
//               </>
//             )}
//           </>
//         )}

//         <button className="btn-google" onClick={handleGoogleLogin} disabled={loadingGoogle}>
//           {loadingGoogle ? (
//             <Spinner animation="border" size="sm" />
//           ) : (
//             <>
//               <FcGoogle className="icon" /> Login with Google
//             </>
//           )}
//         </button>
//       </div>
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert, Spinner } from "react-bootstrap";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { loginWithMobile, loginWithEmail } from "../api/api"; // ✅ Correct

// import "../styles/Login.css";

// const Login = () => {
//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [showEmailOtp, setShowEmailOtp] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingGoogle, setLoadingGoogle] = useState(false);

//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//     setError("");
//     if (!mobile) return setError("Please enter mobile number.");
//     // Simulate OTP sent
//     setIsOtpSent(true);
//   };

//   const handleVerifyOtp = async () => {
//     setError("");
//     if (!otp) return setError("Please enter OTP.");
//     setLoading(true);
//     try {
//       const data = await loginWithMobile(countryCode + mobile, otp);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data));
//       navigate("/");
//     } catch (err) {
//       setError(err.toString());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendEmailOtp = async () => {
//     setError("");
//     if (!email) return setError("Enter email address.");
//     // Simulate OTP sent
//     setEmailOtpSent(true);
//   };

//   const handleVerifyEmailOtp = async () => {
//     setError("");
//     if (!emailOtp) return setError("Enter OTP sent to email.");
//     setLoading(true);
//     try {
//       const data = await loginWithEmail(email, emailOtp);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data));
//       navigate("/");
//     } catch (err) {
//       setError(err.toString());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoadingGoogle(true);
//     try {
//       // integrate Google sign-in (firebase/auth or OAuth2) here
//       // For now, simulate success
//       navigate("/");
//     } catch (err) {
//       setError("Google login failed.");
//     } finally {
//       setLoadingGoogle(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login with Phone Number</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//             <option value="+44">🇬🇧 +44</option>
//             <option value="+61">🇦🇺 +61</option>
//             <option value="+971">🇦🇪 +971</option>
//           </select>
//           <input
//             className="input-field"
//             type="text"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!isOtpSent ? (
//           <button className="btn-primary" onClick={handleSendOtp} disabled={loading}>
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button className="btn-primary" onClick={handleVerifyOtp} disabled={loading}>
//               {loading ? "Verifying..." : "Submit OTP"}
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {!showEmailOtp ? (
//           <button className="btn-email" onClick={() => setShowEmailOtp(true)}>
//             <FaEnvelope className="icon" /> Login with Email
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {!emailOtpSent ? (
//               <button className="btn-secondary" onClick={handleSendEmailOtp}>
//                 {loading ? "Sending..." : "Send OTP"}
//               </button>
//             ) : (
//               <>
//                 <input
//                   className="input-field"
//                   type="text"
//                   placeholder="Enter email OTP"
//                   value={emailOtp}
//                   onChange={(e) => setEmailOtp(e.target.value)}
//                 />
//                 <button className="btn-secondary" onClick={handleVerifyEmailOtp}>
//                   {loading ? "Verifying..." : "Submit OTP"}
//                 </button>
//               </>
//             )}
//           </>
//         )}

//         <button className="btn-google" onClick={handleGoogleLogin} disabled={loadingGoogle}>
//           {loadingGoogle ? (
//             <Spinner animation="border" size="sm" />
//           ) : (
//             <>
//               <FcGoogle className="icon" /> Login with Google
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;





// // src/pages/LoginPage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { auth, provider, signInWithPopup } from "../firebase";
// import "../styles/Login.css";


// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [error, setError] = useState("");
//   const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
//   const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
//   const [showEmailBox, setShowEmailBox] = useState(false);

//   const navigate = useNavigate();

//   const mockOtp = "111111";

//   const handleSendMobileOtp = () => {
//     if (!mobile) return setError("Enter mobile number");
//     setError("");
//     setIsMobileOtpSent(true);
//   };

//   const handleVerifyMobileOtp = () => {
//     if (otp === mockOtp) {
//       localStorage.setItem("token", "mock-mobile-token");
//       localStorage.setItem("user", JSON.stringify({ mobile }));
//       navigate("/");
//     } else {
//       setError("Mobile login failed");
//     }
//   };

//   const handleSendEmailOtp = () => {
//     if (!email) return setError("Enter email");
//     setError("");
//     setIsEmailOtpSent(true);
//   };

//   const handleVerifyEmailOtp = () => {
//     if (emailOtp === mockOtp) {
//       localStorage.setItem("token", "mock-email-token");
//       localStorage.setItem("user", JSON.stringify({ email }));
//       navigate("/");
//     } else {
//       setError("Email login failed");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       localStorage.setItem("token", "firebase-google-token");
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/");
//     } catch (error) {
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3>Login with Phone Number</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <input
//           className="input-field"
//           placeholder="Mobile number"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         {!isMobileOtpSent ? (
//           <button className="btn-primary" onClick={handleSendMobileOtp}>Send OTP</button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button className="btn-primary" onClick={handleVerifyMobileOtp}>Submit OTP</button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {!showEmailBox ? (
//           <button className="btn-secondary" onClick={() => setShowEmailBox(true)}>
//             <FaEnvelope /> Login with Email
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {!isEmailOtpSent ? (
//               <button className="btn-secondary" onClick={handleSendEmailOtp}>Send OTP</button>
//             ) : (
//               <>
//                 <input
//                   className="input-field"
//                   placeholder="Enter Email OTP"
//                   value={emailOtp}
//                   onChange={(e) => setEmailOtp(e.target.value)}
//                 />
//                 <button className="btn-secondary" onClick={handleVerifyEmailOtp}>Submit OTP</button>
//               </>
//             )}
//           </>
//         )}

//         <div className="divider">OR</div>

//         <button className="btn-google" onClick={handleGoogleLogin}>
//           <FcGoogle /> Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;




// // src/pages/LoginPage.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, googleSignIn } = useUserAuth();

//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [error, setError] = useState("");
//   const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
//   const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
//   const [showEmailBox, setShowEmailBox] = useState(false);

//   const mockOtp = "111111";

//   const handleSendMobileOtp = () => {
//     if (!mobile) return setError("Enter mobile number");
//     setError("");
//     setIsMobileOtpSent(true);
//   };

//   const handleVerifyMobileOtp = () => {
//     if (otp === mockOtp) {
//       const fullMobile = `${countryCode}${mobile}`;
//       const userObj = { mobile: fullMobile };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } else {
//       setError("Invalid OTP for mobile login.");
//     }
//   };

//   const handleSendEmailOtp = () => {
//     if (!email) return setError("Enter email");
//     setError("");
//     setIsEmailOtpSent(true);
//   };

//   const handleVerifyEmailOtp = () => {
//     if (emailOtp === mockOtp) {
//       const userObj = { email };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } else {
//       setError("Invalid OTP for email login.");
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
//       console.error(err);
//       setError("Google login failed.");
//     }
//   };

//   return (
//     <div className="login-container dark-bg">
//       <div className="login-card">
//         <h3 className="login-title">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">+91</option>
//             <option value="+1">+1</option>
//             <option value="+44">+44</option>
//           </select>
//           <input
//             className="input-field"
//             placeholder="Enter mobile number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!isMobileOtpSent ? (
//           <button className="btn-primary full-btn" onClick={handleSendMobileOtp}>
//             Send OTP
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button className="btn-primary full-btn" onClick={handleVerifyMobileOtp}>
//               Submit OTP
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {!showEmailBox ? (
//           <button className="btn-email full-btn" onClick={() => setShowEmailBox(true)}>
//             <FaEnvelope className="icon" /> Enter Email
//           </button>
//         ) : (
//           <>
//             <input
//               className="input-field"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {!isEmailOtpSent ? (
//               <button className="btn-email full-btn" onClick={handleSendEmailOtp}>
//                 Send OTP
//               </button>
//             ) : (
//               <>
//                 <input
//                   className="input-field"
//                   placeholder="Enter Email OTP"
//                   value={emailOtp}
//                   onChange={(e) => setEmailOtp(e.target.value)}
//                 />
//                 <button className="btn-email full-btn" onClick={handleVerifyEmailOtp}>
//                   Submit OTP
//                 </button>
//               </>
//             )}
//           </>
//         )}

//         <div className="divider">OR</div>

//         <button className="btn-google full-btn" onClick={handleGoogleLogin}>
//           <FcGoogle className="icon" /> Continue via Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
// import { FaEnvelope } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, googleSignIn } = useUserAuth();

//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [error, setError] = useState("");
//   const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
//   const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
//   const [showEmailBox, setShowEmailBox] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [showEmailOtp, setShowEmailOtp] = useState(false);

//   const mockOtp = "111111";

//   const handleSendMobileOtp = () => {
//     if (!mobile) return setError("Enter mobile number");
//     setError("");
//     setIsMobileOtpSent(true);
//   };

//   const handleVerifyMobileOtp = () => {
//     if (otp === mockOtp) {
//       const userObj = { mobile: `${countryCode}${mobile}` };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } else {
//       setError("Invalid OTP for mobile login.");
//     }
//   };

//   const handleSendEmailOtp = () => {
//     if (!email) return setError("Enter email");
//     setError("");
//     setIsEmailOtpSent(true);
//   };

//   const handleVerifyEmailOtp = () => {
//     if (emailOtp === mockOtp) {
//       const userObj = { email };
//       localStorage.setItem("user", JSON.stringify(userObj));
//       setUser(userObj);
//       navigate("/");
//     } else {
//       setError("Invalid OTP for email login.");
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
//       setError("Google login failed. Make sure Firebase is configured and domain is allowed.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h3 className="login-title">Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* Phone input */}
//         <div className="phone-input-group">
//           <select
//             className="country-code"
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//           >
//             <option value="+91">+91</option>
//             <option value="+1">+1</option>
//             <option value="+44">+44</option>
//             <option value="+61">+61</option>
//           </select>
//           <input
//             className="input-field"
//             placeholder="Enter phone number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>

//         {!isMobileOtpSent ? (
//           <button className="btn-primary" onClick={handleSendMobileOtp}>
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
//             <button className="btn-primary" onClick={handleVerifyMobileOtp}>
//               SUBMIT OTP
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {/* Email Section */}
//         <div className="input-field-group full-width">
//           <input
//             type="email"
//             className="input-field"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {!isEmailOtpSent ? (
//           <button className="btn-secondary" onClick={handleSendEmailOtp}>
//             SEND OTP
//           </button>
//         ) : (
//           <>
//             <div className="input-field-group">
//               <input
//                 type={showEmailOtp ? "text" : "password"}
//                 className="input-field with-icon"
//                 placeholder="Enter Email OTP"
//                 value={emailOtp}
//                 onChange={(e) => setEmailOtp(e.target.value)}
//               />
//               <span className="input-icon" onClick={() => setShowEmailOtp(!showEmailOtp)}>
//                 {showEmailOtp ? "🙈" : "👁️"}
//               </span>
//             </div>
//             <button className="btn-secondary" onClick={handleVerifyEmailOtp}>
//               SUBMIT OTP
//             </button>
//           </>
//         )}

//         <div className="divider">OR</div>

//         {/* Google */}
//         <button className="btn-google" onClick={handleGoogleLogin}>
//           <FcGoogle className="icon google-icon" />
//           <span>CONTINUE VIA GOOGLE</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, googleSignIn } = useUserAuth();

  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [error, setError] = useState("");
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);

  const mockOtp = "111111";

  const handleSendMobileOtp = () => {
    if (!mobile) return setError("Enter mobile number");
    setError("");
    setIsMobileOtpSent(true);
  };

  const handleVerifyMobileOtp = () => {
    if (otp === mockOtp) {
      const userObj = { mobile: `${countryCode}${mobile}` };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      navigate("/");
    } else {
      setError("Invalid OTP for mobile login.");
    }
  };

  const handleSendEmailOtp = () => {
    if (!email) return setError("Enter email");
    setError("");
    setIsEmailOtpSent(true);
  };

  const handleVerifyEmailOtp = () => {
    if (emailOtp === mockOtp) {
      const userObj = { email };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      navigate("/");
    } else {
      setError("Invalid OTP for email login.");
    }
  };

  const handleGoogleLogin = async () => {
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
      setError("Google login failed. Make sure Firebase is configured and domain is allowed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* 📱 Phone Login */}
        <div className="phone-input-group">
          <select
            className="country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            {/* <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option> */}
      <option value="+91">🇮🇳 +91</option>
  <option value="+1">🇺🇸 +1</option>
  <option value="+44">🇬🇧 +44</option>
  <option value="+61">🇦🇺 +61</option>
  <option value="+81">🇯🇵 +81</option>
  <option value="+971">🇦🇪 +971</option>
  <option value="+65">🇸🇬 +65</option>
  <option value="+60">🇲🇾 +60</option>
  <option value="+880">🇧🇩 +880</option>
  <option value="+92">🇵🇰 +92</option>
  <option value="+94">🇱🇰 +94</option>
  <option value="+86">🇨🇳 +86</option>
  <option value="+49">🇩🇪 +49</option>
  <option value="+33">🇫🇷 +33</option>
  <option value="+39">🇮🇹 +39</option>
  <option value="+34">🇪🇸 +34</option>
  <option value="+7">🇷🇺 +7</option>
  <option value="+55">🇧🇷 +55</option>
  <option value="+27">🇿🇦 +27</option>
  <option value="+62">🇮🇩 +62</option>
  <option value="+82">🇰🇷 +82</option>
          </select>
          <input
            className="input-field"
            placeholder="Enter phone number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {!isMobileOtpSent ? (
          <button className="btn-primary" onClick={handleSendMobileOtp}>
            SEND OTP
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
              />
              <span className="input-icon" onClick={() => setShowOtp(!showOtp)}>
                {showOtp ? "🙈" : "👁️"}
              </span>
            </div>
            <button className="btn-primary" onClick={handleVerifyMobileOtp}>
              SUBMIT OTP
            </button>
          </>
        )}

        <div className="divider">OR</div>

        {/* 📧 Email Login */}
        <div className="input-field-group full-width">
          <input
            type="email"
            className="input-field"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {!isEmailOtpSent ? (
          <button className="btn-secondary" onClick={handleSendEmailOtp}>
            SEND OTP
          </button>
        ) : (
          <>
            <div className="input-field-group">
              <input
                type={showEmailOtp ? "text" : "password"}
                className="input-field with-icon"
                placeholder="Enter Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
              />
              <span className="input-icon" onClick={() => setShowEmailOtp(!showEmailOtp)}>
                {showEmailOtp ? "🙈" : "👁️"}
              </span>
            </div>
            <button className="btn-secondary" onClick={handleVerifyEmailOtp}>
              SUBMIT OTP
            </button>
          </>
        )}

        <div className="divider">OR</div>

        {/* ✅ Google Login at the Bottom */}
        <button className="btn-google" onClick={handleGoogleLogin}>
          <FcGoogle className="icon google-icon" />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
