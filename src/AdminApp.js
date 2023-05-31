import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/admin/AdminPage";
import AdminLogin from "./Pages/admin/AdminLogin";
import Verify from "./Pages/admin/Verify";
import Report from "./Pages/admin/Report";
import VideoReport from "./Pages/admin/VideoReport";
import ProtectedUser from "./Protected/UserProtected"
import ProtectedAdmin from "./Protected/AuthorizedAdmin";

function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={
        
      <AdminLogin />
      
      } />

      <Route path="/adminHome" element={
        <ProtectedUser>
      < AdminPage/>
      </ProtectedUser>
      } />
      <Route path="/verifyVideo" element={
       <ProtectedUser>
      <Verify/>
      </ProtectedUser>
      } />
      <Route path="/reportUser" element={
       <ProtectedUser>
      <Report/>
      </ProtectedUser>
      } />
      <Route path = "/reportVideo" element={
       <ProtectedUser>
      
      <VideoReport/>
      </ProtectedUser>

      }/>
     
    </Routes>
  );
}

export default AdminApp;
