
// // src/components/Navbar.js
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaPlaceOfWorship,
// } from "react-icons/fa";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   // Cart count from localStorage or state (sync with TempleDetails.js logic)
//   const [cartCount, setCartCount] = useState(0);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false); // For CartDrawer trigger

//   // Listen for cart changes in localStorage (if you want to persist cart)
//   useEffect(() => {
//     const updateCartCount = () => {
//       try {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         setCartCount(cart.length);
//       } catch {
//         setCartCount(0);
//       }
//     };
//     updateCartCount();
//     window.addEventListener('storage', updateCartCount);
//     return () => window.removeEventListener('storage', updateCartCount);
//   }, []);

//   // Listen for custom event to open CartDrawer from anywhere
//   useEffect(() => {
//     const openDrawer = () => setCartDrawerOpen(true);
//     window.addEventListener('open-cart-drawer', openDrawer);
//     return () => window.removeEventListener('open-cart-drawer', openDrawer);
//   }, []);
//   const navigate = useNavigate();

//   const { user, logout } = useUserAuth();

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
//     logout()
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
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <Link to="/about">
//             <img src={logo} alt="Devalaya Logo" className="logo" />
//           </Link>
//         </div>

//         <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//           <ul className="nav-links">
//             <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
//             <li><Link to="/puja" onClick={() => setMenuOpen(false)}>PUJA</Link></li>
//             <li><Link to="/prasadam" onClick={() => setMenuOpen(false)}>PRASADAM</Link></li>
//             <li><Link to="/events" onClick={() => setMenuOpen(false)}>EVENTS</Link></li>
//             <li><Link to="/chadhava" onClick={() => setMenuOpen(false)}>CHADHAVA</Link></li>
//             <li><Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link></li>
//             <li><Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link></li>
//           </ul>
//         </div>

//         <div className="nav-right">
//           <div id="google-language-container" />

//           {!user ? (
//             <>
//               <Link to="/login" className="nav-button">
//                 <FaUser className="icon" />
//               </Link>
//               <button
//                 className="nav-button"
//                 style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
//                 aria-label="Open cart drawer"
//                 onClick={() => setCartDrawerOpen(true)}
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && (
//                   <span style={{
//                     position: 'absolute',
//                     top: -6,
//                     right: -6,
//                     background: 'red',
//                     color: 'white',
//                     borderRadius: '50%',
//                     padding: '2px 7px',
//                     fontSize: 12,
//                     fontWeight: 'bold',
//                     minWidth: 18,
//                     textAlign: 'center',
//                     boxShadow: '0 0 2px #000'
//                   }}>{cartCount}</span>
//                 )}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="profile-dropdown-container">
//                 <button className="profile-avatar" onClick={toggleDropdown}>
//                   <FaUser className="icon" />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="profile-dropdown-menu">
//                     <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaUser className="icon" /> My Profile
//                     </Link>
//                     <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaPlaceOfWorship className="icon" /> Suggest Temple
//                     </Link>
//                     <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaCalendarAlt className="icon" /> My Bookings
//                     </Link>
//                     <button onClick={handleLogout} className="dropdown-item logout">
//                       <FaSignOutAlt className="icon" /> Log Out
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <button
//                 className="nav-button"
//                 style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
//                 aria-label="Open cart drawer"
//                 onClick={() => setCartDrawerOpen(true)}
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && (
//                   <span style={{
//                     position: 'absolute',
//                     top: -6,
//                     right: -6,
//                     background: 'red',
//                     color: 'white',
//                     borderRadius: '50%',
//                     padding: '2px 7px',
//                     fontSize: 12,
//                     fontWeight: 'bold',
//                     minWidth: 18,
//                     textAlign: 'center',
//                     boxShadow: '0 0 2px #000'
//                   }}>{cartCount}</span>
//                 )}
//               </button>
//             </>
//           )}
//         </div>

//         <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </div>
//       </nav>

//       {/* CartDrawer integration (dynamically import to avoid circular deps if needed) */}
//       {cartDrawerOpen && (
//         (() => {
//           const CartDrawer = require('./CartDrawer').default;
//           return <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />;
//         })()
//       )}
//     </>
//   );
// };

// export default Navbar;







// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaPlaceOfWorship,
// } from "react-icons/fa";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.png";
// import logo2 from "../assets/logo2.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
//   const { user, logout } = useUserAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updateCartCount = () => {
//       try {
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCartCount(cart.length);
//       } catch {
//         setCartCount(0);
//       }
//     };
//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   useEffect(() => {
//     const openDrawer = () => setCartDrawerOpen(true);
//     window.addEventListener("open-cart-drawer", openDrawer);
//     return () => window.removeEventListener("open-cart-drawer", openDrawer);
//   }, []);

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
//     logout()
//       .then(() => {
//         setDropdownOpen(false);
//         navigate("/login");
//       })
//       .catch((error) => console.error("Logout Error:", error));
//   };

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <img src={logo2} alt="Secondary Logo" className="extra-logo" />
//           <Link to="/">
//             <img src={logo} alt="Devalaya Logo" className="logo" />
//           </Link>
//         </div>

//         <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//           <ul className="nav-links">
//             <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
//             <li><Link to="/puja" onClick={() => setMenuOpen(false)}>PUJA</Link></li>
//             <li><Link to="/prasadam" onClick={() => setMenuOpen(false)}>PRASADAM</Link></li>
//             <li><Link to="/events" onClick={() => setMenuOpen(false)}>EVENTS</Link></li>
//             <li><Link to="/chadhava" onClick={() => setMenuOpen(false)}>CHADHAVA</Link></li>
//             <li><Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link></li>
//             <li><Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link></li>
//           </ul>
//         </div>

//         <div className="nav-right">
//           <div id="google-language-container" />

//           {!user ? (
//             <>
//               <Link to="/login" className="nav-button">
//                 <FaUser className="icon" />
//               </Link>
//               <button
//                 className="nav-button"
//                 style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
//                 aria-label="Open cart drawer"
//                 onClick={() => setCartDrawerOpen(true)}
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="profile-dropdown-container">
//                 <button className="profile-avatar" onClick={toggleDropdown}>
//                   <FaUser className="icon" />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="profile-dropdown-menu">
//                     <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaUser className="icon" /> My Profile
//                     </Link>
//                     <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaPlaceOfWorship className="icon" /> Suggest Temple
//                     </Link>
//                     <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaCalendarAlt className="icon" /> My Bookings
//                     </Link>
//                     <button onClick={handleLogout} className="dropdown-item logout">
//                       <FaSignOutAlt className="icon" /> Log Out
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <button
//                 className="nav-button"
//                 style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
//                 aria-label="Open cart drawer"
//                 onClick={() => setCartDrawerOpen(true)}
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//               </button>
//             </>
//           )}
//         </div>

//         <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </div>
//       </nav>

//       {cartDrawerOpen && (() => {
//         const CartDrawer = require('./CartDrawer').default;
//         return <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />;
//       })()}
//     </>
//   );
// };

// export default Navbar;





// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, Link } from "react-router-dom";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaPlaceOfWorship,
// } from "react-icons/fa";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.png";
// import logo2 from "../assets/logo2.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
//   const { user, logout } = useUserAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updateCartCount = () => {
//       try {
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCartCount(cart.length);
//       } catch {
//         setCartCount(0);
//       }
//     };
//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   useEffect(() => {
//     const openDrawer = () => setCartDrawerOpen(true);
//     window.addEventListener("open-cart-drawer", openDrawer);
//     return () => window.removeEventListener("open-cart-drawer", openDrawer);
//   }, []);

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
//     logout()
//       .then(() => {
//         setDropdownOpen(false);
//         navigate("/login");
//       })
//       .catch((error) => console.error("Logout Error:", error));
//   };

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <img src={logo2} alt="Secondary Logo" className="extra-logo" />
//           <Link to="/">
//             <img src={logo} alt="Devalaya Logo" className="logo" />
//           </Link>
//         </div>

//         <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//           <ul className="nav-links">
//             <li><NavLink to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink></li>
//             <li><NavLink to="/puja" onClick={() => setMenuOpen(false)}>PUJA</NavLink></li>
//             <li><NavLink to="/prasadam" onClick={() => setMenuOpen(false)}>PRASADAM</NavLink></li>
//             <li><NavLink to="/events" onClick={() => setMenuOpen(false)}>EVENTS</NavLink></li>
//             <li><NavLink to="/chadhava" onClick={() => setMenuOpen(false)}>CHADHAVA</NavLink></li>
//             <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</NavLink></li>
//             <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</NavLink></li>
//           </ul>
//         </div>

//         <div className="nav-right">
//           <div id="google-language-container" />

//           {!user ? (
//             <>
//               <Link to="/login" className="nav-button">
//                 <FaUser className="icon" />
//               </Link>
//               <button
//                 className="nav-button"
//                 style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
//                 aria-label="Open cart drawer"
//                 onClick={() => setCartDrawerOpen(true)}
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="profile-dropdown-container">
//                 <button className="profile-avatar" onClick={toggleDropdown}>
//                   <FaUser className="icon" />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="profile-dropdown-menu">
//                     <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaUser className="icon" /> My Profile
//                     </Link>
//                     <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaPlaceOfWorship className="icon" /> Suggest Temple
//                     </Link>
//                     <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaCalendarAlt className="icon" /> My Bookings
//                     </Link>
//                     <button onClick={handleLogout} className="dropdown-item logout">
//                       <FaSignOutAlt className="icon" /> Log Out
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <button
//                 className="nav-button"
//                 style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
//                 aria-label="Open cart drawer"
//                 onClick={() => setCartDrawerOpen(true)}
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//               </button>
//             </>
//           )}
//         </div>

//         <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </div>
//       </nav>

//       {cartDrawerOpen && (() => {
//         const CartDrawer = require('./CartDrawer').default;
//         return <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />;
//       })()}
//     </>
//   );
// };

// export default Navbar;








// // src/components/Navbar.js
// import React, { useEffect, useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaPlaceOfWorship,
// } from "react-icons/fa";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/Navbar.css";
// import logo from "../assets/logo.png";
// import extraLogo from "../assets/logo2.png"; // second logo

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout } = useUserAuth();

//   useEffect(() => {
//     const updateCartCount = () => {
//       try {
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCartCount(cart.length);
//       } catch {
//         setCartCount(0);
//       }
//     };
//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   useEffect(() => {
//     const openDrawer = () => setCartDrawerOpen(true);
//     window.addEventListener("open-cart-drawer", openDrawer);
//     return () => window.removeEventListener("open-cart-drawer", openDrawer);
//   }, []);

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
//     logout()
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
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <img src={extraLogo} alt="Extra Logo" className="extra-logo" />
//           <Link to="/about">
//             <img src={logo} alt="Devalaya Logo" className="logo" />
//           </Link>
//         </div>

//         <div className={`nav-center ${menuOpen ? "open" : ""}`}>
//           <ul className="nav-links">
//             <li><NavLink to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink></li>
//             <li><NavLink to="/puja" onClick={() => setMenuOpen(false)}>PUJA</NavLink></li>
//             <li><NavLink to="/prasadam" onClick={() => setMenuOpen(false)}>PRASADAM</NavLink></li>
//             <li><NavLink to="/events" onClick={() => setMenuOpen(false)}>EVENTS</NavLink></li>
//             <li><NavLink to="/chadhava" onClick={() => setMenuOpen(false)}>CHADHAVA</NavLink></li>
//             <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</NavLink></li>
//             <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</NavLink></li>
//           </ul>
//         </div>

//         <div className="nav-right">
//           <div id="google-language-container" />

//           {!user ? (
//             <>
//               <Link to="/login" className="nav-button">
//                 <FaUser className="icon" />
//               </Link>
//               <button
//                 className="nav-button"
//                 onClick={() => setCartDrawerOpen(true)}
//                 aria-label="Open cart drawer"
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="profile-dropdown-container">
//                 <button className="profile-avatar" onClick={toggleDropdown}>
//                   <FaUser className="icon" />
//                 </button>
//                 {dropdownOpen && (
//                   <div className="profile-dropdown-menu">
//                     <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaUser className="icon" /> My Profile
//                     </Link>
//                     <Link to="/suggest-temple" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaPlaceOfWorship className="icon" /> Suggest Temple
//                     </Link>
//                     <Link to="/bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
//                       <FaCalendarAlt className="icon" /> My Bookings
//                     </Link>
//                     <button onClick={handleLogout} className="dropdown-item logout">
//                       <FaSignOutAlt className="icon" /> Log Out
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <button
//                 className="nav-button"
//                 onClick={() => setCartDrawerOpen(true)}
//                 aria-label="Open cart drawer"
//               >
//                 <FaShoppingCart className="icon" />
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//               </button>
//             </>
//           )}
//         </div>

//         <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </div>
//       </nav>

//       {cartDrawerOpen && (() => {
//         const CartDrawer = require("./CartDrawer").default;
//         return <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />;
//       })()}
//     </>
//   );
// };

// export default Navbar;





import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
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
import extraLogo from "../assets/logo2.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 used to detect route change

  // 👇 close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    const openDrawer = () => setCartDrawerOpen(true);
    window.addEventListener("open-cart-drawer", openDrawer);
    return () => window.removeEventListener("open-cart-drawer", openDrawer);
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
          <img src={extraLogo} alt="Extra Logo" className="extra-logo" />
          <Link to="/about">
            <img src={logo} alt="Devalaya Logo" className="logo" />
          </Link>
        </div>

        <div className={`nav-center ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/puja">PUJA</NavLink></li>
            <li><NavLink to="/prasadam">PRASADAM</NavLink></li>
            <li><NavLink to="/events">EVENTS</NavLink></li>
            <li><NavLink to="/chadhava">CHADHAVA</NavLink></li>
            <li><NavLink to="/about">ABOUT US</NavLink></li>
            <li><NavLink to="/contact">CONTACT US</NavLink></li>
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
                onClick={() => setCartDrawerOpen(true)}
                aria-label="Open cart drawer"
              >
                <FaShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
                onClick={() => setCartDrawerOpen(true)}
                aria-label="Open cart drawer"
              >
                <FaShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </nav>

      {cartDrawerOpen && (() => {
        const CartDrawer = require("./CartDrawer").default;
        return <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />;
      })()}
    </>
  );
};

export default Navbar;
