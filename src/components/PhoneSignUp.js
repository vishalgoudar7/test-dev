// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert, Button } from "react-bootstrap";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import { useUserAuth } from "../context/UserAuthContext";
// import "../styles/PhoneSignUp.css"; // Reuse existing Auth.css for unified design

// const PhoneSignUp = () => {
//   const [error, setError] = useState("");
//   const [number, setNumber] = useState("");
//   const [flag, setFlag] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [result, setResult] = useState("");
//   const { setUpRecaptha } = useUserAuth();
//   const navigate = useNavigate();

//   const getOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!number) return setError("Please enter a valid phone number!");
//     try {
//       const response = await setUpRecaptha(number);
//       setResult(response);
//       setFlag(true);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!otp) return;
//     try {
//       await result.confirm(otp);
//       navigate("/");
//     } catch (err) {
//       setError("Invalid OTP. Try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2 className="text-center mb-3">Phone Sign Up</h2>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {!flag ? (
//           <Form onSubmit={getOtp}>
//             <Form.Group className="mb-3" controlId="formBasicPhone">
//               <PhoneInput
//                 defaultCountry="IN"
//                 value={number}
//                 onChange={setNumber}
//                 placeholder="Enter phone number"
//                 className="form-control"
//               />
//               <div id="recaptcha-container" className="mt-2"></div>
//             </Form.Group>
//             <div className="d-flex justify-content-between">
//               <Button type="submit" className="orange-btn">
//                 Send OTP
//               </Button>
//             </div>
//           </Form>
//         ) : (
//           <Form onSubmit={verifyOtp}>
//             <Form.Group className="mb-3" controlId="formBasicOtp">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </Form.Group>
//             <div className="d-flex justify-content-between">
//               <Link to="/">
//                 <Button variant="secondary">Cancel</Button>
//               </Link>
//               <Button type="submit" className="orange-btn">
//                 Verify
//               </Button>
//             </div>
//           </Form>
//         )}

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

// export default PhoneSignUp;
