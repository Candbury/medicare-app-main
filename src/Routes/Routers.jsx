import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Doctors from "../Pages/Doctors/Doctors";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Services from "../Pages/Services";
import DoctorsDetails from "../Pages/Doctors/DoctorsDetails";
import Dashboard from "../Dashboard/doctor-account/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MyAccount from "../Dashboard/user-account/MyAccount.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>} />
      <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>} />
    </Routes>
  );
};

export default Routers;
