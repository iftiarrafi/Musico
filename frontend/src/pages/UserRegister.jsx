import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserReg, userRegistration } from "../redux/UserReg";

const UserRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.userregister);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [mailDiv, setMailDiv] = useState(true);
  const [passDiv, setPassDiv] = useState(false);
  const [avatarDiv, setAvatarDiv] = useState(false);
  const [finalDiv, setFInalDiv] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setAvatarDiv(false);
    setFInalDiv(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("location", location);
      if (avatar) formData.append("avatar", avatar);

      dispatch(userRegistration(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      setShowError(false);
    } else if (status === "succeeded") {
      setLoading(false);
      setSuccess(true);
      setShowError(false);
      dispatch(clearUserReg());
    } else {
      setLoading(false);
      setShowError(true);
    }
  }, [status, dispatch]);

  const handleMailDiv = () => {
    setMailDiv(false);
    setPassDiv(true);
  };
  const handlePassDiv = () => {
    setPassDiv(false);
    setAvatarDiv(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Create Your Account
        </h1>
        {mailDiv && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleMailDiv}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
            <div className="flex justify-center space-x-2 mt-6">
              <span className="text-blue-600 font-semibold">•</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">•</span>
            </div>
          </div>
        )}
        {passDiv && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => {
                setPassDiv(false);
                setMailDiv(true);
              }}
            >
              Go Back
            </button>
            <button
              onClick={handlePassDiv}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
            <div className="flex justify-center space-x-2 mt-6">
              <span className="text-gray-300">•</span>
              <span className="text-blue-600 font-semibold">•</span>
              <span className="text-gray-300">•</span>
            </div>
          </div>
        )}
        {avatarDiv && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-800">
              Upload Your Profile Picture
            </h2>
            <div className="flex items-center justify-between space-x-4">
              <button
                onClick={handleRegister}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
              >
                Skip for Now
              </button>
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              />
              <button
                onClick={() => {
                  setAvatarDiv(false);
                  setPassDiv(true);
                }}
              >
                Go Back
              </button>
              <button
                onClick={handleRegister}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">•</span>
              <span className="text-blue-600 font-semibold">•</span>
            </div>
          </div>
        )}

        {finalDiv && (
          <div className="mt-6">
            {loading ? (
              <div className="mt-6">
                <p className="text-center text-blue-600">Loading...</p>
              </div>
            ) : success ? (
              <div className="text-center">
                <p className="text-green-600 font-semibold">You are all set!</p>
                <p
                  onClick={() => navigate("/user-login")}
                  className="text-blue-600 hover:underline cursor-pointer mt-4"
                >
                  Click here to log in
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-red-600 font-semibold">Error: {error}</p>
                <h5
                  onClick={() => {
                    setMailDiv(true);
                    setFInalDiv(false);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setLocation("");
                    setAvatar(null);
                  }}
                  className="text-blue-600 hover:underline cursor-pointer mt-4"
                >
                  Register Again
                </h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegister;
