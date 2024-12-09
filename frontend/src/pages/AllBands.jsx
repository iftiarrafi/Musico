import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBands } from "../redux/AllBands";
import { useNavigate } from "react-router-dom";

const AllBands = () => {
  const { bands, status, error } = useSelector((state) => state.allbands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchItems, setSearchItems] = useState("");

  const filtered = searchItems
    ? bands.filter((band) =>
        band.bandname.toLowerCase().includes(searchItems.toLowerCase())
      )
    : bands;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllBands());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen bg-slate-200 py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-teal-400 mb-4">
            Discover Bands
          </h1>
          <p className="text-gray-400">
            Search and explore bands from different locations.
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search Bands by Name"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        {status === "loading" ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold animate-pulse">
              Loading bands...
            </h2>
          </div>
        ) : status === "succeeded" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((band, index) => (
              <div
                key={index}
                className="bg-slate-300 rounded-lg shadow-md py-4 px-4 transform hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate(`/ok/band-profile/${band._id}`)}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={band.avatar || "/path/to/dummy-avatar.png"}
                    alt={`${band.bandname} avatar`}
                    className="rounded-full w-24 h-24 object-cover mb-4 border-teal-500 border-4"
                  />
                  <h2 className="text-2xl font-semibold text-slate-800">
                    {band.bandname}
                  </h2>
                  <p className="text-sm text-slate-800">
                    Location : {band.location}
                  </p>
                  <p className="text-sm text-slate-800">Email : {band.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg text-red-500">Error: {error}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBands;
