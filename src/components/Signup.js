// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert, Button } from "react-bootstrap";
// import { useUserAuth } from "../context/UserAuthContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "../styles/Signup.css"; // Shared CSS file for auth pages

// const Signup = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const { signUp, setProfile } = useUserAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       setError("Please enter a valid 10-digit Indian phone number.");
//       return;
//     }

//     try {
//       await signUp(email, password);

//       // Save profile to context and localStorage
//       const userProfile = { firstName, lastName, phone, email };
//       setProfile(userProfile);
//       localStorage.setItem("profile", JSON.stringify(userProfile));

//       navigate("/profile");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2 className="text-center mb-4">Sign Up</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formFirstName">
//             <Form.Control
//               type="text"
//               placeholder="First Name"
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formLastName">
//             <Form.Control
//               type="text"
//               placeholder="Last Name"
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formPhone">
//             <Form.Control
//               type="tel"
//               placeholder="Phone Number"
//               maxLength="10"
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Control
//               type="email"
//               placeholder="Email address"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group
//             className="mb-3 password-input"
//             controlId="formBasicPassword"
//             style={{ position: "relative" }}
//           >
//             <Form.Control
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 right: "10px",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#555",
//               }}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </Form.Group>

//           <div className="d-grid gap-2">
//             <Button variant="primary" type="submit" className="orange-btn">
//               SIGN UP
//             </Button>
//           </div>
//         </Form>

//         <div className="auth-footer text-center mt-3">
//           Already have an account?{" "}
//           <Link to="/login" className="link">
//             LogIn
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
