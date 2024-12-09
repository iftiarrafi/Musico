import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/Userauth";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/bandlogin.jpg";

const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, user, error } = useSelector((state) => state.user);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      setShowError(false);
    }
    if (status === "succeeded" && user) {
      setLoading(false);
      setShowError(false);
      alert("Logged In..");
      navigate("/");
    }
    if (status === "failed") {
      setLoading(false);
      setShowError(true);
    }
  }, [status, user, navigate]);

  return (
    <div className="bg-gradient-to-r from-white to-gray-300 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Image Section - Hidden on mobile */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-6">
            User Login
          </h2>
          {showError && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="flex flex-col md:flex-row justify-between mt-6 text-sm text-gray-300">
            <p>
              Want to login as a Musician?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate("/band-login")}
              >
                Click here
              </span>
            </p>
            <p>
              Create an account?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate("/user-register")}
              >
                Click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlogin;
