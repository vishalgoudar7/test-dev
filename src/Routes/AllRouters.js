import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import PujaDetails from "../pages/PujaDetails";
import Signup from "../components/Signup";
import PhoneSignUp from "../components/PhoneSignUp";
import ForgotPassword from "../components/ForgotPassword";
import ProfilePage from "../pages/ProfilePage";
import PujaPage from "../pages/PujaPage";

// 🔽 New pages for dropdown routes
import ProfileDetails from "../pages/ProfileDetails";
import MyBookings from "../pages/MyBookings";
import SuggestTemples from "../pages/SuggestTemples";
import EditProfile from "../pages/EditProfile";
import TempleList from "../components/TempleList";
const AllRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/PhoneSignUp" element={<PhoneSignUp />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/puja/:id" element={<PujaDetails />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/puja" element={<PujaPage />} />
      <Route path="/temples" element={<TempleList />} />

      {/* 🔽 Added dropdown-linked routes */}
      <Route path="/profile/details" element={<ProfileDetails />} />
      <Route path="/profile/bookings" element={<MyBookings />} />
      <Route path="/profile/suggest" element={<SuggestTemples />} />
    </Routes>
  );
};

export default AllRouters;
