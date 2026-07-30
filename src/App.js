import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import ComplaintForm from "./pages/ComplaintForm";
import ComplaintRegistered from "./pages/ComplaintRegisteredPage";
import TrackingPage from "./pages/TrackingPage";
// import Official from "./pages/OfficialsPage"
import SignUpPage from "./pages/SignUpPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/forgot_pass" element={<ForgotPasswordPage/>}/>
        <Route path="/home" element={<LandingPage/>} />
        <Route path="/complaint_form" element={<ComplaintForm/>}/>
        <Route path="/registered" element={<ComplaintRegistered/>}/>
        <Route path="/track" element={<TrackingPage/>}/>
        {/* <Route path="/official" element={<Official/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
