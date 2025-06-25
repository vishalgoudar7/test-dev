

// import React, { useEffect, useState } from "react";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.png";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaPlaceOfWorship,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // Firebase auth listener
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Re-attach Google Translate dropdown on mount
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const combo = document.querySelector(".goog-te-combo");
//       const container = document.getElementById("google-language-container");

//       if (combo && container && !container.contains(combo)) {
//         container.innerHTML = "";
//         container.appendChild(combo);
//         combo.classList.add("language-select");

//         // ✅ Keep "Select Language" on refresh
//         combo.selectedIndex = 0; // set default option visibly

//         clearInterval(interval);
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   // Logout
//   const handleLogout = () => {
//     signOut(getAuth())
//       .then(() => {
//         setDropdownOpen(false);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.error("Logout Error:", error);
//       });
//   };

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/">
//           <img src={logo} alt="Devalaya Logo" className="logo" />
//         </Link>
//       </div>

//       <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//         <ul className="nav-links">
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
//           <li><Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link></li>
//           <li><Link to="/events" onClick={() => setMenuOpen(false)}>EVENTS</Link></li>
//           <li><Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link></li>
//         </ul>
//       </div>

//       <div className="nav-right">
//         <div id="google-language-container" />

//         {!user ? (
//           <>
//             <Link to="/login" className="nav-button">
//               <FaUser className="icon" />
//             </Link>
//             <Link to="/cart" className="nav-button">
//               <FaShoppingCart className="icon" />
//             </Link>
//           </>
//         ) : (
//           <>
//             <div className="profile-dropdown-container">
//               <button className="profile-avatar" onClick={toggleDropdown}>
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   alt="user"
//                 />

//               </button>
//               {dropdownOpen && (
//                 <div className="profile-dropdown-menu">
//                   <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                     <FaUser className="icon" /> My Profile
//                   </Link>
//                   {user && (
//   <div className="dropdown-menu">
//     <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//       <FaUser className="icon" /> My Profile
//     </Link>
//     {/* Add more dropdown items like My Bookings, Logout etc */}
//   </div>
// )}

//                   <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                     <FaPlaceOfWorship className="icon" /> Suggest Temple
//                   </Link>
//                   <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                     <FaCalendarAlt className="icon" /> My Bookings
//                   </Link>
//                   <button onClick={handleLogout} className="dropdown-item logout">
//                     <FaSignOutAlt className="icon" /> Log Out
//                   </button>
//                 </div>
//               )}
//             </div>

//             <Link to="/cart" className="nav-button">
//               <FaShoppingCart className="icon" />
//             </Link>
//           </>
//         )}
//       </div>

//       <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         <FaBars />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;







// import React, { useEffect, useState } from "react";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.png";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaPlaceOfWorship,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // Firebase auth listener
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Re-attach Google Translate dropdown on mount
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const combo = document.querySelector(".goog-te-combo");
//       const container = document.getElementById("google-language-container");

//       if (combo && container && !container.contains(combo)) {
//         container.innerHTML = "";
//         container.appendChild(combo);
//         combo.classList.add("language-select");
//         combo.selectedIndex = 0; // Reset selection
//         clearInterval(interval);
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   // Logout
//   const handleLogout = () => {
//     signOut(getAuth())
//       .then(() => {
//         setDropdownOpen(false);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.error("Logout Error:", error);
//       });
//   };

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         {/* ✅ Logo now links to About Us */}
//         <Link to="/about">
//           <img src={logo} alt="Devalaya Logo" className="logo" />
//         </Link>
//       </div>

//       <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//         <ul className="nav-links">
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
//           <li><Link to="/puja" onClick={() => setMenuOpen(false)}>PUJA</Link></li>
//           <li><Link to="/prasadam" onClick={() => setMenuOpen(false)}>PRASADAM</Link></li>
//           <li><Link to="/events" onClick={() => setMenuOpen(false)}>EVENTS</Link></li>
//           <li><Link to="/chadhava" onClick={() => setMenuOpen(false)}>CHADHAVA</Link></li>
//           <li><Link to="/events" onClick={() => setMenuOpen(false)}>ABOUT US</Link></li>
//           <li><Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link></li>
//         </ul>
//       </div>

//       <div className="nav-right">
//         <div id="google-language-container" />

//         {!user ? (
//           <>
//             <Link to="/login" className="nav-button">
//               <FaUser className="icon" />
//             </Link>
//             <Link to="/cart" className="nav-button">
//               <FaShoppingCart className="icon" />
//             </Link>
//           </>
//         ) : (
//           <>
//             <div className="profile-dropdown-container">
//               <button className="profile-avatar" onClick={toggleDropdown}>
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   alt="user"
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="profile-dropdown-menu">
//                   <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                     <FaUser className="icon" /> My Profile
//                   </Link>
//                   <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                     <FaPlaceOfWorship className="icon" /> Suggest Temple
//                   </Link>
//                   <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                     <FaCalendarAlt className="icon" /> My Bookings
//                   </Link>
//                   <button onClick={handleLogout} className="dropdown-item logout">
//                     <FaSignOutAlt className="icon" /> Log Out
//                   </button>
//                 </div>
//               )}
//             </div>

//             <Link to="/cart" className="nav-button">
//               <FaShoppingCart className="icon" />
//             </Link>
//           </>
//         )}
//       </div>

//       <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         <FaBars />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaSignOutAlt,
  FaCalendarAlt,
  FaPlaceOfWorship,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      const container = document.getElementById("google-language-container");
      if (combo && container && !container.contains(combo)) {
        container.innerHTML = "";
        container.appendChild(combo);
        combo.classList.add("language-select");
        combo.selectedIndex = 0;
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    signOut(getAuth())
      .then(() => {
        setDropdownOpen(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/about">
          <img src={logo} alt="Devalaya Logo" className="logo" />
        </Link>
      </div>

      <div className={`nav-center ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
          <li><Link to="/puja" onClick={() => setMenuOpen(false)}>PUJA</Link></li>
          <li><Link to="/prasadam" onClick={() => setMenuOpen(false)}>PRASADAM</Link></li>
          <li><Link to="/events" onClick={() => setMenuOpen(false)}>EVENTS</Link></li>
          <li><Link to="/chadhava" onClick={() => setMenuOpen(false)}>CHADHAVA</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        <div id="google-language-container" />

        {!user ? (
          <>
            <Link to="/login" className="nav-button">
              <FaUser className="icon" />
            </Link>
            <Link to="/cart" className="nav-button">
              <FaShoppingCart className="icon" />
            </Link>
          </>
        ) : (
          <>
            <div className="profile-dropdown-container">
              <button className="profile-avatar" onClick={toggleDropdown}>
                <FaUser className="icon" />
              </button>

              {dropdownOpen && (
                <div className="profile-dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <FaUser className="icon" /> My Profile
                  </Link>
                  <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <FaPlaceOfWorship className="icon" /> Suggest Temple
                  </Link>
                  <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <FaCalendarAlt className="icon" /> My Bookings
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt className="icon" /> Log Out
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="nav-button">
              <FaShoppingCart className="icon" />
            </Link>
          </>
        )}
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>
    </nav>
  );
};

export default Navbar;
