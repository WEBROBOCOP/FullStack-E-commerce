import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import dmlogo from "../assets/dmlogo.png";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Both email and password are required.");
      return;
    }

    try {
      const response = await axios.post("/users/login", { email, password });
      // Backend returns { success, message, data, token }
      const { data: userData, token } = response.data;
      loginUser(userData, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred during login.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 rounded  w-full max-w-md shadow-md">
        <img src={dmlogo} alt="" className="w-16 " />

        <h2 className="text-xl font-bold mb-1 ">Sign in to register</h2>
        {errorMsg && (
          <div className="mb-4 text-red-500 text-center">{errorMsg}</div>
        )}
        <form onSubmit={handleSubmit}>
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
          <p className="mt-4 text-center text-xs mb-5">
            If you don't have an account.Please register{" "}
            <Link to="/signup" className="text-blue-500">
              here
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-black text-xs text-white p-2  hover:bg-gray-600 transition-colors mb-5"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-justify mb-5 ">
          When you create an account, you agree to our
          <Link to="./login " className="text-black underline hover:underline">
            {" "}
            Terms of Use
          </Link>
          ,
          <br />
          Learn how we handle your data in our
          <Link to="./login" className="text-black underline">
            {" "}
            Privacy Notice
          </Link>
          .
        </p>

        <form action="">
          {/* Google Login */}
          <div className="mb-4">
            <label
              htmlFor="google-login"
              className="block text-gray-700"
            ></label>
            <div className="flex items-center border p-2 w-full text-xs font-bold cursor-pointer hover:bg-gray-100">
              <FaGoogle className="text-red-500 mr-2 text-xl" />
              <input
                type="email"
                id="google-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Continue with Google"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Apple Login */}
          <div className="mb-4">
            <label
              htmlFor="apple-login"
              className="block text-gray-700"
            ></label>
            <div className="flex items-center border p-2 w-full text-xs font-bold cursor-pointer hover:bg-gray-100">
              <FaApple className="text-black mr-2 text-xl" />
              <input
                type="email"
                id="apple-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Continue with Apple"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Facebook Login */}
          <div className="mb-4">
            <label
              htmlFor="facebook-login"
              className="block text-gray-700"
            ></label>
            <div className="flex items-center border p-2 w-full text-xs font-bold cursor-pointer hover:bg-gray-100">
              <FaFacebook className="text-blue-600 mr-2 text-xl" />
              <input
                type="email"
                id="facebook-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Continue with Facebook"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
