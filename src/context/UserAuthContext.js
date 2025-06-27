
import { createContext, useContext, useState } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase"; // Your Firebase config

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setUpRecaptha = (phone) => {
    const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
    return signInWithPhoneNumber(auth, `+91${phone}`, recaptcha).then(result => {
      setConfirmationResult(result);
    });
  };

  const verifyOtp = (otp) => {
    return confirmationResult.confirm(otp);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const sendEmailOtp = async (email) => {
    // Your logic to send OTP (via backend or Firebase custom implementation)
    console.log("Sending email OTP to:", email);
  };

  const verifyEmailOtp = async (email, otp) => {
    // Your logic to verify email OTP
    console.log("Verifying email OTP for:", email);
  };

  return (
    <UserAuthContext.Provider
      value={{
        setUpRecaptha,
        verifyOtp,
        googleSignIn,
        sendEmailOtp,
        verifyEmailOtp,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
