import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MenteeView from "./pages/MenteeView";
import MentorView from "./pages/mentor/MentorView";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MenteeProfile from "./pages/MenteeProfile";
import MentorListing from "./pages/MentorListing";
import BookSession from "./pages/BookSession";
import MenteeDashboard from "./pages/MenteeDashboard";
import MentorAvailability from "./pages/mentor/MentorAvailability";
import MentorProfile from "./pages/mentor/MentorProfile";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/common/Navbar";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { role } = JSON.parse(userData);
      if (role === "mentor") {
        navigate("/mentor/MentorView");
      } else if (role === "mentee") {
        navigate("/mentee/MenteeView");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoleBasedRedirect />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/mentee/MenteeView"
            element={
              <ProtectedRoute allowedRoles={["mentee"]}>
                <MenteeView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/MentorView"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <MentorView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentee/profile"
            element={
              <ProtectedRoute allowedRoles={["mentee"]}>
                <MenteeProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentee/mentor"
            element={
              <ProtectedRoute allowedRoles={["mentee"]}>
                <MentorListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentee/menteeDashboard"
            element={
              <ProtectedRoute allowedRoles={["mentee"]}>
                <MenteeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book-session"
            element={
              <ProtectedRoute allowedRoles={["mentee"]}>
                <BookSession />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/availability"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <MentorAvailability />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/profile"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <MentorProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about-us"
            element={
              <div>
                <Navbar />
                <AboutUs />
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
