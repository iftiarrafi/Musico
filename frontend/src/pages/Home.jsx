import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import sampleImg1 from "../images/illus_4.jpg";
import sampleImg2 from "../images/sample_3.jpg";
import sampleImg4 from "../images/sample_5.jpg";
import bgVideo from "../images/heri2.mp4";

const Home = () => {
  const navigate = useNavigate();
  const { band } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full text-gray-900">
      {/* Hero Section */}
      <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          loop
          muted
        ></video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 opacity-40"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6">
          <h3 className="text-3xl md:text-4xl font-light mb-2">Welcome to</h3>
          <h2 className="text-6xl md:text-8xl font-extrabold text-teal-400 mb-6">
            Musico!
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
            Discover and hire talented musicians or grab your tickets for the
            most exciting music events.
          </p>

          {user ? (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/ok/all-bands")}
                className="px-6 py-3 md:px-8 md:py-4 bg-teal-500 text-white font-medium rounded-full shadow-lg hover:bg-teal-600 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                Explore Bands
              </button>
              <button
                onClick={() => navigate("/ok/events")}
                className="px-6 py-3 md:px-8 md:py-4 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                View Events
              </button>
            </div>
          ) : (
            <div className="text-xl font-medium mt-6">
              <p className="text-white">
                Sign up/Login to enjoy exclusive features!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 1: Discover Musicians */}
      <div
        className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${sampleImg1})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center p-4">
          <h2 className="text-4xl font-bold text-teal-400 mb-4">
            Discover Talented Musicians
          </h2>
          <p className="text-lg text-white max-w-xl mx-auto leading-relaxed">
            Browse a wide range of musicians and bands ready to perform and
            bring your event to life.
          </p>
        </div>
      </div>

      {/* Section 2: Upcoming Events */}
      <div
        className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${sampleImg4})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center p-4">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-white max-w-xl mx-auto leading-relaxed">
            Stay updated with the latest events and grab your tickets before
            they're gone.
          </p>
          <button
            onClick={() => navigate("/ok/events")}
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Browse Events
          </button>
        </div>
      </div>

      {/* Section 3: Join the Community */}
      <div
        className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${sampleImg2})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center p-4">
          <h2 className="text-4xl font-bold text-pink-400 mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white max-w-xl mx-auto leading-relaxed">
            Become part of a thriving music community and connect with other
            fans and artists.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-4 px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
