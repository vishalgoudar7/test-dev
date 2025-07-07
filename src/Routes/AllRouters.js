
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import PujaDetails from "../pages/PujaDetails";
import PhoneSignUp from "../components/PhoneSignUp";
import ForgotPassword from "../components/ForgotPassword";
import ProfilePage from "../pages/ProfilePage";
import TempleDetails from '../components/TempleDetails';
import ProfileDetails from "../pages/ProfileDetails";
import MyBookings from "../pages/MyBookings";
import SuggestTemple from "../pages/SuggestTemple";
import EditProfile from "../pages/EditProfile";
import TempleList from "../components/TempleList";
import CartPage from '../pages/CartPage';
import PujaList from "../pages/PujaList";

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
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/puja" element={<PujaList />} />
      <Route path="/temples" element={<TempleList />} />
      <Route path="/temples/:id" element={<TempleDetails />} />
      <Route path="/profile/details" element={<ProfileDetails />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/suggest-temple" element={<SuggestTemple />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AllRouters;
