import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/adminHome"; 
import Dashboard from "./components/Dashboard"; 
import Users from "./components/Users"; 
import Admin from "./components/Admin"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="admins" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
