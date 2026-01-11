import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./Pages/Menu";
import MealDetail from "./Pages/MealDetail";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashoard";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import TrackOrder from "./Pages/TrackOrder";
import Services from "./Pages/Services";
import About from "./Pages/AboutUs";
import CustomizationPanel from "./Sections/CustomizeFloat";

function App() {
  return (
    <>
      <CustomizationPanel />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-detail/:id" element={<MealDetail />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/login/" element={<Login />} />
        <Route path="admin/login/" element={<AdminLogin />} />
        <Route path="admin/dashboard/" element={<AdminDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
