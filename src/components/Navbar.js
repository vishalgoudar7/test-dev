

// import React, { useState, useEffect } from "react";
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
// import { signOut, getAuth } from "firebase/auth";
// import { useUserAuth } from "../context/UserAuthContext";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { user, logout } = useUserAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const combo = document.querySelector(".goog-te-combo");
//       const container = document.getElementById("google-language-container");
//       if (combo && container && !container.contains(combo)) {
//         container.innerHTML = "";
//         container.appendChild(combo);
//         combo.classList.add("language-select");
//         combo.selectedIndex = 0;
//         clearInterval(interval);
//       }
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     signOut(getAuth())
//       .catch((err) => console.error("Logout Error:", err))
//       .finally(() => {
//         logout(); // context logout
//         setDropdownOpen(false);
//         navigate("/login");
//       });
//   };

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/about">
//           <img src={logo} alt="Devalaya Logo" className="logo" />
//         </Link>
//       </div>

//       <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//         <ul className="nav-links">
//           <li><Link to="/">HOME</Link></li>
//           <li><Link to="/puja">PUJA</Link></li>
//           <li><Link to="/prasadam">PRASADAM</Link></li>
//           <li><Link to="/events">EVENTS</Link></li>
//           <li><Link to="/chadhava">CHADHAVA</Link></li>
//           <li><Link to="/about">ABOUT US</Link></li>
//           <li><Link to="/contact">CONTACT US</Link></li>
//         </ul>
//       </div>

//       <div className="nav-right">
//         <div id="google-language-container" />

//         {!user ? (
//           <>
//             <Link to="/login" className="nav-button"><FaUser className="icon" /></Link>
//             <Link to="/cart" className="nav-button"><FaShoppingCart className="icon" /></Link>
//           </>
//         ) : (
//           <>
//             <div className="profile-dropdown-container">
//               <button className="profile-avatar" onClick={toggleDropdown}>
//                 <FaUser className="icon" />
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

//             <Link to="/cart" className="nav-button"><FaShoppingCart className="icon" /></Link>
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






// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaSignOutAlt,
  FaCalendarAlt,
  FaPlaceOfWorship,
} from "react-icons/fa";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Cart count from localStorage or state (sync with TempleDetails.js logic)
  const [cartCount, setCartCount] = useState(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false); // For CartDrawer trigger

  // Listen for cart changes in localStorage (if you want to persist cart)
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  // Listen for custom event to open CartDrawer from anywhere
  useEffect(() => {
    const openDrawer = () => setCartDrawerOpen(true);
    window.addEventListener('open-cart-drawer', openDrawer);
    return () => window.removeEventListener('open-cart-drawer', openDrawer);
  }, []);
  const navigate = useNavigate();

  const { user, logout } = useUserAuth();

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
    logout()
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
    <>
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
              <button
                className="nav-button"
                style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Open cart drawer"
                onClick={() => setCartDrawerOpen(true)}
              >
                <FaShoppingCart className="icon" />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 7px',
                    fontSize: 12,
                    fontWeight: 'bold',
                    minWidth: 18,
                    textAlign: 'center',
                    boxShadow: '0 0 2px #000'
                  }}>{cartCount}</span>
                )}
              </button>
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

              <button
                className="nav-button"
                style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Open cart drawer"
                onClick={() => setCartDrawerOpen(true)}
              >
                <FaShoppingCart className="icon" />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 7px',
                    fontSize: 12,
                    fontWeight: 'bold',
                    minWidth: 18,
                    textAlign: 'center',
                    boxShadow: '0 0 2px #000'
                  }}>{cartCount}</span>
                )}
              </button>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </nav>

      {/* CartDrawer integration (dynamically import to avoid circular deps if needed) */}
      {cartDrawerOpen && (
        (() => {
          const CartDrawer = require('./CartDrawer').default;
          return <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />;
        })()
      )}
    </>
  );
};

export default Navbar;
