import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUpdatingState, updateBand } from "../redux/Updateband";

const UpdateBand = () => {
  const { band } = useSelector((state) => state.bandprofileInfo);
  const { status, error } = useSelector((state) => state.updateband);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bandname, setBandname] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setBandname(band.bandname);
    setLocation(band.location);
    setAvatar(band.avatar);

    if (status === "loading") {
      setLoading(true);
      setShowError(false);
    }
    if (status === "succeeded") {
      setLoading(false);
      setShowError(false);
      dispatch(clearUpdatingState());
      navigate("/dashboard/profile-band");
    }
    if (status === "failed") {
      setLoading(false);
      setShowError(true);
    }
  }, [band, status, error, navigate, dispatch]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bandname", bandname);
    formData.append("location", location);
    if (avatar) formData.append("avatar", avatar);
    try {
      dispatch(updateBand(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Update Your Info
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Band Name
            </label>
            <input
              type="text"
              value={bandname}
              onChange={(e) => setBandname(e.target.value)}
              className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Change Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="mt-2 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Update
            </button>
          </div>
          {loading && (
            <div className="mt-4 text-center text-indigo-400">
              Updating... Please wait
            </div>
          )}
          {showError && (
            <div className="mt-4 text-center text-red-500">Error: {error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateBand;
