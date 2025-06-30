
import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PujaDetails from "../pages/PujaDetails";
import PujaPage from "../pages/PujaPage";
import ProfilePage from "../pages/ProfilePage";
import ProfileDetails from "../pages/ProfileDetails";
import EditProfile from "../pages/EditProfile";
import MyBookings from "../pages/MyBookings";
import SuggestTemples from "../pages/SuggestTemples";

// Components
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import PhoneSignUp from "../components/PhoneSignUp";
import ForgotPassword from "../components/ForgotPassword";
import TempleList from "../components/TempleList";
import TempleDetails from "../components/TempleDetails";

const AllRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/PhoneSignUp" element={<PhoneSignUp />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/puja/:id" element={<PujaDetails />} />
      <Route path="/puja" element={<PujaPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/details" element={<ProfileDetails />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/profile/bookings" element={<MyBookings />} />
      <Route path="/profile/suggest" element={<SuggestTemples />} />
      <Route path="/temples" element={<TempleList />} />
      <Route path="/temples/:id" element={<TempleDetails />} />
    </Routes>
  );
};

export default AllRouters;
