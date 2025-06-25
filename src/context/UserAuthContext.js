
// // import { createContext, useContext, useEffect, useState } from "react";
// // import {
// //   createUserWithEmailAndPassword,
// //   signInWithEmailAndPassword,
// //   onAuthStateChanged,
// //   signOut,
// //   GoogleAuthProvider,
// //   signInWithPopup,
// //   RecaptchaVerifier, // Ensure this is imported
// //   signInWithPhoneNumber, // Ensure this is imported
// // } from "firebase/auth";
// // import { auth } from "../firebase"; // Assuming "../firebase" correctly exports the 'auth' instance

// // // Create the context
// // const userAuthContext = createContext();

// // export function UserAuthContextProvider({ children }) {
// //   const [user, setUser] = useState({});

// //   // Function to log in with email and password
// //   function logIn(email, password) {
// //     return signInWithEmailAndPassword(auth, email, password);
// //   }

// //   // Function to sign up with email and password
// //   function signUp(email, password) {
// //     return createUserWithEmailAndPassword(auth, email, password);
// //   }

// //   // Function to log out
// //   function logOut() {
// //     return signOut(auth);
// //   }

// //   // Function to sign in with Google
// //   function googleSignIn() {
// //     const googleAuthProvider = new GoogleAuthProvider();
// //     return signInWithPopup(auth, googleAuthProvider);
// //   }

// //   // Function to set up reCAPTCHA and initiate phone number sign-in
// //   function setUpRecaptha(number) {
// //     // Corrected: 'auth' is the first argument, followed by the container ID and then options.
// //     const recaptchaVerifier = new RecaptchaVerifier(
// //       auth, // Firebase Auth instance
// //       "recaptcha-container", // The ID of the HTML element where reCAPTCHA will be rendered
// //       {
// //         // Optional reCAPTCHA parameters.
// //         // You can customize size, theme, or add callbacks here.
// //         // For an invisible reCAPTCHA, you might specify:
// //         // 'size': 'invisible',
// //         // 'callback': (response) => {
// //         //   // reCAPTCHA solved, proceed with signInWithPhoneNumber
// //         // }
// //       }
// //     );

// //     // Render the reCAPTCHA widget. This makes it visible to the user.
// //     // For invisible reCAPTCHA, you would typically call this right before signInWithPhoneNumber.
// //     recaptchaVerifier.render();

// //     // Initiate phone number sign-in with the provided number and reCAPTCHA verifier.
// //     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
// //   }

// //   // Effect hook to listen for authentication state changes
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
// //       console.log("Auth state changed:", currentuser); // More descriptive log
// //       setUser(currentuser);
// //     });

// //     // Cleanup function: unsubscribe from auth state changes when component unmounts
// //     return () => {
// //       unsubscribe();
// //     };
// //   }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

// //   // Provide the user authentication context to children components
// //   return (
// //     <userAuthContext.Provider
// //       value={{
// //         user,
// //         logIn,
// //         signUp,
// //         logOut,
// //         googleSignIn,
// //         setUpRecaptha,
// //       }}
// //     >
// //       {children}
// //     </userAuthContext.Provider>
// //   );
// // }

// // // Custom hook to easily consume the user authentication context
// // export function useUserAuth() {
// //   return useContext(userAuthContext);
// // }




// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { auth } from "../firebase"; // make sure auth is exported from your firebase config

// // Create the context
// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {
//   const [user, setUser] = useState({});
//   const [profile, setProfile] = useState(
//     JSON.parse(localStorage.getItem("profile")) || null
//   );

//   // Sign up with email and password
//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   // Log in with email and password
//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // Log out and clear profile info
//   function logOut() {
//     localStorage.removeItem("profile");
//     setProfile(null);
//     return signOut(auth);
//   }

//   // Google login
//   function googleSignIn() {
//     const googleAuthProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleAuthProvider);
//   }

//   // Phone auth
//   function setUpRecaptha(number) {
//     const recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {}
//     );
//     recaptchaVerifier.render();
//     return signInWithPhoneNumber(auth, number, recaptchaVerifier);
//   }

//   // Listen to auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Auth state changed:", currentUser);
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Provide context to all components
//   return (
//     <userAuthContext.Provider
//       value={{
//         user,
//         signUp,
//         logIn,
//         logOut,
//         googleSignIn,
//         setUpRecaptha,
//         profile,
//         setProfile,
//       }}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// // Custom hook
// export function useUserAuth() {
//   return useContext(userAuthContext);
// }





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
