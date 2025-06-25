
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { UserAuthContextProvider } from "./context/UserAuthContext";

import Navbar from "./components/Navbar";
import AllRouters from "./Routes/AllRouters";
import AppInfoSection from "./components/AppInfoSection";
import SpecialPujaSection from "./components/SpecialPujaSection";
import Footer from "./components/Footer";

function AppWrapper() {
  const location = useLocation();

  const showFooterOnPages = ["/", "/about", "/contact", "/events", "/puja","/prasadam","/chadhava"];

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<AllRouters />} />
      </Routes>

      {location.pathname === "/" && (
        <>
          <AppInfoSection />
          <SpecialPujaSection />
        </>
      )}

      {showFooterOnPages.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <AppWrapper />
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
