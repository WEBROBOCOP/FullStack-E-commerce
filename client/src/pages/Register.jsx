import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import dmlogo from "../assets/dmlogo.png";

const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate all fields are filled
    if (!formData.fullName || !formData.email || !formData.password) {
      setErrorMsg("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/users/register", formData);
      const { data: userData } = response.data;
      loginUser(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 rounded w-full max-w-md shadow-md">
        <img src={dmlogo} alt="Logo" className="w-16" />
        <h2 className="text-xl font-bold mb-1">Create an Account</h2>
        
        {errorMsg && (
          <div className="mb-4 text-red-500 text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700"></label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 w-full p-2 border text-xs"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700"></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full p-2 border text-xs"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700"></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="mt-1 w-full p-2 border text-xs"
            />
          </div>

          <p className="mt-4 text-center text-xs mb-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign in here
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-black text-xs text-white p-2 hover:bg-gray-600 transition-colors mb-5"
          >
            Register
          </button>
        </form>

        <p className="text-xs text-justify mb-5">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-black underline hover:underline">
            Terms of Use
          </Link>
          . Learn how we handle your data in our{" "}
          <Link to="/privacy" className="text-black underline">
            Privacy Notice
          </Link>
          .
        </p>

        {/* Social Login Options */}
        <div className="space-y-4">
          <button className="flex items-center border p-2 w-full text-xs font-bold hover:bg-gray-100">
            <FaGoogle className="text-red-500 mr-2 text-xl" />
            <span>Continue with Google</span>
          </button>

          <button className="flex items-center border p-2 w-full text-xs font-bold hover:bg-gray-100">
            <FaApple className="text-black mr-2 text-xl" />
            <span>Continue with Apple</span>
          </button>

          <button className="flex items-center border p-2 w-full text-xs font-bold hover:bg-gray-100">
            <FaFacebook className="text-blue-600 mr-2 text-xl" />
            <span>Continue with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register; 