// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dmlogo from "../assets/dmlogo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/api/register", { fullName, email, password });
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 rounded  w-full max-w-md  shadow-md">
      <img
    src={dmlogo} 
    alt=""
    className="w-16 "
  />
        <h2 className="text-xl font-bold mb-3 text-justify">Register</h2>
        {errorMsg && (
          <div className="mb-4 text-red-500 text-center">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-500 text-center">{successMsg}</div>
        )}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
           
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name..."
            className="mt-1 w-full p-2 border text-xs"
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email.."
            className="mt-1 w-full p-2 border text-xs"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password.."
               className="mt-1 w-full p-2 border text-xs"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm your password.."
               className="mt-1 w-full p-2 border text-xs"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-xs text-white p-2  hover:bg-gray-600 transition-colors mb-5"
          >
            Continue
          </button>
        </form>
        <p className="text-xs text-justify mb-5 ">
          When you create an account, you agree to our  
          <Link to="./login " className="text-black underline hover:underline"> Terms of Use</Link>,
          <br />
          Learn how we handle your data in our  
          <Link to="./login" className="text-black underline"> Privacy Notice</Link>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
