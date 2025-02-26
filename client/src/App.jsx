import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FavoriteProvider } from "./context/FavoriteContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navabar";
import Homepage from "./pages/Homepage";
import Searchpage from "./pages/Searchpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <AuthProvider>
      <FavoriteProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Searchpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Redirect any unknown routes to /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      </FavoriteProvider>
    </AuthProvider>
  );
};

export default App;
