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


