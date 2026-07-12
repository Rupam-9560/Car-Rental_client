import { Routes, Route } from "react-router-dom"

import Mainpg from "./pages/Mainpg"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Terms from "./pages/Terms"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import CancellationPolicy from "./pages/CancellationPolicy"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

import UserDashboard from "./pages/User/UserDashboard"
import UserUpdatePassword from "./pages/User/UpdatePassword"
import Profile from "./pages/User/Profile"
import BookCar from "./pages/User/BookCar"
import MyBookings from "./pages/User/MyBookings"
import AddTestimonial from "./pages/User/AddTestimonial"
import Testimonials from "./pages/User/Testimonials"
import GenerateTicket from "./pages/User/GenerateTicket"
import TicketHistory from "./pages/User/TicketHistory"

import AdminLogin from "./pages/Admin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AddBrand from "./pages/Admin/AddBrand"
import ManageBrands from "./pages/Admin/ManageBrands"
import RegisteredUsers from "./pages/Admin/RegisteredUsers"
import ManagePages from "./pages/Admin/ManagePages"
import UpdateContactInfo from "./pages/Admin/UpdateContactInfo"
import AdminUpdatePassword from "./pages/Admin/UpdatePassword"
import PostVehicle from "./pages/Admin/PostVehicle"
import ManageVehicles from "./pages/Admin/ManageVehicles"
import EditVehicle from "./pages/Admin/EditVehicle"
import ManageBookings from "./pages/Admin/ManageBookings"
import ManageTestimonials from "./pages/Admin/ManageTestimonials"
import ManageTickets from "./pages/Admin/ManageTickets"

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Mainpg />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cancellation-policy" element={<CancellationPolicy />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/update-password" element={<UserUpdatePassword />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/book-car" element={<BookCar />} />
      <Route path="/user/bookings" element={<MyBookings />} />
      <Route path="/user/add-testimonial" element={<AddTestimonial/>} />
      <Route path="/user/testimonials" element={<Testimonials/>} />
      <Route path="/user/generate-ticket" element={<GenerateTicket />} />
      <Route path="/user/ticket-history" element={<TicketHistory />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-brand" element={<AddBrand />} />
      <Route path="/admin/manage-brands" element={<ManageBrands />} />  
      <Route path="/admin/registered-users" element={<RegisteredUsers />} />  
      <Route path="/admin/manage-pages" element={<ManagePages />} />
      <Route path="/admin/update-contact-info" element={<UpdateContactInfo />} /> 
      <Route path="/admin/update-password" element={<AdminUpdatePassword />} />
      <Route path="/admin/post-vehicle" element={<PostVehicle />} />
      <Route path="/admin/manage-vehicles" element={<ManageVehicles />} />
      <Route path="/admin/edit-vehicle/:id" element={<EditVehicle />} />
      <Route path="/admin/manage-bookings" element={<ManageBookings />} />
      <Route path="/admin/manage-testimonials" element={<ManageTestimonials />} />
      <Route path="/admin/manage-tickets" element={<ManageTickets />} />
    </Routes>
  )
}