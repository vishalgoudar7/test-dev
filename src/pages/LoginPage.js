// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert, Button, Spinner } from "react-bootstrap";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Login.css"; // Custom CSS
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loadingGoogle, setLoadingGoogle] = useState(false);
//   const { logIn, googleSignIn } = useUserAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await logIn(email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleSignIn = async (e) => {
//     e.preventDefault();
//     setLoadingGoogle(true);
//     try {
//       await googleSignIn();
//       navigate("/");
//     } catch (error) {
//       console.log(error.message);
//       setError("Google Sign-in failed. Try again.");
//     } finally {
//       setLoadingGoogle(false);
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1 className="mb-3 text-center">Login</h1>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Control
//               type="email"
//               placeholder="Email address"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-2" controlId="formBasicPassword">
//             <div className="password-input-wrapper">
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span
//                 className="toggle-password-icon"
//                 onClick={toggleShowPassword}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </Form.Group>

//           {/* Forgot password link */}
//           <div className="text-end mb-3">
//             <Link to="/forgot-password" className="forgot-password-link">
//               Forgot Password?
//             </Link>
//           </div>

//           <div className="d-grid gap-2">
//             <Button variant="primary" type="submit">
//               Log In
//             </Button>
//           </div>
//         </Form>

//         <hr />

//         <div className="google-center">
//           {loadingGoogle ? (
//             <div className="loading-msg">
//               <Spinner animation="border" size="sm" className="me-2" />
//               Logging in with Google...
//             </div>
//           ) : (
//             <GoogleButton
//               className="g-btn"
//               type="dark"
//               onClick={handleGoogleSignIn}
//             />
//           )}
//         </div>

//         <Link to="/phonesignup">
//           <div className="d-grid gap-2 mt-3">
//             <Button variant="success">Sign in with Phone</Button>
//           </div>
//         </Link>

//         <div className="login-footer mt-3 text-center">
//           Don't have an account? <Link to="/signup">SignUp</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert, Button, Spinner } from "react-bootstrap";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Login.css";

// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingGoogle, setLoadingGoogle] = useState(false);
//   const { phoneSignIn, verifyOtp, emailOtpSignIn, googleSignIn } = useUserAuth(); // Ensure these are defined
//   const navigate = useNavigate();

//   const handleSendOtpMobile = async () => {
//     setError("");
//     if (!mobile) return setError("Enter mobile number");
//     try {
//       setLoading(true);
//       await phoneSignIn(mobile);
//       setIsOtpSent(true);
//     } catch (err) {
//       setError(err.message || "Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setError("");
//     if (!otp) return setError("Enter OTP");
//     try {
//       setLoading(true);
//       await verifyOtp(otp);
//       navigate("/");
//     } catch (err) {
//       setError("Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailOtpLogin = async () => {
//     setError("");
//     if (!email) return setError("Enter your email address");
//     try {
//       setLoading(true);
//       await emailOtpSignIn(email);
//       alert("OTP sent to email. Please check your inbox.");
//     } catch (err) {
//       setError("Failed to send email OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoadingGoogle(true);
//     setError("");
//     try {
//       await googleSignIn();
//       navigate("/");
//     } catch (err) {
//       setError("Google Sign-in failed.");
//     } finally {
//       setLoadingGoogle(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="text-center mb-4">Login with Phone</h2>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Enter mobile number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               required
//             />
//           </Form.Group>

//           {isOtpSent && (
//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </Form.Group>
//           )}

//           <div className="d-grid gap-2">
//             {!isOtpSent ? (
//               <Button variant="primary" onClick={handleSendOtpMobile} disabled={loading}>
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </Button>
//             ) : (
//               <Button variant="success" onClick={handleVerifyOtp} disabled={loading}>
//                 {loading ? "Verifying OTP..." : "Submit OTP"}
//               </Button>
//             )}
//           </div>
//         </Form>

//         <hr />

//         <h5 className="text-center mt-4">Or Login with Email</h5>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="email"
//             placeholder="Enter email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <div className="d-grid gap-2 mb-3">
//           <Button variant="secondary" onClick={handleEmailOtpLogin}>
//             Send OTP to Email
//           </Button>
//         </div>

//         <hr />

//         <div className="google-center mb-3">
//           {loadingGoogle ? (
//             <div className="loading-msg">
//               <Spinner animation="border" size="sm" className="me-2" />
//               Logging in with Google...
//             </div>
//           ) : (
//             <GoogleButton className="g-btn" onClick={handleGoogleSignIn} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/Login.css";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const { setUpRecaptha, verifyOtp, googleSignIn, sendEmailOtp, verifyEmailOtp } = useUserAuth();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    if (!mobile) return setError("Please enter mobile number.");
    setLoading(true);
    try {
      await setUpRecaptha(countryCode + mobile);
      setIsOtpSent(true);
    } catch (err) {
      setError("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp) return setError("Please enter OTP.");
    setLoading(true);
    try {
      await verifyOtp(otp);
      navigate("/");
    } catch (err) {
      setError("Incorrect OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOtp = async () => {
    setError("");
    if (!email) return setError("Enter email address.");
    setLoading(true);
    try {
      await sendEmailOtp(email);
      setEmailOtpSent(true);
    } catch (err) {
      setError("Failed to send email OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    setError("");
    if (!emailOtp) return setError("Enter OTP sent to email.");
    setLoading(true);
    try {
      await verifyEmailOtp(email, emailOtp);
      navigate("/");
    } catch (err) {
      setError("Invalid email OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError("Google login failed.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Login with Phone Number</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="phone-input-group">
          <select
            className="country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+971">🇦🇪 +971</option>
          </select>
          <input
            className="input-field"
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {!isOtpSent ? (
          <button className="btn-primary" onClick={handleSendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <>
            <input
              className="input-field"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn-primary" onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Submit OTP"}
            </button>
          </>
        )}

        <div className="divider">OR</div>

        {!showEmailOtp ? (
          <button className="btn-email" onClick={() => setShowEmailOtp(true)}>
            <FaEnvelope className="icon" /> Login with Email
          </button>
        ) : (
          <>
            <input
              className="input-field"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!emailOtpSent ? (
              <button className="btn-secondary" onClick={handleSendEmailOtp}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter email OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
                <button className="btn-secondary" onClick={handleVerifyEmailOtp}>
                  {loading ? "Verifying..." : "Submit OTP"}
                </button>
              </>
            )}
          </>
        )}

        <button className="btn-google" onClick={handleGoogleLogin} disabled={loadingGoogle}>
          {loadingGoogle ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              <FcGoogle className="icon" /> Login with Google
            </>
          )}
        </button>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;


