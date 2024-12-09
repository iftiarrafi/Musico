import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginBand } from "../redux/Auth.jsx";
import bandLoginImage from "../images/userlogin.jpg"; // Add your band login image path here

const BandLogin = () => {
  const dispatch = useDispatch();
  const { status, band, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "succeeded" && band) {
      setLoading(false);
      alert("Logged in");
      navigate("/");
    } else if (status === "failed") {
      setLoading(false);
      alert("Invalid credentials");
    }
  }, [status, band, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginBand({ email, password }));
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Image Section - Hidden on mobile */}
        <div
          className="hidden md:block w-full md:w-1/2 bg-cover bg-center aspect-w-16 aspect-h-9"
          style={{ backgroundImage: `url(${bandLoginImage})` }}
        ></div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Band Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}
          <div className="text-gray-600 flex flex-col mt-4 space-y-2">
            <p
              className="text-lg text-center cursor-pointer hover:underline"
              onClick={() => navigate("/user-login")}
            >
              Want to login as User?
            </p>
            <p
              className="text-lg text-center cursor-pointer hover:underline"
              onClick={() => navigate("/band-register")}
            >
              Create an account as Musician?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandLogin;
