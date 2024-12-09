import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutBand } from "../redux/Auth";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/Userauth";
import { adminLogout, clearAdminStates } from "../redux/Admin/AdminLoginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { band } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.adminLogin);

  const [hamburger, setHamburger] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    setHamburger(!hamburger);
  };

  const handleLogout = () => {
    dispatch(logoutBand());
    setDropdown(false);
    navigate("/");
  };

  const handleUserLogout = () => {
    dispatch(logoutUser());
    setDropdown(false);
    navigate("/");
  };

  const handleAdminLogout = () => {
    dispatch(adminLogout());
    setDropdown(false);
    ///dispatch(clearAdminStates());
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <nav className="bg-slate-600 shadow-lg ">
        {/* <div className="flex justify-between items-center px-6 py-4 md:px-10"> */}
        <div className="flex justify-around items-center px-6 py-6 md:px-10 h-16">
          <div className="text-[#50B498]">
            <h2
              className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-teal-400 transition duration-300"
              onClick={() => navigate("/")}
            >
              Musico
            </h2>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!band && !user && !admin ? (
              <>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/about"
                >
                  About
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/faqs"
                >
                  FAQS
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/user-login"
                >
                  Login
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/admin-login"
                >
                  Login As Admin
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/user-register"
                >
                  Sign Up!
                </Link>
              </>
            ) : null}

            {band && (
              <>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/events"
                >
                  Events
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/dashboard/messages"
                >
                  Texts
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/all-bands"
                >
                  Bands
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/all-users"
                >
                  People
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/posts"
                >
                  Posts
                </Link>
                <div className="relative">
                  <button
                    className="text-white hover:text-slate-400 transition duration-300"
                    onClick={toggleDropdown}
                  >
                    Profile
                  </button>
                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                      <Link
                        to="/dashboard/profile-band"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                        onClick={() => setDropdown(false)}
                      >
                        {band.bandname}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {user && (
              <>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/events"
                >
                  Events
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/all-bands"
                >
                  Bands
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/all-users"
                >
                  People
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/user/dashboard/messages"
                >
                  Texts
                </Link>
                <Link
                  className="text-white hover:text-teal-500 transition duration-300"
                  to="/ok/posts"
                >
                  Posts
                </Link>
                <div className="relative">
                  <button
                    className="text-white hover:text-teal-500 transition duration-300"
                    onClick={toggleDropdown}
                  >
                    Profile
                  </button>
                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                      <Link
                        to="/user/dashboard/profile-user"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                        onClick={() => setDropdown(false)}
                      >
                        {user.username}
                      </Link>
                      <button
                        onClick={handleUserLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {admin && (
              <>
                <div className="relative">
                  <button
                    className="text-white hover:text-teal-500 transition duration-300"
                    onClick={toggleDropdown}
                  >
                    Admin Profile
                  </button>
                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                        onClick={() => setDropdown(false)}
                      >
                        {admin.email}
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                        onClick={handleAdminLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={handleClick}
              className="text-white focus:outline-none transition duration-300"
            >
              {hamburger ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {!hamburger && (
          <div className="md:hidden bg-gray-700 text-white shadow-lg">
            <ul className="flex flex-col items-center space-y-4 py-6">
              {!band && !user ? (
                <div className="flex flex-col">
                  <Link className="text-lg" to="/" onClick={handleClick}>
                    Home
                  </Link>
                  <Link
                    onClick={handleClick}
                    className="text-slate-50  hover:text-slate-800 transition duration-300"
                    to="/user-login"
                  >
                    Login
                  </Link>
                  <Link
                    onClick={handleClick}
                    className="text-slate-50  hover:text-slate-800 transition duration-300"
                    to="/user-register"
                  >
                    Sign Up!
                  </Link>
                </div>
              ) : null}
              {band && (
                <>
                  <li>
                    <Link
                      className="text-lg"
                      to="/ok/events"
                      onClick={handleClick}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg"
                      to="/ok/all-bands"
                      onClick={handleClick}
                    >
                      Bands
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg"
                      to="/dashboard/posts"
                      onClick={handleClick}
                    >
                      Posts
                    </Link>
                  </li>
                  <li className="relative">
                    <button className="text-lg" onClick={toggleDropdown}>
                      Profile
                    </button>
                    {dropdown && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <Link
                          to="/dashboard/profile-band"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                          onClick={() => {
                            setDropdown(false);
                            setHamburger(true);
                          }}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setHamburger(true);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <Link
                      className="text-lg"
                      to="/ok/events"
                      onClick={handleClick}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg"
                      to="/ok/all-bands"
                      onClick={handleClick}
                    >
                      Bands
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-lg"
                      to="/user/dashboard/posts"
                      onClick={handleClick}
                    >
                      Posts
                    </Link>
                  </li>
                  <li className="relative">
                    <button className="text-lg" onClick={toggleDropdown}>
                      Profile
                    </button>
                    {dropdown && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <Link
                          to="/user/dashboard/profile-user"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                          onClick={() => {
                            setDropdown(false);
                            setHamburger(true);
                          }}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleUserLogout();
                            setHamburger(true);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
