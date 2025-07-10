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

  const mockOtp = "111111"; // Simulated OTP for testing
  const realToken = process.env.REACT_APP_LOGIN_TOKEN; // ✅ Read from .env

  const handleSendMobileOtp = () => {
    if (!mobile) return setError("Enter mobile number");
    setError("");
    setIsMobileOtpSent(true);
  };

  const handleVerifyMobileOtp = () => {
    if (otp === mockOtp) {
      const userObj = { mobile: `${countryCode}${mobile}` };
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", realToken);
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
      localStorage.setItem("token", realToken);
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
      localStorage.setItem("token", realToken);
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

        {/* ✅ Google Login */}
        <button className="btn-google" onClick={handleGoogleLogin}>
          <FcGoogle className="icon google-icon" />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
