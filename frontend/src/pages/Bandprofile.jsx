import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bandProfile } from "../redux/Bandprofile";

const BandProfile = () => {
  const { band, status, error } = useSelector((state) => state.bandprofileInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(bandProfile());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-slate-100 py-10 px-4 text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-teal-400">
        Band Profile
      </h2>
      {status === "loading" ? (
        <h2 className="text-lg animate-pulse">Loading ...</h2>
      ) : status === "failed" ? (
        <h2 className="text-lg text-red-500">Error: {error}</h2>
      ) : (
        <div className="bg-gray-600 rounded-lg shadow-xl p-8 w-full max-w-3xl transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center mb-6">
            <img
              src={band.avatar || "/path/to/dummy-avatar.png"}
              alt={band.band_name}
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-400 shadow-md"
            />
            <h3 className="text-3xl font-bold mt-4 text-teal-400">
              {band.band_name}
            </h3>
          </div>
          <div className="mb-4 text-center">
            <p className="text-lg">
              <span className="font-semibold text-gray-400">Email:</span>{" "}
              {band.email}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-400">Location:</span>{" "}
              {band.location}
            </p>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={() => navigate("/dashboard/edit-band-profile")}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/dashboard/create-event")}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Create Event
            </button>
            <button
              onClick={() => navigate("/dashboard/my-events")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              My Events
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BandProfile;
