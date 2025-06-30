
// import { createContext, useContext, useState } from "react";
// import {
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../firebase"; // Your Firebase config

// const UserAuthContext = createContext();

// export const UserAuthContextProvider = ({ children }) => {
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   const setUpRecaptha = (phone) => {
//     const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
//     return signInWithPhoneNumber(auth, `+91${phone}`, recaptcha).then(result => {
//       setConfirmationResult(result);
//     });
//   };

//   const verifyOtp = (otp) => {
//     return confirmationResult.confirm(otp);
//   };

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   const sendEmailOtp = async (email) => {
//     // Your logic to send OTP (via backend or Firebase custom implementation)
//     console.log("Sending email OTP to:", email);
//   };

//   const verifyEmailOtp = async (email, otp) => {
//     // Your logic to verify email OTP
//     console.log("Verifying email OTP for:", email);
//   };

//   return (
//     <UserAuthContext.Provider
//       value={{
//         setUpRecaptha,
//         verifyOtp,
//         googleSignIn,
//         sendEmailOtp,
//         verifyEmailOtp,
//       }}
//     >
//       {children}
//     </UserAuthContext.Provider>
//   );
// };

// export const useUserAuth = () => useContext(UserAuthContext);











// // src/context/UserAuthContext.js
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../firebase"; // Your Firebase config

// const UserAuthContext = createContext();

// export const UserAuthContextProvider = ({ children }) => {
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Firebase Recaptcha setup + OTP send
//   const setUpRecaptha = (phone) => {
//     const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
//     return signInWithPhoneNumber(auth, `+91${phone}`, recaptcha).then((result) => {
//       setConfirmationResult(result);
//     });
//   };

//   // Firebase OTP verification
//   const verifyOtp = (otp) => {
//     return confirmationResult.confirm(otp);
//   };

//   // Google login
//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   // Email OTP mock (or connect to your API later)
//   const sendEmailOtp = async (email) => {
//     console.log("Sending email OTP to:", email);
//   };

//   const verifyEmailOtp = async (email, otp) => {
//     console.log("Verifying email OTP for:", email);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <UserAuthContext.Provider
//       value={{
//         user,
//         setUser,
//         logout,
//         setUpRecaptha,
//         verifyOtp,
//         googleSignIn,
//         sendEmailOtp,
//         verifyEmailOtp,
//       }}
//     >
//       {children}
//     </UserAuthContext.Provider>
//   );
// };

// export const useUserAuth = () => useContext(UserAuthContext);




// // src/context/UserAuthContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// const UserAuthContext = createContext();

// export const UserAuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const [profile, setProfile] = useState(() => {
//     const storedProfile = localStorage.getItem("profile");
//     return storedProfile ? JSON.parse(storedProfile) : null;
//   });

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);

//       if (currentUser && !profile) {
//         const googleProfile = {
//           firstName: currentUser.displayName?.split(" ")[0] || "",
//           lastName: currentUser.displayName?.split(" ")[1] || "",
//           email: currentUser.email || "",
//           phone: currentUser.phoneNumber || "",
//         };
//         setProfile(googleProfile);
//         localStorage.setItem("profile", JSON.stringify(googleProfile));
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = () => {
//     const auth = getAuth();
//     return signOut(auth).then(() => {
//       setUser(null);
//       setProfile(null);
//       localStorage.removeItem("profile");
//       localStorage.removeItem("token");
//     });
//   };

//   return (
//     <UserAuthContext.Provider value={{ user, setUser, profile, setProfile, logout }}>
//       {children}
//     </UserAuthContext.Provider>
//   );
// };

// export const useUserAuth = () => useContext(UserAuthContext);






import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && !profile) {
        const googleProfile = {
          firstName: currentUser.displayName?.split(" ")[0] || "",
          lastName: currentUser.displayName?.split(" ")[1] || "",
          email: currentUser.email || "",
          phone: currentUser.phoneNumber || "",
        };
        setProfile(googleProfile);
        localStorage.setItem("profile", JSON.stringify(googleProfile));
      }
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
      setUser(null);
      setProfile(null);
      localStorage.removeItem("profile");
      localStorage.removeItem("user");
    });
  };

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, profile, setProfile, logout, googleSignIn }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
