
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
import { useLocation } from 'react-router-dom';

import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, googleSignIn } = useUserAuth();
  const location = useLocation(); // ✅ NEW
  const from = location.state?.from?.pathname || "/";

  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recaptchaContainerRef = useRef(null);
  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    if (recaptchaContainerRef.current && !recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth, // Pass the auth instance
        recaptchaContainerRef.current, // ✅ Pass the direct DOM element from the ref
        {
          size: "invisible", 
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
   
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please re-verify.");
            setError("reCAPTCHA expired. Please try sending OTP again.");
          },
        }
      );
    
    }
    return () => {
      recaptchaVerifierRef.current = null;
    };
  }, []); 

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
        navigate(from, { replace: true });
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
      navigate(from, { replace: true });
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
