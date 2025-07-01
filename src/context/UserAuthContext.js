


// import React, { createContext, useContext, useState, useEffect } from "react";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signOut,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";

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

//   const googleSignIn = () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   const logout = () => {
//     const auth = getAuth();
//     return signOut(auth).then(() => {
//       setUser(null);
//       setProfile(null);
//       localStorage.removeItem("profile");
//       localStorage.removeItem("user");
//     });
//   };

//   return (
//     <UserAuthContext.Provider
//       value={{ user, setUser, profile, setProfile, logout, googleSignIn }}
//     >
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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const googleUser = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(googleUser));
        localStorage.setItem("token", "c91ae32509fa4ce4e8c21aa4a86118100f97c4f2");
        setUser(googleUser);
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
  };

  return (
    <UserAuthContext.Provider value={{ user, setUser, googleSignIn, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
