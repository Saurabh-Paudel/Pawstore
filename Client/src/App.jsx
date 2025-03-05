import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

// Layouts
import RootLayout from "./Components/RootComponents/RootLayout";
import SellerLayout from "./Components/AdminComponents/SellerLayout";
import BuyerLayout from "./Components/UserComponent/BuyerLayout";

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
import ProductDetail from "./Pages/Client/ProductDetail";
import AccessoryCheckout from "./Pages/Client/AccessoryCheckout";
import BlogSection from "./Pages/Client/Blog";
import DetailedBlogSection from "./Pages/Client/BlogDetail";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import DogSales from "./Pages/Client/DogSales";
import BuyNow from "./Pages/Client/BuyNow";
import DogCheckout from "./Pages/Client/DogCheckout";
import PaymentSuccess from "./Pages/Client/PaymentSuccess";
import PaymentFailure from "./Pages/Client/PaymentFailure";
import SearchResult from "./Pages/Client/SearchResult";

// UserDashboard Pages
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import UserProfile from "./Pages/UserDashboard/UserProfile/UserProfile";
import MyOrders from "./Pages/UserDashboard/MyOrder/MyOrders";
import MyMessage from "./Pages/UserDashboard/Message/userMessage";
import UserNewsletter from "./Pages/UserDashboard/Newsletter/UserNewsletter";
import UserSettings from "./Pages/UserDashboard/Settings/UserSettings";

//AdminDashboard Pages
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

import DogBreed from "./Pages/AdminDashboard/DogBreeds/DogBreed";
import InsertDogBreed from "./Pages/AdminDashboard/DogBreeds/InsertDogBreed";
import UpdateDogBreed from "./Pages/AdminDashboard/DogBreeds/UpdateDogBreed";

import Dogs from "./Pages/AdminDashboard/Dogs/Dogs";
import DogInsert from "./Pages/AdminDashboard/Dogs/DogInsert";
import DogUpdate from "./Pages/AdminDashboard/Dogs/DogUpdate";

import DogProducts from "./Pages/AdminDashboard/PetProducts/PetProducts";
import InsertDogProduct from "./Pages/AdminDashboard/PetProducts/InsertPetProduct";
import UpdateDogProduct from "./Pages/AdminDashboard/PetProducts/UpdatePetProducts";

import BlogsManagement from "./Pages/AdminDashboard/Blog/Blog";
import InsertBlog from "./Pages/AdminDashboard/Blog/InsertBlog";
import UpdateBlog from "./Pages/AdminDashboard/Blog/UpdateBlog";

import Newsletter from "./Pages/AdminDashboard/Newsletters/Newsletters";

import DogsSales from "./Pages/AdminDashboard/Sales/Dogs/DogsSales";
import AccessoriesSales from "./Pages/AdminDashboard/Sales/Accessories/AccessoriesSales";
import User from "./Pages/AdminDashboard/User/User";
import GeneralSetting from "./Pages/AdminDashboard/GeneralSettings/GeneralSettings";
import MessageDashboard from "./Pages/AdminDashboard/Messages/Messages";

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
        <Route path="accessories-details/:id" element={<ProductDetail />} />
        <Route path="/accessory-checkout" element={<AccessoryCheckout />} />
        <Route path="blogs" element={<BlogSection />} />
        <Route path="blog-details/:id" element={<DetailedBlogSection />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dog-sales" element={<DogSales />} />
        <Route path="dog-sales/buy/:id" element={<BuyNow />} />
        <Route path="/dog-checkout" element={<DogCheckout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/search" element={<SearchResult />} />
      </Route>

      {userData.token && userData.role === "buyer" && (
        <Route path="/dashboard" element={<BuyerLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="my-messages" element={<MyMessage />} />
          <Route path="user-newsletter" element={<UserNewsletter />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
      )}

      {userData.token && userData.role === "admin" && (
        <Route path="/admin" element={<SellerLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dog-breeds" element={<DogBreed />} />
          <Route path="dog-breeds/insert" element={<InsertDogBreed />} />
          <Route path="dog-breeds/update/:id" element={<UpdateDogBreed />} />
          <Route path="dog" element={<Dogs />} />
          <Route path="dog/insert" element={<DogInsert />} />
          <Route path="dog/update/:id" element={<DogUpdate />} />
          <Route path="pet-products" element={<DogProducts />} />
          <Route path="pet-products/insert" element={<InsertDogProduct />} />
          <Route
            path="pet-products/update/:id"
            element={<UpdateDogProduct />}
          />
          <Route path="blogs" element={<BlogsManagement />} />
          <Route path="blogs/insert" element={<InsertBlog />} />
          <Route path="blogs/update/:id" element={<UpdateBlog />} />
          <Route path="newsletters" element={<Newsletter />} />
          <Route path="messages" element={<MessageDashboard />} />
          <Route path="sales/dogs" element={<DogsSales />} />
          <Route path="sales/accessories" element={<AccessoriesSales />} />
          <Route path="users" element={<User />} />
          <Route path="genral-settings" element={<GeneralSetting />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
