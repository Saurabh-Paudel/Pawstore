import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

// Layouts
import RootLayout from "./Components/RootComponents/RootLayout";
import SellerLayout from "./Components/AdminComponents/SellerLayout";
import BuyerLayout from "./Components/UserComponent/BuyerLyout";

// Client Pages
import Home from "./Pages/Client/Home";
import About from "./Pages/Client/About";
import Services from "./Pages/Client/Services";
import TeamSection from "./Pages/Client/Team";
import FAQsSection from "./Pages/Client/FAQs";
import CareersSection from "./Pages/Client/Career";
import ContactUs from "./Pages/Client/Contact";
import Breed from "./Pages/Client/Breed";
import AccessoriesPage from "./Pages/Client/Accessories";
import BlogSection from "./Pages/Client/Blog";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";

// UserDashboard Pages
import UserDashboard from "./Pages/UserDashboard/UserDashboard";

//AdminDashboard Pages
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  // Fetch user data from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser)); // Update Redux store
    }
    setLoading(false); // Set loading to false after fetching user data
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="team" element={<TeamSection />} />
        <Route path="faq" element={<FAQsSection />} />
        <Route path="careers" element={<CareersSection />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="breeds" element={<Breed />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="blogs" element={<BlogSection />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {userData.token && userData.role === "buyer" && (
        <Route path="/dashboard" element={<BuyerLayout />}>
          <Route path="" element={<UserDashboard />} />
        </Route>
      )}

      {userData.token && userData.role === "admin" && (
        <Route path="/admin" element={<SellerLayout />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
      )}

      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
};

export default App;
